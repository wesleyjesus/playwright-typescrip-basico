#!/bin/bash
# Script para iniciar o Dev Container a partir da raiz do projeto
# Garante que o docker-compose seja executado do diretório correto

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEVCONTAINER_DIR="$PROJECT_ROOT/.devcontainer"

echo "🚀 Iniciando Dev Container..."
echo "📁 Diretório do projeto: $PROJECT_ROOT"
echo "📁 Diretório devcontainer: $DEVCONTAINER_DIR"

cd "$DEVCONTAINER_DIR"

echo "🔨 Construindo e iniciando container..."
docker-compose down 2>/dev/null || true
docker-compose up --build -d

echo "✅ Container iniciado com sucesso!"
echo ""
echo "Para verificar os arquivos no container, execute:"
echo "  docker exec -it playwright-devcontainer-docker ls -la /home/pwuser/app"
echo ""
echo "Para abrir um terminal no container, execute:"
echo "  docker exec -it playwright-devcontainer-docker zsh"

