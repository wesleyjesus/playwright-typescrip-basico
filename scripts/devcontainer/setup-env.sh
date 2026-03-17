#!/bin/bash
# Script para configurar variáveis de ambiente para o Dev Container
# Execute este script antes de abrir o container no VS Code

set -e

echo "Configurando variáveis de ambiente para o Dev Container..."

export LOCAL_UID=$(id -u)
export LOCAL_GID=$(id -g)

echo "LOCAL_UID=$LOCAL_UID" > .devcontainer/.env
echo "LOCAL_GID=$LOCAL_GID" >> .devcontainer/.env

echo "Variáveis configuradas:"
echo "LOCAL_UID=$LOCAL_UID"
echo "LOCAL_GID=$LOCAL_GID"
echo "Arquivo .env criado em .devcontainer/.env"
