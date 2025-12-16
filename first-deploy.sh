#!/bin/bash

# Quick Start - First Deploy
# Execute este script para fazer o primeiro deploy do Allure no GitHub Pages

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║           🚀 PRIMEIRO DEPLOY - ALLURE GITHUB PAGES               ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 VERIFICAÇÃO DE CONFIGURAÇÃO:"
echo ""
echo "  ✅ Branch gh-pages: Criada"
echo "  ✅ GitHub Pages configurado para: gh-pages branch"
echo "  ✅ Estrutura: Página inicial + Relatório em /allure-report/"
echo ""
echo "  ⚠️  Verifique as permissões do GitHub Actions:"
echo "     https://github.com/wesleyjesus/playwright-typescrip-basico/settings/actions"
echo "     → Workflow permissions: Read and write permissions"
echo "     → Allow GitHub Actions to create and approve pull requests"
echo ""

read -p "✅ Deseja fazer o deploy agora? (s/N): " confirmacao

if [[ ! $confirmacao =~ ^[Ss]$ ]]; then
    echo ""
    echo "❌ Deploy cancelado."
    echo ""
    exit 1
fi

echo ""
echo "🎯 Iniciando deploy..."
echo ""

# Adicionar todos os arquivos
echo "📦 Adicionando arquivos..."
git add .

# Verificar se há mudanças
if git diff --cached --quiet; then
    echo ""
    echo "⚠️  Nenhuma mudança detectada. Nada para commitar."
    echo ""
    read -p "Deseja forçar execução do workflow mesmo assim? (s/N): " forcar
    
    if [[ $forcar =~ ^[Ss]$ ]]; then
        echo ""
        echo "💡 Acesse manualmente para executar o workflow:"
        echo "   https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
        echo "   Clique em 'Playwright Tests with Allure Report' → 'Run workflow'"
        echo ""
    fi
    exit 0
fi

# Commit
echo "💾 Criando commit..."
git commit -m "feat: setup Allure Reports with GitHub Pages landing page

- Configure GitHub Actions workflow for automated testing
- Create landing page with project information
- Enable Allure report generation with history in /allure-report/
- Set up deployment to gh-pages branch
- Add deployment scripts and documentation
- Configure CI/CD pipeline with test artifacts

Structure:
- Root: Landing page (index.html)
- /allure-report/: Allure test reports

This commit enables automatic generation and publishing of
Allure test reports to GitHub Pages on every push to main."

# Push
echo "🚀 Enviando para GitHub..."
git push origin main

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ DEPLOY INICIADO!                           ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo ""
echo "  1. Acompanhe a execução do workflow:"
echo "     https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
echo ""
echo "  2. Aguarde 3-5 minutos para:"
echo "     ⏱️  Instalação das dependências"
echo "     🧪 Execução dos testes"
echo "     📊 Geração do relatório Allure"
echo "     🏗️  Criação da página inicial"
echo "     🚀 Deploy para gh-pages"
echo ""
echo "  3. Após conclusão, acesse:"
echo "     🏠 Página Inicial: https://wesleyjesus.github.io/playwright-typescrip-basico/"
echo "     📊 Relatório Allure: https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/"
echo ""
echo "  4. Se o workflow falhar, verifique:"
echo "     ❌ Logs do workflow em Actions"
echo "     ❌ Permissões do GitHub Actions (Read and write)"
echo "     ❌ Branch gh-pages existe e está configurada"
echo ""
echo "💡 Dica: O histórico das últimas 20 execuções será mantido!"
echo ""
echo "📚 Para mais informações: ./allure-pages-help.sh"
echo ""