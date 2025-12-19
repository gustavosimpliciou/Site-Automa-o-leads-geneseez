# 🚀 Guia de Setup para Produção

## Problema Encontrado

Quando você faz push para seu servidor, a captura de leads trava porque as variáveis VITE_* precisam estar definidas **no momento do build**, não em tempo de execução.

## ✅ Solução Implementada

Adicionei suporte a DUAS formas de configuração:

### Opção 1: Variável de Ambiente (Recomendado para Build Time)

**Na sua máquina/servidor ANTES de fazer build:**

```bash
# Linux/Mac
export VITE_N8N_WEBHOOK_URL="https://geneseez01.app.n8n.cloud/webhook/captura-leads"
npm run build

# Windows (PowerShell)
$env:VITE_N8N_WEBHOOK_URL="https://geneseez01.app.n8n.cloud/webhook/captura-leads"
npm run build

# Windows (CMD)
set VITE_N8N_WEBHOOK_URL=https://geneseez01.app.n8n.cloud/webhook/captura-leads
npm run build
```

Ou crie um arquivo `.env` na raiz (será ignorado pelo git):
```
VITE_N8N_WEBHOOK_URL=https://geneseez01.app.n8n.cloud/webhook/captura-leads
```

### Opção 2: Arquivo config.json (Para Quando Build Já Está Feito)

Crie um arquivo `public/config.json` no seu servidor:

```json
{
  "n8nWebhookUrl": "https://geneseez01.app.n8n.cloud/webhook/captura-leads"
}
```

**Importante**: Coloque este arquivo na pasta public, não faça commit no git (já está em .gitignore).

---

## 📋 Passo a Passo Rápido

### Se você usa Vercel/Netlify/Similar:
1. Vá para as variáveis de ambiente do seu projeto
2. Adicione: `VITE_N8N_WEBHOOK_URL = https://geneseez01.app.n8n.cloud/webhook/captura-leads`
3. Faça redeploy

### Se você usa seu próprio servidor:
1. Clone o repositório
2. Crie `.env` com a URL do webhook
3. Execute: `npm install && npm run build`
4. Deploy a pasta `dist/`

### Se o build já foi feito e trava:
1. Crie `public/config.json` com a configuração
2. Coloque no diretório public do seu servidor
3. Reinicie o servidor

---

## 🧪 Para Testar

1. Clique em "OUVIR ALBUM"
2. Preencha email e instagram
3. Clique em "Fazer Pré-Save"
4. Você deve ver:
   - ✅ Mensagem de sucesso (2 segundos)
   - ✅ Popup fecha automaticamente
   - ✅ Dados chegam no seu N8N

Se der erro:
- Abra DevTools (F12)
- Vá para Console
- Procure por mensagens de erro
- Verifique se a URL do webhook está correta
- Teste a URL diretamente no navegador para confirmar que responde

---

## 📁 Arquivos Relevantes

- `.env.example` - Modelo de variáveis de ambiente
- `public/config.example.json` - Modelo de arquivo de configuração
- `src/components/PreSavePopup.tsx` - Componente que envia os dados
- `DEPLOYMENT_SETUP.md` - Documentação técnica detalhada
