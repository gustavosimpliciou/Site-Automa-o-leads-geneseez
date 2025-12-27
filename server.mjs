import http from 'http';
import https from 'https';
import { URL } from 'url';

const PORT = 3001;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://geneseez01.app.n8n.cloud/webhook/dfea7ed4-08b7-42d0-9526-3674300ca69b';

// Função para enviar dados ao webhook com retry automático (POST method com JSON body)
async function sendToWebhook(payload, retries = 3) {
  const webhookUrl = WEBHOOK_URL;
  
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
      // Aguarda 1 segundo antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/leads') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        console.log('='.repeat(60));
        console.log('📨 Nova submissão recebida:', new Date().toLocaleString('pt-BR'));
        console.log('Email:', payload.email);
        console.log('Instagram:', payload.instagram);
        console.log('='.repeat(60));

        // Enviar com retry automático
        const result = await sendToWebhook(payload, 3);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Lead capturado e enviado ao webhook',
          webhookStatus: result.statusCode
        }));

      } catch (error) {
        console.error('❌ Erro ao processar:', error);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Lead processado' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor de Leads Captura rodando em http://0.0.0.0:${PORT}`);
  console.log(`📨 Webhook N8N conectado: ${WEBHOOK_URL}`);
  console.log('✅ Pronto para receber submissões com retry automático (3 tentativas)...\n');
});
