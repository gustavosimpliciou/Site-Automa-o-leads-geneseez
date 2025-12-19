# 🎯 Webhook Setup Guide - Geneseez

## Seu Webhook está Pronto! ✅

**URL do Webhook:**
```
https://geneseez01.app.n8n.cloud/webhook-test/captura-leads
```

## Dados que Serão Enviados

Quando alguém preenche o formulário de PRÉ-SAVE, seu webhook receberá:

```json
{
  "email": "usuario@email.com",
  "instagram": "@usuario",
  "timestamp": "2025-12-19T12:30:45.123Z",
  "source": "pre-save-popup"
}
```

## O que Fazer no n8n?

No seu n8n workflow, você pode:

1. **Teste o Webhook** (já está feito)
   - Acesse: https://geneseez01.app.n8n.cloud/webhook-test/captura-leads
   - Você verá os dados chegando

2. **Crie um Workflow Completo** com essas ações:
   - 💾 **Salvar em Banco de Dados** (PostgreSQL, MongoDB, etc)
   - 📧 **Enviar Email** de confirmação ao usuário
   - 🗂️ **Google Sheets** - armazenar em planilha
   - 📱 **CRM/Marketing** - integrar com ActiveCampaign, Pipedrive, etc
   - 📊 **Analytics** - rastrear leads

3. **Exemplo de Workflow n8n:**
   ```
   Webhook Trigger (seu endpoint)
   ↓
   Extract Data (email, instagram)
   ↓
   Save to Database / Google Sheets / Email
   ↓
   Resposta (200 OK)
   ```

## Como Resolver o Erro "N8N_WEBHOOK_URL não configurada"

**Faça um Hard Refresh no navegador:**
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

Isso vai limpar o cache e carregar a configuração correta!

## Status

✅ Webhook URL configurada
✅ Arquivo .env criado
✅ Imagem do popup redimensionada
✅ Pronto para receber leads!
