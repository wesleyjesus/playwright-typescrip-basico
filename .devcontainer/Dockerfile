# Use a imagem oficial do Playwright como base
FROM mcr.microsoft.com/playwright:v1.55.0-noble
USER root
# Ajuste de UID/GID para evitar problemas de permissão com bind mounts do host
ARG USER_UID=1000
ARG USER_GID=1000

# Se a imagem já tiver o usuário 'pwuser', atualize UID/GID e garanta propriedade
RUN groupmod -g ${USER_GID} pwuser || true \
 && usermod -u ${USER_UID} -g ${USER_GID} pwuser || true \
 && mkdir -p /home/pwuser/app /home/pwuser/app/node_modules /home/pwuser/app/.devcontainer \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser

# Instalar zsh e configurar como shell padrão
RUN apt-get update && apt-get install -y zsh curl git \
 && chsh -s /bin/zsh pwuser \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Oh My Zsh para o usuário pwuser
RUN su - pwuser -c "sh -c \"\$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\" \"\" --unattended" \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser/.oh-my-zsh /home/pwuser/.zshrc || true

RUN npm install -g yarn@latest

# Atualiza npm globalmente durante a build para sempre usar a versão mais atual estável
RUN npm install -g npm@latest || true

# Install Java (required for Allure Report CLI) and X11 dependencies for headless operation
RUN apt-get update && apt-get install -y openjdk-17-jre-headless xvfb \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install Allure CLI globally
RUN npm install -g allure-commandline

# Configura prefix para instalações globais do npm no diretório do usuário, evitando a necessidade de sudo
ENV NPM_CONFIG_PREFIX=/home/pwuser/.npm-global
ENV PATH=/home/pwuser/.npm-global/bin:$PATH
RUN mkdir -p /home/pwuser/.npm-global \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser/.npm-global \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# NPM global packages configuration' >> /home/pwuser/.zshrc \
 && echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> /home/pwuser/.zshrc \
 && chown ${USER_UID}:${USER_GID} /home/pwuser/.zshrc || true

# Garantir que /home/pwuser e arquivos de configuração existam e tenham dono correto
# Criamos .yarnrc vazio e garantimos ownership e permissões antes de qualquer instalação
RUN mkdir -p /home/pwuser/.config /home/pwuser/app/node_modules \
 && touch /home/pwuser/.yarnrc \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser || true \
 && chmod -R a+rwX /home/pwuser || true

# Configurar Git para aceitar o diretório do projeto como seguro
# Resolve "potentially unsafe as the folder is owned by someone other than the current user"
RUN git config --global --add safe.directory '*' \
 && git config --global --add safe.directory /home/pwuser/app

# Defina uma variável HOME personalizada fora do diretório do projeto
ENV HOME=/home/pwuser
ENV APP_DIR=/home/pwuser/app

# Copia entrypoint que ajusta permissões de bind mounts e executa como pwuser
COPY .devcontainer/entrypoint.sh /usr/local/bin/devcontainer-entrypoint.sh
RUN chmod +x /usr/local/bin/devcontainer-entrypoint.sh

# Definimos ENTRYPOINT — quando o container iniciar como root (p.ex. via docker-compose),
# o entrypoint poderá ajustar permissões dos bind mounts e então executar o comando como pwuser.
ENTRYPOINT ["/usr/local/bin/devcontainer-entrypoint.sh"]

# Troca para o usuário padrão para camadas seguintes por segurança
USER pwuser

# Define o diretório de trabalho para a aplicação
WORKDIR ${APP_DIR}

# Copia arquivos de dependência do Yarn
# Copia arquivos de dependência do Yarn
# Copia arquivos de dependência (serão instalados no postCreateCommand)
COPY --chown=pwuser:pwuser package.json yarn.lock* ./

# Copia o restante do código com permissões corretas
COPY --chown=pwuser:pwuser . .

# Expõe a porta usada pelo run-server
EXPOSE 3000
EXPOSE 9323

# Comando padrão (mantém contêiner rodando com servidor Playwright)
# CMD ["npx", "-y", "playwright", "run-server", "--port", "3000", "--host", "0.0.0.0"]