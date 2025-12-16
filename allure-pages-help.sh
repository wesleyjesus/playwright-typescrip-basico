#!/bin/bash

# Quick Reference - Allure GitHub Pages
# Este script mostra os comandos mais usados

cat << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║           ALLURE REPORTS - GITHUB PAGES                        ║
║                  Quick Reference                               ║
╚════════════════════════════════════════════════════════════════╝

📊 URL DO RELATÓRIO PUBLICADO:
   https://wesleyjesus.github.io/playwright-typescrip-basico/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 COMANDOS PRINCIPAIS:

1. Deploy rápido (executar testes + publicar):
   ./deploy-allure.sh "sua mensagem de commit"

2. Executar testes localmente:
   npm run test:e2e

3. Gerar relatório local:
   npm run allure:generate
   npm run allure:open

4. Limpar resultados anteriores:
   npm run allure:clean

5. Ver status do servidor Allure:
   npm run allure:status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 CONFIGURAÇÃO INICIAL (apenas uma vez):

1. Habilitar GitHub Pages:
   Settings > Pages > Source: gh-pages > Save

2. Configurar permissões:
   Settings > Actions > General > Workflow permissions
   ✅ Read and write permissions

3. Executar primeiro deploy:
   ./deploy-allure.sh "feat: setup allure reports"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 WORKFLOW AUTOMÁTICO:

Triggers (executa automaticamente):
  ✓ Push para main/master
  ✓ Pull Requests
  ✓ Execução manual (Actions > Run workflow)

Acompanhar execução:
  https://github.com/wesleyjesus/playwright-typescrip-basico/actions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 ARQUIVOS CRIADOS:

  .github/workflows/playwright-allure.yml  - Workflow CI/CD
  .github/ALLURE_GITHUB_PAGES.md          - Documentação completa
  deploy-allure.sh                        - Script de deploy rápido
  package.json                            - Scripts atualizados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆘 TROUBLESHOOTING:

Erro de permissão?
  → Settings > Actions > Workflow permissions

Relatório não atualiza?
  → Aguarde 2-3 minutos + Ctrl+Shift+R

Workflow falhou?
  → Verifique logs em Actions
  → Execute: npm run test:ci

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 DOCUMENTAÇÃO COMPLETA:
   cat .github/ALLURE_GITHUB_PAGES.md

EOF
