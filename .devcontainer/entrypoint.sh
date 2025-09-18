#!/usr/bin/env bash
set -euo pipefail

# Entrypoint que ajusta permissões dos arquivos montados e executa o comando como pwuser
PROJECT_DIR="/home/pwuser/app"
PWUSER="pwuser"

echo "[entrypoint] Ajustando propriedade de $PROJECT_DIR para $PWUSER (se aplicável)"
if [ -d "$PROJECT_DIR" ]; then
  # Tenta chown recursivo; falha silenciosamente se não for permitido
  chown -R "$PWUSER:$PWUSER" "$PROJECT_DIR" 2>/dev/null || true
fi

if [ "$#" -eq 0 ]; then
  echo "[entrypoint] Sem comando passado — abrindo shell zsh como $PWUSER"
  exec su -s /bin/zsh - "$PWUSER"
else
  echo "[entrypoint] Executando comando como $PWUSER: $*"
  exec su -s /bin/zsh -c "$*" "$PWUSER"
fi
