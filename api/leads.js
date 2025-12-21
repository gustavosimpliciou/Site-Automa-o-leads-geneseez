// Função para enviar dados ao webhook com retry automático
async function sendToWebhook(payload, retries = 3) {
  const webhookUrl = 'https://geneseez01.app.n8n.cloud/webhook/dfea7ed4-08b7-42d0-9526-3674300ca69b';
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Tentativa ${attempt}/${retries}] Enviando para webhook (POST):`, payload);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Geneseez-LeadCapture/1.0'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.text();
      
      if (response.ok) {
        console.log(`✅ Webhook enviado com sucesso (Status: ${response.status})`);
        return { success: true, statusCode: response.status, data };
      } else if (response.status === 404 && attempt < retries) {
        console.log(`⚠️ Webhook retornou 404. Tentando novamente...`);
        throw new Error(`HTTP ${response.status}`);
      } else {
        console.log(`❌ Webhook retornou Status: ${response.status}. Resposta:`, data);
        return { success: true, statusCode: response.status, data };
      }
    } catch (error) {
      console.error(`Erro na tentativa ${attempt}:`, error.message);
      if (attempt === retries) {
        return { success: false, error: error.message };
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Parser de body para Vercel
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      let payload;
      
      // Tentar diferentes formas de obter o body
      if (typeof req.body === 'string') {
        payload = JSON.parse(req.body);
      } else if (req.body && typeof req.body === 'object') {
        payload = req.body;
      } else if (req.headers['content-type']?.includes('application/json')) {
        // Se for stream, fazer parsing manual
        payload = await parseBody(req);
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'Formato de conteúdo não suportado' 
        });
      }
      
      if (!payload.email || !payload.phone) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email e Telefone são obrigatórios' 
        });
      }

      console.log('='.repeat(60));
      console.log('📨 Nova submissão recebida:', new Date().toLocaleString('pt-BR'));
      console.log('Email:', payload.email);
      console.log('Telefone:', payload.phone);
      console.log('='.repeat(60));

      const result = await sendToWebhook(payload, 3);

      if (result.success) {
        res.status(200).json({ 
          success: true, 
          message: 'Lead capturado e enviado ao webhook',
          webhookStatus: result.statusCode
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Erro ao enviar webhook',
          error: result.error
        });
      }
    } catch (error) {
      console.error('❌ Erro ao processar:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erro ao processar requisição',
        error: error.message
      });
    }
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}
