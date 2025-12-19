# N8N Webhook Integration - Captura de Leads

## Configuração Completa ✅

Este documento descreve a integração do webhook n8n para captura de leads (email e Instagram).

### URLs e Endpoints

- **Webhook em Teste**: https://geneseez01.app.n8n.cloud/webhook-test/dfea7ed4-08b7-42d0-9526-3674300ca69b
- **Webhook de Produção** (quando pronto): https://geneseez01.app.n8n.cloud/webhook/49bf606e-64a9-4815-8b66-5fb97a0fe2bc
- **Servidor Backend**: http://0.0.0.0:3001/api/leads
- **Servidor Frontend**: http://0.0.0.0:5000

### Fluxo de Dados

```
Frontend Form → Vite Proxy (/api/leads) → Node.js Server → N8N Webhook → Google Sheets
```

### Formulários Implementados

#### 1. **Pre-Save Popup** (Popup ao carregar página)
- Aparece automaticamente após 1.5s do carregamento
- Captura: Email, Instagram
- Timestamp automático
- Redirect direto para webhook

#### 2. **Contact Form** (Formulário de contato)
- Acesso: Menu header → "Entre em Contato"
- Captura: Nome, Email, Telefone, Instagram, Assunto, Mensagem
- Envia todos os dados para o webhook

### Dados Enviados

Cada submissão envia um JSON com:

```json
{
  "name": "Usuario",
  "email": "email@example.com",
  "phone": "+55 83 99141-1822",
  "instagram": "@usuario",
  "subject": "duvidas",
  "message": "Mensagem aqui",
  "timestamp": "2025-12-19T04:49:01.759Z",
  "source": "contact-form"
}
```

### Status da Integração

✅ **Frontend**: Funcionando
✅ **Backend**: Funcionando  
✅ **Envio de Dados**: Funcionando via GET
✅ **Webhook N8N**: Configurado para GET requests
✅ **Retry Automático**: 3 tentativas com 1s de delay
✅ **Logging Detalhado**: Console mostra todas as operações
✅ **Query Parameters**: Email, Instagram, Timestamp, Source enviados na URL

### Próximos Passos

1. **Verificar no N8N**:
   - Acesse https://geneseez01.app.n8n.cloud/
   - Navegue até Webhooks
   - Certifique-se de que o webhook "captura-leads" está ativo/habilitado
   - Verifique se o método é POST e caminho é `/webhook/captura-leads`

2. **Se necessário autenticação**:
   - Adicione headers de autenticação no arquivo `server.mjs`
   - Exemplo: `Authorization: Bearer TOKEN`

3. **Testar integração**:
   - Preencha o formulário
   - Verifique logs do backend (porta 3001)
   - Confirme dados na planilha/destino do n8n

### Arquivos Modificados

- `server.mjs` - Endpoint POST para /api/leads
- `src/components/Contact.tsx` - Campo Instagram adicionado
- `src/components/PreSavePopup.tsx` - Já estava enviando leads
- `vite.config.ts` - Proxy configurado para /api

### Troubleshooting

**Erro 401 no webhook**:
- O webhook pode estar desabilitado no n8n
- Pode ser necessário gerar um novo webhook
- Verifique credenciais/autenticação

**Dados não chegam no Google Sheets**:
- Confirme que o workflow n8n está ativo
- Verifique os logs do workflow no n8n
- Teste manualmente enviando dados via Postman/curl

**CORS Errors**:
- Server.mjs já possui CORS configurado
- Frontend proxy está configurado no vite.config.ts