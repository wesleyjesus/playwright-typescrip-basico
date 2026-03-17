#!/bin/bash

# Quick Start - First Deploy
# Execute este script para fazer o primeiro deploy do Allure no GitHub Pages

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║           🚀 PRIMEIRO DEPLOY - ALLURE GITHUB PAGES               ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 VERIFICAÇÃO DE CONFIGURAÇÃO:"
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
    echo "❌ Deploy cancelado."
    exit 1
fi

echo "🎯 Iniciando deploy..."
echo "📦 Adicionando arquivos..."
git add .

if git diff --cached --quiet; then
    echo "⚠️  Nenhuma mudança detectada. Nada para commitar."
    read -p "Deseja forçar execução do workflow mesmo assim? (s/N): " forcar

    if [[ $forcar =~ ^[Ss]$ ]]; then
        echo "💡 Execute manualmente o workflow em:"
        echo "   https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
    fi
    exit 0
fi

echo "💾 Criando commit..."
git commit -m "feat: setup Allure Reports with GitHub Pages landing page

- Configure GitHub Actions workflow for automated testing
- Create landing page with project information
- Enable Allure report generation with history in /allure-report/
- Set up deployment to gh-pages branch
- Add deployment scripts and documentation
- Configure CI/CD pipeline with test artifacts"

echo "🚀 Enviando para GitHub..."
git push origin main

echo "✅ Deploy iniciado!"
echo "🌐 Acompanhe: https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
echo "📚 Para mais informações: cat .github/ALLURE_GITHUB_PAGES.md"
