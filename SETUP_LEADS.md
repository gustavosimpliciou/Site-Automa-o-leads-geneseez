# 🚀 Setup Completo - Captura de Leads Geneseez

## URL do Webhook (AMBIENTE DE TESTE - GET METHOD)
```
https://geneseez01.app.n8n.cloud/webhook-test/dfea7ed4-08b7-42d0-9526-3674300ca69b
```

**Método**: GET com query parameters
- `?email=usuario@example.com`
- `&instagram=@usuario`
- `&timestamp=2025-12-19T05:09:03.126Z`
- `&source=pre-save-popup`

## URL do Webhook (PRODUÇÃO - quando estiver pronto)
```
https://geneseez01.app.n8n.cloud/webhook/49bf606e-64a9-4815-8b66-5fb97a0fe2bc
```

## Como Funciona

### 1. Usuário Preenche Formulário
- Abre site → Popup aparece automaticamente
- Preenche Email e Instagram
- Clica "Fazer Pré-Save"

### 2. Dados São Enviados
```
Frontend (React) 
  ↓
Vite Proxy (/api/leads) 
  ↓
Backend Node.js (port 3001)
  ↓
Tenta enviar para N8N (3x com retry)
  ↓
N8N envia para Google Sheets
```

### 3. Você Recebe os Dados
- Email do usuário
- Instagram do usuário
- Timestamp automático
- Source ("pre-save-popup" ou "contact-form")

## Estrutura de Arquivos

```
├── server.mjs                    # Backend - envia para webhook
├── src/
│   ├── components/
│   │   ├── PreSavePopup.tsx      # Popup de captura
│   │   └── Contact.tsx           # Formulário de contato
│   └── App.tsx
├── vite.config.ts               # Proxy configurado
└── package.json
```

## Como Testar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor
npm run dev

# 3. Abrir http://localhost:5000
# 4. Preencher e enviar formulário
# 5. Verificar planilha Google
```

## Logs para Debugar

Abra o console do navegador (F12) para ver:
- ✅ Se foi enviado
- ❌ Se houve erro

No terminal (logs do backend):
- Vê a submissão completa
- Vê as tentativas do webhook
- Vê a resposta do N8N

## Formato dos Dados Enviados

```json
{
  "email": "usuario@example.com",
  "instagram": "@usuario",
  "timestamp": "2025-12-19T05:09:03.126Z",
  "source": "pre-save-popup"
}
```

## Verificação Final

1. ✅ Backend está rodando na porta 3001
2. ✅ Frontend está rodando na porta 5000
3. ✅ Webhook URL está correta
4. ✅ N8N workflow está ativo
5. ✅ Google Sheets está conectada ao N8N

## Se Não Aparecer na Planilha

**Passo 1**: Verifique os logs
```bash
# No terminal, procure por:
- "Nova submissão recebida"
- "Webhook enviado com sucesso"
```

**Passo 2**: Verifique o N8N
- Acesse https://geneseez01.app.n8n.cloud/
- Procure pelo webhook ID: `49bf606e-64a9-4815-8b66-5fb97a0fe2bc`
- Verifique se está ATIVO
- Procure logs do workflow

**Passo 3**: Teste manualmente
```bash
# Envie uma requisição manual (TESTE - GET):
curl "https://geneseez01.app.n8n.cloud/webhook-test/dfea7ed4-08b7-42d0-9526-3674300ca69b?email=teste@example.com&instagram=@teste&timestamp=2025-12-19T05:09:03Z&source=test"

# Para produção (quando pronto):
curl -X POST https://geneseez01.app.n8n.cloud/webhook/49bf606e-64a9-4815-8b66-5fb97a0fe2bc \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","instagram":"@teste"}'
```

## Pronto para Produção! 🎉

Baixe os arquivos, substitua seu repositório e está pronto para capturar leads!