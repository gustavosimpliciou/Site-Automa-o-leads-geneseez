# 🧪 Ambiente de Teste - Webhook N8N

## Status: ✅ CONFIGURADO PARA TESTES (MÉTODO GET)

### URL Atual (TESTE) - GET REQUEST
```
https://geneseez01.app.n8n.cloud/webhook-test/dfea7ed4-08b7-42d0-9526-3674300ca69b?email=...&instagram=...&timestamp=...&source=...
```

### Observação Importante
- O webhook foi alterado para usar **GET requests** em vez de POST
- Os dados são enviados como **query parameters** na URL
- Muito mais compatível com webhooks simples

## Como Testar

### 1. Local (http://localhost:5000)
```bash
npm run dev
# Acesse http://localhost:5000
# Clique em "VISÃO DO ALBUM" → "Fazer Pré-Save"
# Preencha: email + instagram
# Clique enviar
```

### 2. Verifique o N8N
Acesse: https://geneseez01.app.n8n.cloud/
- Abra o workflow com ID: `49bf606e-64a9-4815-8b66-5fb97a0fe2bc`
- Procure pela aba "Executions" ou "Logs"
- Verifique se os dados chegaram

### 3. Verifique os Logs Locais
No terminal, você deve ver:
```
============================================================
📨 Nova submissão recebida: 19/12/2025, 05:09:03
Email: usuario@example.com
Instagram: @usuario
============================================================
[Tentativa 1/3] Enviando para webhook: {...}
✅ Webhook enviado com sucesso (Status: 200)
```

## Fluxo de Teste
```
http://localhost:5000 
  ↓ (clique em Fazer Pré-Save)
backend (porta 3001)
  ↓ (envia dados)
N8N webhook-test
  ↓ (recebe dados)
Google Sheets (seu ambiente de teste)
```

## Quando Passar para Produção

Altere a URL em `server.mjs`:
```javascript
// DE:
const webhookUrl = 'https://geneseez01.app.n8n.cloud/webhook-test/49bf606e-64a9-4815-8b66-5fb97a0fe2bc';

// PARA:
const webhookUrl = 'https://geneseez01.app.n8n.cloud/webhook/49bf606e-64a9-4815-8b66-5fb97a0fe2bc';
```

Depois reinicie:
```bash
npm run dev
```

## Dados de Teste
```json
{
  "email": "teste@example.com",
  "instagram": "@teste_usuario",
  "timestamp": "2025-12-19T05:09:03.126Z",
  "source": "pre-save-popup"
}
```

## Pronto para Testar! 🚀