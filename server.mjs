import http from 'http';
import https from 'https';
import { URL } from 'url';

const PORT = 3001;

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
        console.log('Dados recebidos do frontend:', payload);

        const webhookUrl = 'https://geneseez01.app.n8n.cloud/webhook/captura-leads';
        const url = new URL(webhookUrl);
        
        const options = {
          hostname: url.hostname,
          path: url.pathname + url.search,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(payload)),
          },
        };

        const n8nRequest = https.request(options, (response) => {
          console.log('Resposta do N8N - Status:', response.statusCode);
          
          let data = '';
          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            console.log('Resposta N8N:', data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Dados enviados para o webhook' }));
          });
        });

        n8nRequest.on('error', (error) => {
          console.error('Erro ao enviar para N8N:', error.message);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Dados processados' }));
        });

        n8nRequest.write(JSON.stringify(payload));
        n8nRequest.end();

      } catch (error) {
        console.error('Erro ao processar:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de leads rodando em http://0.0.0.0:${PORT}`);
});
