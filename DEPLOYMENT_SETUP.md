# Guia de Configuração em Produção

## Variáveis de Ambiente Necessárias

Para que a captura de leads funcione corretamente em seu servidor, você precisa configurar as variáveis de ambiente **ANTES de fazer o build**.

### 1. Crie um arquivo `.env` na raiz do seu projeto

```bash
VITE_N8N_WEBHOOK_URL=https://geneseez01.app.n8n.cloud/webhook/captura-leads
```

### 2. Construa o projeto COM a variável definida

```bash
# No seu servidor/ambiente de produção, execute:

# Linux/Mac
export VITE_N8N_WEBHOOK_URL=https://geneseez01.app.n8n.cloud/webhook/captura-leads
npm run build

# Windows (PowerShell)
$env:VITE_N8N_WEBHOOK_URL="https://geneseez01.app.n8n.cloud/webhook/captura-leads"
npm run build
```

### 3. Alternative: Use um arquivo `.env` local

Crie um arquivo `.env` ou `.env.local` na raiz do projeto:

```
VITE_N8N_WEBHOOK_URL=https://geneseez01.app.n8n.cloud/webhook/captura-leads
```

O Vite vai ler automaticamente durante o build.

### ⚠️ IMPORTANTE

- **NÃO commite o arquivo `.env`** em git (adicione à `.gitignore`)
- A variável precisa estar definida **no momento do build**, não após
- Se você usar um host como Vercel, Netlify, etc., configure as variáveis nas configurações do plataforma

### Verificação

Após o build, você pode verificar se foi configurada corretamente inspecionando o arquivo HTML gerado - a URL deve estar presente no código compilado.

## Fluxo de Captura de Leads

Quando um usuário:
1. Clica em "OUVIR ALBUM"
2. Preenche Email + Instagram no popup
3. Os dados são enviados para: `https://geneseez01.app.n8n.cloud/webhook/captura-leads`
4. Seu N8N processa os dados

Se receber erro ao enviar, verifique:
- Se a URL do webhook está correta
- Se seu N8N está respondendo (teste a URL diretamente)
- Se há problemas de CORS (se aplicável)
