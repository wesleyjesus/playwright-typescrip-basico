#!/bin/bash

# Script para abrir o Playwright Codegen
# Uso: ./codegen.sh [URL] [opções]

URL=${1:-"https://example.com"}
BROWSER=${2:-"chromium"}

echo "🎭 Iniciando Playwright Codegen..."
echo "🌐 URL: $URL"
echo "🌍 Browser: $BROWSER"
echo ""

# Executa o codegen com as opções fornecidas
npx playwright codegen \
  --browser="$BROWSER" \
  --viewport-size=1280,720 \
  --device="Desktop Chrome" \
  "$URL" \
  "${@:3}"

echo ""
echo "✅ Codegen finalizado!"