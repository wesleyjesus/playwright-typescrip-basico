#!/bin/bash

# Quick Reference - Allure GitHub Pages
# Este script mostra os comandos mais usados

cat << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║           ALLURE REPORTS - GITHUB PAGES                        ║
║                  Quick Reference                               ║
╚════════════════════════════════════════════════════════════════╝

📊 URLs PUBLICADAS:
   🏠 Página Inicial: https://wesleyjesus.github.io/playwright-typescrip-basico/
   📊 Relatório Allure: https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 COMANDOS PRINCIPAIS:

1. Deploy rápido (executar testes + publicar):
   ./deploy-allure.sh "sua mensagem de commit"

2. Executar testes localmente:
   yarn test:e2e

3. Executar testes com relatório Allure:
   yarn test:allure          # Executa testes + gera relatório
   yarn test:allure-serve    # Executa testes + abre no navegador

4. Gerenciar relatório Allure local:
   yarn allure:generate      # Gera relatório dos resultados
   yarn allure:open          # Abre relatório existente
   yarn allure:serve         # Gera e abre relatório
   yarn allure:status        # Verifica status do servidor

5. Limpar resultados anteriores:
   yarn allure:clean         # Limpa todos os resultados
   yarn test:allure-clean    # Limpa + testa + abre relatório

6. Executar testes em modo debug:
   yarn test:debug           # Modo debug do Playwright
   yarn test:headed          # Executa com interface gráfica

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 CONFIGURAÇÃO INICIAL (apenas uma vez):

1. Habilitar GitHub Pages:
   https://github.com/wesleyjesus/playwright-typescrip-basico/settings/pages
   → Source: gh-pages
   → Save

2. Configurar permissões do GitHub Actions:
   https://github.com/wesleyjesus/playwright-typescrip-basico/settings/actions
   → Workflow permissions: Read and write permissions
   → ✅ Allow GitHub Actions to create and approve pull requests

3. Executar primeiro deploy:
   ./first-deploy.sh
   # OU
   ./deploy-allure.sh "feat: setup allure reports"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 WORKFLOW AUTOMÁTICO:

Triggers (executa automaticamente):
  ✅ Push para main/master
  ✅ Pull Requests
  ✅ Execução manual (Actions > Run workflow)

O que o workflow faz:
  1. Instala dependências (Node.js + Playwright)
  2. Executa todos os testes
  3. Gera relatório Allure com histórico
  4. Cria página inicial (index.html)
  5. Publica tudo na branch gh-pages

Acompanhar execução:
  https://github.com/wesleyjesus/playwright-typescrip-basico/actions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 ARQUIVOS E ESTRUTURA:

Workflow e Documentação:
  .github/workflows/playwright-allure.yml  - Workflow CI/CD
  .github/ALLURE_GITHUB_PAGES.md          - Documentação completa

Scripts de Deploy:
  deploy-allure.sh                        - Deploy rápido
  first-deploy.sh                         - Primeiro deploy (interativo)
  allure-pages-help.sh                    - Este arquivo de ajuda

Gerenciamento:
  manage-allure.sh                        - Gerencia servidor Allure local
  setup-allure.sh                         - Configura ambiente Allure

Configuração:
  package.json                            - Scripts Yarn disponíveis
  playwright.config.ts                    - Configuração do Playwright

Resultados (gerados localmente):
  allure-results/                         - Dados brutos dos testes
  allure-report/                          - Relatório HTML gerado
  playwright-report/                      - Relatório nativo do Playwright
  test-results/                           - Screenshots e vídeos

Estrutura no GitHub Pages:
  / (root)                                - index.html (página inicial)
  /allure-report/                         - Relatório Allure completo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆘 TROUBLESHOOTING:

Erro de permissão ao salvar?
  → Settings > Actions > Workflow permissions: Read and write

Relatório não atualiza no GitHub Pages?
  → Aguarde 2-3 minutos após workflow completar
  → Force refresh: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)

Workflow falhou?
  → Verifique logs: https://github.com/wesleyjesus/playwright-typescrip-basico/actions
  → Teste localmente: yarn test:ci
  → Verifique se branch gh-pages existe

Servidor Allure local não inicia?
  → Verificar status: yarn allure:status
  → Parar servidor: yarn allure:stop
  → Reiniciar: yarn allure:restart
  → Porta ocupada? ./manage-allure.sh 4041 serve

Permissões no container?
  → sudo chown -R $(id -u):$(id -g) allure-results allure-report
  → sudo chmod -R a+rwX /home/pwuser/app

Branch gh-pages não existe?
  → Crie manualmente: git checkout -b gh-pages && git push origin gh-pages
  → Ou deixe o workflow criar automaticamente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 DICAS ÚTEIS:

1. Workflow roda automaticamente a cada push para main
2. Histórico mantém últimas 20 execuções
3. Screenshots são capturados automaticamente em falhas
4. Use yarn test:allure-clean para começar do zero
5. Relatório local: http://localhost:4040
6. Use ./manage-allure.sh --help para mais opções

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 DOCUMENTAÇÃO COMPLETA:
   cat .github/ALLURE_GITHUB_PAGES.md

📦 SCRIPTS DISPONÍVEIS NO PACKAGE.JSON:
   cat package.json | grep "\"test\|\"allure\|\"codegen"

🔍 VER CONFIGURAÇÃO DO PLAYWRIGHT:
   cat playwright.config.ts

EOF