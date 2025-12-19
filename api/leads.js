const https = require('https');
const { URL } = require('url');

// Função para enviar dados ao webhook com retry automático
async function sendToWebhook(payload, retries = 3) {
  const webhookUrl = 'https://geneseez01.app.n8n.cloud/webhook/dfea7ed4-08b7-42d0-9526-3674300ca69b';
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Tentativa ${attempt}/${retries}] Enviando para webhook (POST):`, payload);
      
      const url = new URL(webhookUrl);
      const bodyJSON = JSON.stringify(payload);
      
      const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(bodyJSON),
          'User-Agent': 'Geneseez-LeadCapture/1.0'
        },
        timeout: 15000,
      };

      return await new Promise((resolve, reject) => {
        const n8nRequest = https.request(options, (response) => {
          let data = '';
          
          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
              console.log(`✅ Webhook enviado com sucesso (Status: ${response.statusCode})`);
              resolve({ success: true, statusCode: response.statusCode, data });
            } else if (response.statusCode === 404 && attempt < retries) {
              console.log(`⚠️ Webhook retornou 404. Tentando novamente...`);
              reject(new Error(`HTTP ${response.statusCode}`));
            } else {
              console.log(`❌ Webhook retornou Status: ${response.statusCode}. Resposta:`, data);
              resolve({ success: true, statusCode: response.statusCode, data });
            }
          });
        });

        n8nRequest.on('error', (error) => {
          console.error(`❌ Erro na tentativa ${attempt}:`, error.message);
          if (attempt < retries) {
            reject(error);
          } else {
            resolve({ success: false, error: error.message });
          }
        });

        n8nRequest.on('timeout', () => {
          n8nRequest.destroy();
          reject(new Error('Request timeout'));
        });

        n8nRequest.write(bodyJSON);
        n8nRequest.end();
      });
    } catch (error) {
      console.error(`Erro na tentativa ${attempt}:`, error.message);
      if (attempt === retries) {
        return { success: false, error: error.message };
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

module.exports = async function handler(req, res) {
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
      const payload = req.body;
      
      if (!payload.email || !payload.instagram) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email e Instagram são obrigatórios' 
        });
      }

      console.log('='.repeat(60));
      console.log('📨 Nova submissão recebida:', new Date().toLocaleString('pt-BR'));
      console.log('Email:', payload.email);
      console.log('Instagram:', payload.instagram);
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
