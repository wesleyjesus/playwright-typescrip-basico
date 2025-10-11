# Use a imagem oficial do Playwright como base
FROM mcr.microsoft.com/playwright:v1.56.0-noble
USER root
# Ajuste de UID/GID para evitar problemas de permissão com bind mounts do host
ARG USER_UID=1000
ARG USER_GID=1000

# Se a imagem já tiver o usuário 'pwuser', atualize UID/GID e garanta propriedade
RUN groupmod -g ${USER_GID} pwuser || true \
 && usermod -u ${USER_UID} -g ${USER_GID} pwuser || true \
 && mkdir -p /home/pwuser/app /home/pwuser/app/node_modules /home/pwuser/app/.devcontainer \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser

# Instalar common utilities and development tools
RUN apt-get update && apt-get install -y \
    zsh \
    curl \
    git \
    sudo \
    jq \
    wget \
    unzip \
    htop \
    nano \
    tree \
    less \
    man-db \
    manpages \
    build-essential \
 && chsh -s /bin/zsh pwuser \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Add pwuser to sudo group for development convenience
RUN usermod -aG sudo pwuser \
 && echo "pwuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/pwuser

# Instalar Oh My Zsh manualmente para evitar problemas de SSL/certificados
RUN git config --global http.sslVerify false \
 && git clone https://github.com/ohmyzsh/ohmyzsh.git /home/pwuser/.oh-my-zsh \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser/.oh-my-zsh

# Instalar plugins do zsh
RUN git clone https://github.com/zsh-users/zsh-autosuggestions /home/pwuser/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
 && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git /home/pwuser/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser/.oh-my-zsh/custom

RUN npm install -g yarn@latest

# Atualiza npm globalmente durante a build para sempre usar a versão mais atual estável
RUN npm install -g npm@latest || true

# Install Java (required for Allure Report CLI)
RUN apt-get update && apt-get install -y openjdk-17-jre-headless \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install Allure CLI globally usando Yarn
RUN yarn global add allure-commandline

# Configura prefix para instalações globais do npm no diretório do usuário, evitando a necessidade de sudo
ENV NPM_CONFIG_PREFIX=/home/pwuser/.npm-global
ENV PATH=/home/pwuser/.npm-global/bin:$PATH
RUN mkdir -p /home/pwuser/.npm-global \
 && chown -R ${USER_UID}:${USER_GID} /home/pwuser/.npm-global

# Criar arquivo .zshrc completo com Oh My Zsh
RUN echo '# Path to your oh-my-zsh installation.' > /home/pwuser/.zshrc \
 && echo 'export ZSH="$HOME/.oh-my-zsh"' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Set name of the theme to load' >> /home/pwuser/.zshrc \
 && echo 'ZSH_THEME="agnoster"' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Which plugins would you like to load?' >> /home/pwuser/.zshrc \
 && echo 'plugins=(' >> /home/pwuser/.zshrc \
 && echo '    git' >> /home/pwuser/.zshrc \
 && echo '    docker' >> /home/pwuser/.zshrc \
 && echo '    docker-compose' >> /home/pwuser/.zshrc \
 && echo '    npm' >> /home/pwuser/.zshrc \
 && echo '    yarn' >> /home/pwuser/.zshrc \
 && echo '    zsh-autosuggestions' >> /home/pwuser/.zshrc \
 && echo '    zsh-syntax-highlighting' >> /home/pwuser/.zshrc \
 && echo ')' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Load Oh My Zsh' >> /home/pwuser/.zshrc \
 && echo 'source $ZSH/oh-my-zsh.sh' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# NPM global packages configuration' >> /home/pwuser/.zshrc \
 && echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Custom aliases' >> /home/pwuser/.zshrc \
 && echo 'alias ll="ls -alF"' >> /home/pwuser/.zshrc \
 && echo 'alias la="ls -A"' >> /home/pwuser/.zshrc \
 && echo 'alias l="ls -CF"' >> /home/pwuser/.zshrc \
 && echo 'alias ..="cd .."' >> /home/pwuser/.zshrc \
 && echo 'alias ...="cd ../.."' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Playwright aliases' >> /home/pwuser/.zshrc \
 && echo 'alias pw="npx playwright"' >> /home/pwuser/.zshrc \
 && echo 'alias pwtest="npx playwright test"' >> /home/pwuser/.zshrc \
 && echo 'alias pwcodegen="npx playwright codegen"' >> /home/pwuser/.zshrc \
 && echo 'alias pwshow="npx playwright show-report"' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Package manager aliases' >> /home/pwuser/.zshrc \
 && echo 'alias ptest="npm run test:e2e"' >> /home/pwuser/.zshrc \
 && echo 'alias pcodegen="npm run codegen"' >> /home/pwuser/.zshrc \
 && echo 'alias pallure="npm run allure:serve"' >> /home/pwuser/.zshrc \
 && echo 'alias pclean="npm run allure:clean"' >> /home/pwuser/.zshrc \
 && echo '' >> /home/pwuser/.zshrc \
 && echo '# Allure aliases' >> /home/pwuser/.zshrc \
 && echo 'alias allure-serve="npm run allure:serve"' >> /home/pwuser/.zshrc \
 && echo 'alias allure-clean="npm run allure:clean"' >> /home/pwuser/.zshrc \
 && echo 'alias allure-generate="npm run allure:generate"' >> /home/pwuser/.zshrc \
 && echo 'alias allure-open="npm run allure:open"' >> /home/pwuser/.zshrc \
 && chown ${USER_UID}:${USER_GID} /home/pwuser/.zshrc

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


# Definimos ENTRYPOINT — o entrypoint executa como root para ajustar permissões
ENTRYPOINT ["/usr/local/bin/devcontainer-entrypoint.sh"]

# NÃO mudamos para USER pwuser aqui. Mantemos root como usuário de runtime para
# permitir que o entrypoint ajuste ownership/permissões dos bind mounts montados
# pelo host. O entrypoint faz o drop para pwuser ao final.

# Define o diretório de trabalho para a aplicação

WORKDIR ${APP_DIR}

# Ajusta o relógio do sistema
RUN hwclock --hctosys || true

# Copia arquivos de dependência primeiro. Não forçamos chown aqui porque o
# entrypoint fará ajustes em tempo de execução para acomodar bind mounts do host.
COPY package.json yarn.lock* ./

# Copia o restante do código. Mantemos owners como na imagem (root) e o
# entrypoint cuidará do ajuste de ownership quando o container iniciar.
COPY . .

# Expõe a porta usada pelo run-server
EXPOSE 3000
EXPOSE 9323

# Comando padrão (mantém contêiner rodando com servidor Playwright)
CMD ["npx", "-y", "run-server", "--port", "--host", "0.0.0.0"]