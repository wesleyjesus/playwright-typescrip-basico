#!/bin/bash

# Quick Start - First Deploy
# Execute este script para fazer o primeiro deploy do Allure no GitHub Pages

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║           🚀 PRIMEIRO DEPLOY - ALLURE GITHUB PAGES               ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 CHECKLIST PRÉ-DEPLOY:"
echo ""
echo "  ⚠️  IMPORTANTE: Você precisa configurar o GitHub primeiro!"
echo ""
echo "  1. Habilitar GitHub Pages:"
echo "     https://github.com/wesleyjesus/playwright-typescrip-basico/settings/pages"
echo "     → Source: gh-pages"
echo ""
echo "  2. Configurar Permissões:"
echo "     https://github.com/wesleyjesus/playwright-typescrip-basico/settings/actions"
echo "     → Workflow permissions: Read and write"
echo ""

read -p "✅ Você já configurou o GitHub? (s/N): " confirmacao

if [[ ! $confirmacao =~ ^[Ss]$ ]]; then
    echo ""
    echo "❌ Configure o GitHub primeiro e execute este script novamente."
    echo ""
    exit 1
fi

echo ""
echo "🎯 Iniciando deploy..."
echo ""

# Adicionar todos os arquivos
echo "📦 Adicionando arquivos..."
git add .

# Commit
echo "💾 Criando commit..."
git commit -m "feat: setup Allure Reports with GitHub Pages

- Add GitHub Actions workflow for automated testing
- Configure Allure report generation and publishing
- Add deployment scripts and documentation
- Update README with badges and instructions
- Enable CI/CD pipeline with test history"

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
echo "  1. Acompanhe a execução:"
echo "     https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
echo ""
echo "  2. Aguarde 3-5 minutos para o workflow finalizar"
echo ""
echo "  3. Acesse o relatório publicado:"
echo "     https://wesleyjesus.github.io/playwright-typescrip-basico/"
echo ""
echo "  4. Se der erro, verifique:"
echo "     - Permissões do GitHub Actions (Read and write)"
echo "     - GitHub Pages habilitado (branch gh-pages)"
echo "     - Logs do workflow em Actions"
echo ""
echo "💡 Dica: A branch gh-pages será criada automaticamente na primeira execução!"
echo ""
echo "📚 Para mais informações: ./allure-pages-help.sh"
echo ""
