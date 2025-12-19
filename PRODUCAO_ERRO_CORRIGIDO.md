# ✅ Erro 500 Produção - CORRIGIDO

## O Problema
Quando você faz deploy em Vercel/produção e tenta enviar leads, recebe erro 500 no `/api/leads`.

## O Que Foi Consertado
O arquivo `api/leads.js` (que Vercel usa) tinha problema no parsing do request body. **Já foi corrigido!**

## Como Deploy em Vercel (Recomendado)

### 1. Conectar seu repositório a Vercel
```bash
# Via CLI (recomendado)
npm install -g vercel
vercel
# Siga as instruções

# Ou: Acesse https://vercel.com e clique "Import Project"
```

### 2. Fazer Push para seu repositório
```bash
git add .
git commit -m "Corrige erro 500 na captura de leads"
git push origin main
```

Vercel vai fazer redeploy automaticamente.

### 3. Testar em Produção
- Acesse seu site Vercel
- Clique em "VISÃO DO ALBUM" 
- Preencha email e Instagram
- Deve funcionar agora! ✅

## Se Ainda Der Erro 500

### Verificar Logs em Vercel
1. Acesse https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá para "Logs" → "Function Logs"
4. Envie um lead e veja a mensagem de erro completa

### Soluções Rápidas

**Se o erro disser "webhook retornou erro":**
- A URL do N8N pode estar errada
- Teste diretamente: `curl -X POST https://geneseez01.app.n8n.cloud/webhook/dfea7ed4-08b7-42d0-9526-3674300ca69b -H "Content-Type: application/json" -d '{"email":"test@test.com"}'`

**Se disser "Invalid JSON":**
- O frontend está mandando dados errados
- Abre DevTools (F12) → Console e vê o que está sendo enviado

## Alternativa: Deploy Manual (Se Não Usar Vercel)

Se você está usando outro servidor:

1. Certifique-se que `server.mjs` está rodando:
```bash
node server.mjs &
```

2. Build e inicie o frontend:
```bash
npm run build
# Deploy a pasta 'dist/'
```

3. Configure seu servidor web (nginx/apache) para:
   - Servir a pasta `dist/`
   - Rotear `/api/*` para `http://localhost:3001/api/*`

## Arquivos Principais
- `api/leads.js` - Vercel serverless function (AGORA CONSERTADO)
- `server.mjs` - Backend Node.js para desenvolvimento/outro servidor
- `vite.config.ts` - Proxy configurado para dev

---

**Dúvidas?** Verifique os logs e abra DevTools (F12) para debug.
