# Correções Automáticas de Permissões - DevContainer

## Resumo das Alterações

Este documento descreve as correções automáticas de permissões implementadas no DevContainer para resolver problemas comuns de desenvolvimento.

## Problemas Resolvidos

### 1. Warnings do Oh My Zsh
**Problema**: Warnings sobre "insecure completion-dependent directories"
```
[oh-my-zsh] Insecure completion-dependent directories detected:
drwxrwxrwx 1 ubuntu ubuntu 4096 Oct 13 15:10 /home/pwuser/.oh-my-zsh
```

**Solução**: Aplicação automática de `chmod -R 755 /home/pwuser/.oh-my-zsh`

### 2. Problemas de Permissão de Escrita
**Problema**: Arquivos não podem ser criados ou editados devido a permissões restritivas
**Solução**: Aplicação automática de `chmod -R a+rwX /home/pwuser/app`

## Implementação

### Dockerfile
As correções foram adicionadas em duas camadas:

1. **Durante a build** (linhas ~45-50):
```dockerfile
# Corrige permissões do Oh My Zsh durante instalação
RUN git clone https://github.com/ohmyzsh/ohmyzsh.git /home/pwuser/.oh-my-zsh \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser/.oh-my-zsh \
 && chmod -R 755 /home/pwuser/.oh-my-zsh
```

2. **Durante a configuração** (linhas ~95-100):
```dockerfile
RUN mkdir -p /home/pwuser/.config /home/pwuser/app/node_modules \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser || true \
 && chmod -R a+rwX /home/pwuser || true \
 && chmod -R a+rwX /home/pwuser/app || true
```

### Entrypoint
O arquivo `entrypoint.sh` foi modificado para aplicar correções a cada inicialização:

```bash
# Corrigir permissões do Oh My Zsh (evita warnings de completions)
if [ -d "/home/$PWUSER/.oh-my-zsh" ]; then
  echo "[entrypoint] Corrigindo permissões do Oh My Zsh"
  chmod -R 755 "/home/$PWUSER/.oh-my-zsh" 2>/dev/null || true
  chown -R "$PWUSER:$PWUSER" "/home/$PWUSER/.oh-my-zsh" 2>/dev/null || true
fi

# Corrigir permissões do projeto completo
if [ -d "$PROJECT_DIR" ]; then
  echo "[entrypoint] Corrigindo permissões do projeto: $PROJECT_DIR"
  chmod -R a+rwX "$PROJECT_DIR" 2>/dev/null || true
fi
```

## Benefícios

### ✅ Automático
- Não requer intervenção manual após rebuild do container
- Correções aplicadas a cada inicialização

### ✅ Seguro
- Usa `2>/dev/null || true` para evitar falhas em bind mounts
- Mantém funcionalidade mesmo se algumas operações falharem

### ✅ Robusto
- Funciona tanto em builds quanto em runtime
- Adaptável a diferentes configurações de host

## Como Testar

### 1. Rebuild do Container
```bash
# No VS Code: Command Palette > Dev Containers: Rebuild Container
# Ou via Docker Compose:
docker-compose -f .devcontainer/docker-compose.yml up --build
```

### 2. Verificar Oh My Zsh
```bash
# Deve carregar sem warnings
source ~/.zshrc

# Verificar permissões
ls -la ~/.oh-my-zsh/
```

### 3. Verificar Escrita de Arquivos
```bash
# Deve funcionar sem erros
echo "teste" > /home/pwuser/app/teste.txt
rm /home/pwuser/app/teste.txt
```

### 4. Executar Script de Verificação
```bash
./test-zsh-setup.sh
```

## Comandos Equivalentes Manuais

Se por algum motivo as correções automáticas falharem, os comandos manuais são:

```bash
# Corrigir Oh My Zsh
sudo chown -R pwuser:pwuser /home/pwuser/.oh-my-zsh
sudo chmod -R 755 /home/pwuser/.oh-my-zsh

# Corrigir projeto
sudo chmod -R a+rwX /home/pwuser/app

# Recarregar configurações
source ~/.zshrc
```

## Logs de Debug

O entrypoint gera logs úteis durante a inicialização:
```
[entrypoint] Aplicando correções de permissões automáticas...
[entrypoint] Corrigindo permissões do Oh My Zsh
[entrypoint] Corrigindo permissões do projeto: /home/pwuser/app
```

Monitore estes logs para verificar se as correções estão sendo aplicadas.

---
**Última atualização**: 13 de outubro de 2025  
**Responsável**: Configuração automática via DevContainer