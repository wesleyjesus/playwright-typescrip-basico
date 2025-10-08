#!/bin/bash

echo "🔍 Testando configuração do Oh My Zsh..."

# Verificar se Oh My Zsh foi instalado
if [ -d "$HOME/.oh-my-zsh" ]; then
    echo "✅ Oh My Zsh instalado em: $HOME/.oh-my-zsh"
else
    echo "❌ Oh My Zsh NÃO encontrado!"
    exit 1
fi

# Verificar se plugins foram instalados
if [ -d "$HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions" ]; then
    echo "✅ Plugin zsh-autosuggestions instalado"
else
    echo "❌ Plugin zsh-autosuggestions NÃO encontrado!"
fi

if [ -d "$HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting" ]; then
    echo "✅ Plugin zsh-syntax-highlighting instalado"
else
    echo "❌ Plugin zsh-syntax-highlighting NÃO encontrado!"
fi

# Verificar se .zshrc existe e tem configuração correta
if [ -f "$HOME/.zshrc" ]; then
    echo "✅ Arquivo .zshrc encontrado"
    
    # Verificar conteúdo do .zshrc
    if grep -q "ZSH_THEME=" "$HOME/.zshrc"; then
        echo "✅ Tema configurado: $(grep 'ZSH_THEME=' $HOME/.zshrc)"
    else
        echo "❌ Tema NÃO configurado!"
    fi
    
    if grep -q "zsh-autosuggestions" "$HOME/.zshrc"; then
        echo "✅ Plugin autosuggestions configurado"
    else
        echo "❌ Plugin autosuggestions NÃO configurado!"
    fi
    
    if grep -q "alias pw=" "$HOME/.zshrc"; then
        echo "✅ Aliases personalizados configurados"
    else
        echo "❌ Aliases personalizados NÃO configurados!"
    fi
else
    echo "❌ Arquivo .zshrc NÃO encontrado!"
    exit 1
fi

echo ""
echo "🔧 Testando aliases..."

# Verificar shell atual
echo "Shell atual: $SHELL"

# Source .zshrc em zsh
if [ "$SHELL" = "/bin/zsh" ] || [ "$SHELL" = "/usr/bin/zsh" ]; then
    echo "✅ Zsh é o shell padrão"
    
    # Teste básico de carregamento
    zsh -c "source ~/.zshrc && echo '✅ .zshrc carregado com sucesso'"
else
    echo "⚠️  Zsh não é o shell padrão atual"
fi

echo ""
echo "📋 Resumo da configuração:"
echo "- Oh My Zsh: $([ -d "$HOME/.oh-my-zsh" ] && echo "✅" || echo "❌")"
echo "- Plugins: $([ -d "$HOME/.oh-my-zsh/custom/plugins/zsh-autosuggestions" ] && echo "✅" || echo "❌")"
echo "- .zshrc: $([ -f "$HOME/.zshrc" ] && echo "✅" || echo "❌")"
echo "- Shell: $SHELL"

echo ""
echo "🎯 Para testar após rebuild:"
echo "1. Rebuild do container"
echo "2. Execute: zsh"
echo "3. Teste os aliases: pw, pwtest, pclean, etc."