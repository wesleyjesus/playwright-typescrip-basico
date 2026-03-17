#!/bin/bash

# Script para gerenciar instâncias do Allure Report
# Permite parar, iniciar e verificar status do servidor Allure

PORT=4040
ACTION=serve

if [[ "$1" == "-h" || "$1" == "--help" || "$1" == "help" ]]; then
    ACTION="help"
elif [[ "$1" =~ ^[0-9]+$ ]]; then
    PORT="$1"
    ACTION=${2:-serve}
elif [[ -n "$1" ]]; then
    ACTION="$1"
    if [[ "$2" =~ ^[0-9]+$ ]]; then
        PORT="$2"
    fi
fi

show_usage() {
    echo "📊 Gerenciador do Allure Report"
    echo ""
    echo "Uso: $0 [PORTA] [AÇÃO]"
    echo ""
    echo "AÇÕES:"
    echo "  serve   - Iniciar servidor Allure (padrão)"
    echo "  stop    - Parar servidor Allure"
    echo "  status  - Verificar status do servidor"
    echo "  restart - Reiniciar servidor"
    echo ""
    echo "PORTA: porta para o servidor (padrão: 4040)"
}

check_allure() {
    if ! command -v allure &> /dev/null; then
        echo "❌ Allure CLI não encontrado. Execute: npm install -g allure-commandline"
        exit 1
    fi
}

get_pid_by_port() {
    local port=$1
    ps aux | grep "allure.*--port $port" | grep -v grep | awk '{print $2}' | head -1
}

stop_allure() {
    local port=$1
    echo "🛑 Parando servidor Allure na porta $port..."

    local pids=$(ps aux | grep "allure.*--port $port" | grep -v grep | awk '{print $2}')

    if [ -n "$pids" ]; then
        for pid in $pids; do
            kill "$pid" 2>/dev/null
        done

        sleep 2

        local remaining_pids=$(ps aux | grep "allure.*--port $port" | grep -v grep | awk '{print $2}')
        if [ -n "$remaining_pids" ]; then
            for pid in $remaining_pids; do
                kill -9 "$pid" 2>/dev/null
            done
        fi

        echo "✅ Servidor parado"
    else
        echo "ℹ️  Nenhum servidor rodando na porta $port"
    fi
}

start_allure() {
    local port=$1
    echo "🚀 Iniciando servidor Allure na porta $port..."

    local existing_pid=$(get_pid_by_port "$port")
    if [ -n "$existing_pid" ]; then
        echo "⚠️  Porta $port já está em uso (PID: $existing_pid)"
        stop_allure "$port"
    fi

    export JAVA_OPTS="-Djava.awt.headless=true"
    export DISPLAY=:99

    if ! pgrep -x "Xvfb" > /dev/null; then
        echo "📺 Iniciando Xvfb..."
        Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
        sleep 2
    fi

    if [ ! -d "allure-results" ] || [ -z "$(ls -A allure-results 2>/dev/null)" ]; then
        echo "⚠️  Pasta allure-results vazia ou inexistente"
        echo "📋 Execute primeiro: npm run test:e2e"
        return 1
    fi

    echo "📊 Servindo relatório em background..."
    nohup allure serve allure-results --port "$port" > allure-server.log 2>&1 &

    sleep 3

    local new_pid=$(get_pid_by_port "$port")
    if [ -n "$new_pid" ]; then
        echo "✅ Servidor iniciado com sucesso!"
        echo "🌐 Acesse: http://localhost:$port"
        echo "📋 PID: $new_pid"
        echo "📄 Logs: tail -f allure-server.log"
    else
        echo "❌ Falha ao iniciar servidor"
        echo "📄 Verifique os logs: cat allure-server.log"
        return 1
    fi
}

check_status() {
    local port=$1
    local pid=$(get_pid_by_port "$port")

    if [ -n "$pid" ]; then
        echo "✅ Servidor Allure rodando"
        echo "📋 PID: $pid"
        echo "🌐 URL: http://localhost:$port"
        echo "🔧 Porta: $port"
    else
        echo "❌ Nenhum servidor rodando na porta $port"
    fi
}

check_allure

case $ACTION in
    "serve")
        start_allure "$PORT"
        ;;
    "stop")
        stop_allure "$PORT"
        ;;
    "status")
        check_status "$PORT"
        ;;
    "restart")
        stop_allure "$PORT"
        sleep 1
        start_allure "$PORT"
        ;;
    "help"|"-h"|"--help")
        show_usage
        ;;
    *)
        echo "❌ Ação inválida: $ACTION"
        show_usage
        exit 1
        ;;
esac
