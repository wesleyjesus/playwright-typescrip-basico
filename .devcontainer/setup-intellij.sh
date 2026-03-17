#!/bin/bash

# Script para configurar e iniciar o Dev Container para IntelliJ
# Este script configura o ambiente para que os arquivos sejam copiados durante o build

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=========================================="
echo "Dev Container Setup para IntelliJ"
echo "=========================================="
echo ""

# Função para parar e remover container existente
cleanup() {
    echo "🧹 Limpando container existente..."
    cd "$SCRIPT_DIR"
    docker compose down -v 2>/dev/null || true
    echo "✅ Cleanup concluído"
    echo ""
}

# Função para build da imagem
build_image() {
    echo "🔨 Building imagem Docker..."
    cd "$SCRIPT_DIR"
    docker compose build --no-cache
    echo "✅ Build concluído"
    echo ""
}

# Função para iniciar o container
start_container() {
    echo "🚀 Iniciando container..."
    cd "$SCRIPT_DIR"
    docker compose up -d
    echo "✅ Container iniciado"
    echo ""
}

# Função para verificar arquivos
verify_files() {
    echo "🔍 Verificando arquivos no container..."
    sleep 2
    FILE_COUNT=$(docker exec playwright-devcontainer-intellij ls -la /home/pwuser/app | wc -l)

    if [ "$FILE_COUNT" -gt 5 ]; then
        echo "✅ Arquivos copiados com sucesso!"
        echo ""
        echo "Arquivos no container:"
        docker exec playwright-devcontainer-intellij ls -la /home/pwuser/app | head -20
    else
        echo "❌ ERRO: Pasta do container está vazia!"
        echo "Verifique o arquivo .env e tente novamente"
        exit 1
    fi
    echo ""
}

# Função para mostrar instruções de conexão
show_instructions() {
    echo "=========================================="
    echo "📚 Como conectar no IntelliJ:"
    echo "=========================================="
    echo ""
    echo "1. Abra o IntelliJ IDEA"
    echo "2. Vá em: View > Tool Windows > Services"
    echo "3. Expanda: Docker > Containers"
    echo "4. Encontre: playwright-devcontainer-intellij"
    echo "5. Clique com botão direito > 'Attach Shell' ou 'Exec'"
    echo ""
    echo "=========================================="
    echo "🔧 Comandos úteis:"
    echo "=========================================="
    echo ""
    echo "# Verificar arquivos:"
    echo "docker exec -it playwright-devcontainer-intellij ls -la /home/pwuser/app"
    echo ""
    echo "# Abrir shell no container:"
    echo "docker exec -it playwright-devcontainer-intellij zsh"
    echo ""
    echo "# Parar container:"
    echo "docker compose -f $SCRIPT_DIR/docker-compose.yml down"
    echo ""
    echo "# Rebuild completo:"
    echo "bash $SCRIPT_DIR/setup-intellij.sh"
    echo ""
}

# Menu principal
echo "Escolha uma opção:"
echo "1) Setup completo (recomendado para primeira vez)"
echo "2) Apenas rebuild"
echo "3) Apenas start"
echo "4) Verificar arquivos"
echo "5) Configurar .env para IntelliJ"
echo ""
read -p "Digite o número da opção [1-5]: " option

case $option in
    1)
        echo ""
        echo "🎯 Executando setup completo..."
        echo ""

        # Configurar .env para IntelliJ se existir .env.intellij
        if [ -f "$SCRIPT_DIR/.env.intellij" ]; then
            echo "📝 Configurando .env para IntelliJ..."
            cp "$SCRIPT_DIR/.env.intellij" "$SCRIPT_DIR/.env"
            echo "✅ .env configurado"
            echo ""
        fi

        cleanup
        build_image
        start_container
        verify_files
        show_instructions
        ;;
    2)
        echo ""
        echo "🔨 Executando rebuild..."
        echo ""
        cleanup
        build_image
        start_container
        verify_files
        ;;
    3)
        echo ""
        echo "🚀 Iniciando container..."
        echo ""
        start_container
        verify_files
        ;;
    4)
        echo ""
        verify_files
        ;;
    5)
        echo ""
        echo "📝 Configurando .env para IntelliJ..."
        if [ -f "$SCRIPT_DIR/.env.intellij" ]; then
            cp "$SCRIPT_DIR/.env.intellij" "$SCRIPT_DIR/.env"
            echo "✅ .env configurado para IntelliJ"
            echo ""
            echo "Arquivo .env atualizado:"
            cat "$SCRIPT_DIR/.env"
            echo ""
            echo "⚠️  Execute rebuild para aplicar mudanças (opção 2)"
        else
            echo "❌ Arquivo .env.intellij não encontrado"
        fi
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "✅ Processo concluído!"
echo "=========================================="

