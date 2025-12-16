#!/usr/bin/env bash
set -euo pipefail

#!/usr/bin/env bash
set -euo pipefail

# Entrypoint que ajusta permissões dos arquivos montados e executa o comando como pwuser
PROJECT_DIR="/home/pwuser/app"
PWUSER="pwuser"

echo "[entrypoint] Iniciando ajustes de permissão em $PROJECT_DIR para $PWUSER (se aplicável)"

# Cria diretórios que o Playwright e Allure costumam usar e garante permissões
ensure_dir() {
  local d="$1"
  if [ ! -d "$d" ]; then
    echo "[entrypoint] Criando diretório: $d"
    mkdir -p "$d" || true
  fi
  # Tenta chown recursivo; captura falhas e apenas informa
  if chown -R "$PWUSER:$PWUSER" "$d" 2>/dev/null; then
    echo "[entrypoint] Ajustado dono de $d para $PWUSER"
  else
    echo "[entrypoint] Aviso: não foi possível mudar dono de $d (provável bind mount do host)"
    # Tenta garantir permissões de escrita sem alterar proprietário
    chmod -R u+rwX,g+rwX,o+rwX "$d" 2>/dev/null || true
  fi
}

# Correções de permissões específicas para Oh My Zsh e projeto
echo "[entrypoint] Aplicando correções de permissões automáticas..."

# Corrigir permissões do Oh My Zsh (evita warnings de completions)
if [ -d "/home/$PWUSER/.oh-my-zsh" ]; then
  echo "[entrypoint] Corrigindo permissões do Oh My Zsh"
  chmod -R 755 "/home/$PWUSER/.oh-my-zsh" 2>/dev/null || true
  chown -R "$PWUSER:$PWUSER" "/home/$PWUSER/.oh-my-zsh" 2>/dev/null || true
fi

# Corrigir permissões do projeto completo (similar ao sudo chmod -R a+rwX)
if [ -d "$PROJECT_DIR" ]; then
  echo "[entrypoint] Corrigindo permissões do projeto: $PROJECT_DIR"
  chmod -R a+rwX "$PROJECT_DIR" 2>/dev/null || true
fi

# Diretórios comuns que precisam ser graváveis por pwuser
ensure_dir "$PROJECT_DIR/test-results"
ensure_dir "$PROJECT_DIR/playwright-report"
ensure_dir "$PROJECT_DIR/allure-results"
ensure_dir "$PROJECT_DIR/allure-report"

# Também ajusta node_modules (algumas operações copiam arquivos de node_modules)
if [ -d "$PROJECT_DIR/node_modules" ]; then
  if chown -R "$PWUSER:$PWUSER" "$PROJECT_DIR/node_modules" 2>/dev/null; then
    echo "[entrypoint] Ajustado dono de node_modules para $PWUSER"
  else
    echo "[entrypoint] Aviso: não foi possível mudar dono de node_modules (keep existing permissions)"
    chmod -R u+rwX,g+rwX,o+rwX "$PROJECT_DIR/node_modules" 2>/dev/null || true
  fi
fi

echo "[entrypoint] Fim dos ajustes de permissão"

if [ "$#" -eq 0 ]; then
  echo "[entrypoint] Sem comando passado — abrindo shell zsh como $PWUSER"
  exec su -s /bin/zsh - "$PWUSER"
else
  echo "[entrypoint] Executando comando como $PWUSER: $*"
  exec su -s /bin/zsh -c "$*" "$PWUSER"
fi
