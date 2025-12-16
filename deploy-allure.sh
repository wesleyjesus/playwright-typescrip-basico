#!/bin/bash

# Script para fazer push e acionar o workflow do GitHub Pages
# Uso: ./deploy-allure.sh "mensagem do commit"

set -e

echo "🚀 Deploy Allure Report to GitHub Pages"
echo "========================================"

# Verificar se há mensagem de commit
COMMIT_MESSAGE="${1:-chore: update allure reports}"

echo ""
echo "📝 Commit message: $COMMIT_MESSAGE"
echo ""

# Verificar se há mudanças para commitar
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 Preparando arquivos..."
    git add .
    
    echo "💾 Criando commit..."
    git commit -m "$COMMIT_MESSAGE"
else
    echo "ℹ️  Nenhuma mudança para commitar"
fi

echo ""
echo "🔄 Fazendo push para GitHub..."
git push origin main

echo ""
echo "✅ Push concluído!"
echo ""
echo "🎯 Próximos passos:"
echo "   1. Acesse: https://github.com/wesleyjesus/playwright-typescrip-basico/actions"
echo "   2. Aguarde o workflow 'Playwright Tests with Allure Report' finalizar"
echo "   3. Acesse o relatório em: https://wesleyjesus.github.io/playwright-typescrip-basico/"
echo ""
echo "⏱️  Tempo estimado: 3-5 minutos"
echo ""
