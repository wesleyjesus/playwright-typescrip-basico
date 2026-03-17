#!/bin/bash

# Script para fazer push e acionar o workflow do GitHub Pages
# Uso: bash scripts/allure/deploy.sh "mensagem do commit"

set -e

COMMIT_MESSAGE="${1:-chore: update allure reports}"

echo "🚀 Deploy Allure Report to GitHub Pages"
echo "========================================"
echo "📝 Commit message: $COMMIT_MESSAGE"

if [ -n "$(git status --porcelain)" ]; then
    echo "📦 Preparando arquivos..."
    git add .
    echo "💾 Criando commit..."
    git commit -m "$COMMIT_MESSAGE"
else
    echo "ℹ️  Nenhuma mudança para commitar"
fi

echo "🔄 Fazendo push para GitHub..."
git push origin main

echo "✅ Push concluído!"
echo "🎯 Próximos passos:"
echo "   1. Acesse: https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
echo "   2. Aguarde o workflow 'Playwright Tests with Allure Report' finalizar"
echo "   3. Acesse o relatório em: https://wesleyjesus.github.io/playwright-typescrip-basico/"
