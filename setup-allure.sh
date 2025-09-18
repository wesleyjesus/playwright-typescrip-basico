#!/bin/bash

# Script para configurar ambiente Java headless para Allure Report
# Este script configura o ambiente necessário para rodar Allure em containers headless

echo "🔧 Configurando ambiente Java headless para Allure..."

# Configurar variáveis de ambiente para Java headless
export JAVA_OPTS="-Djava.awt.headless=true"
export DISPLAY=:99

# Verificar se Xvfb está rodando
if ! pgrep -x "Xvfb" > /dev/null; then
    echo "📺 Iniciando Xvfb (Display Virtual)..."
    Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    sleep 2
else
    echo "✅ Xvfb já está rodando"
fi

# Verificar se Java está configurado corretamente
if java -version > /dev/null 2>&1; then
    echo "✅ Java configurado: $(java -version 2>&1 | head -n 1)"
else
    echo "❌ Java não encontrado"
    exit 1
fi

# Verificar se allure-commandline está instalado
if allure --version > /dev/null 2>&1; then
    echo "✅ Allure CLI configurado: $(allure --version)"
else
    echo "❌ Allure CLI não encontrado"
    exit 1
fi

echo "🎯 Ambiente configurado com sucesso!"
echo "📊 Use 'npm run allure:serve' para iniciar o relatório"
echo "🌐 Acesse http://localhost:4040 no navegador"