#!/bin/bash

# Script para abrir o Playwright Codegen
# Uso: bash scripts/playwright/codegen.sh [URL] [browser] [opções extras]

URL=${1:-"https://example.com"}
BROWSER=${2:-"chromium"}

if [[ "$1" == "-h" || "$1" == "--help" || "$1" == "help" ]]; then
  npx playwright codegen --help
  exit 0
fi

echo "🎭 Iniciando Playwright Codegen..."
echo "🌐 URL: $URL"
echo "🌍 Browser: $BROWSER"

npx playwright codegen \
  --browser="$BROWSER" \
  --viewport-size=1280,720 \
  --device="Desktop Chrome" \
  "$URL" \
  "${@:3}"

echo "✅ Codegen finalizado!"
