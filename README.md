# Playwright TypeScript - Configuração Completa 🎭

[![Playwright Tests](https://github.com/wesleyjesus/playwright-typescrip-basico/actions/workflows/playwright-allure.yml/badge.svg)](https://github.com/wesleyjesus/playwright-typescrip-basico/actions/workflows/playwright-allure.yml)
[![Allure Report](https://img.shields.io/badge/Allure-Report-yellow.svg)](https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue.svg)](https://wesleyjesus.github.io/playwright-typescrip-basico/)

Este projeto fornece um ambiente completo de desenvolvimento e teste com Playwright, incluindo:

- ✅ **DevContainer** configurado com permissões automáticas
- ✅ **Oh My Zsh** com tema e plugins produtivos
- ✅ **Allure Report** para relatórios visuais detalhados
- ✅ **GitHub Pages** para publicação automática de relatórios
- ✅ **Aliases personalizados** para agilizar o desenvolvimento
- ✅ **Dual package manager** (npm/yarn) support
- ✅ **Suporte para desenvolvimento local** (VS Code e Eclipse)

## 📊 Relatórios Allure Publicados

🔗 **Página Inicial do Projeto**: [https://wesleyjesus.github.io/playwright-typescrip-basico/](https://wesleyjesus.github.io/playwright-typescrip-basico/)

🔗 **Relatório Allure Direto**: [https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/](https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/)

Os relatórios são automaticamente atualizados a cada push para `main`.

## 📦 Gerenciador de Pacotes

Este projeto usa **Yarn** como gerenciador de pacotes principal. Todos os comandos de exemplo utilizam Yarn.

```bash
# Instalar dependências
yarn install

# Adicionar nova dependência
yarn add <pacote>

# Adicionar dependência de desenvolvimento
yarn add -D <pacote>

# Atualizar pacotes
yarn upgrade

# Atualizar Playwright para a versão mais recente
yarn upgrade @playwright/test@latest
npx playwright install
```

> **Nota**: O projeto possui [`yarn.lock`](yarn.lock). Não use `npm install` para evitar conflitos entre gerenciadores.

## 🚀 Início Rápido

### Opção 1: Usando DevContainer (Recomendado)

#### 1. Abrir no DevContainer

```bash
# No VS Code, use Command Palette:
# > Dev Containers: Reopen in Container
```

#### 2. Instalar Dependências

```bash
# Instalar todas as dependências do projeto
yarn install

# Instalar navegadores do Playwright
npx playwright install
```

#### 3. Verificar Configuração

```bash
# Executar teste de verificação do ambiente:
./test-zsh-setup.sh

# Mudar para zsh (se necessário):
zsh

# Testar aliases:
pwtest  # Executa testes Playwright
pclean  # Limpa relatórios Allure
pallure # Executa testes e abre Allure
```

### Opção 2: Desenvolvimento Local (Sem DevContainer)

#### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 18 ou superior)
   - [Download Node.js](https://nodejs.org/)
   - Verificar instalação: `node --version`

2. **Yarn** (gerenciador de pacotes)
   ```bash
   npm install -g yarn
   ```

3. **Java** (para Allure Report)
   - [Download OpenJDK 17](https://adoptium.net/)
   - Verificar instalação: `java -version`

4. **Git**
   - [Download Git](https://git-scm.com/)

#### Configuração no VS Code

1. **Clonar o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-projeto>
   ```

2. **Instalar dependências**:
   ```bash
   yarn install
   ```

3. **Instalar navegadores do Playwright**:
   ```bash
   npx playwright install
   ```

4. **Instalar Allure CLI globalmente**:
   ```bash
   yarn global add allure-commandline
   
   # Ou com npm:
   npm install -g allure-commandline
   ```

5. **Configurar ambiente Java headless** (opcional, para Allure):
   
   **Linux/macOS**:
   ```bash
   export JAVA_OPTS="-Djava.awt.headless=true"
   export DISPLAY=:99
   ```
   
   **Windows**:
   ```powershell
   $env:JAVA_OPTS="-Djava.awt.headless=true"
   ```

6. **Executar testes**:
   ```bash
   yarn test:e2e
   ```

7. **Abrir relatório Allure**:
   ```bash
   yarn allure:serve
   ```

#### Configuração no Eclipse

O Eclipse não possui suporte nativo para TypeScript/Playwright, mas você pode configurá-lo para trabalhar com o projeto:

1. **Instalar Node.js e Yarn** (conforme pré-requisitos acima)

2. **Importar projeto no Eclipse**:
   - File → Import → General → Existing Projects into Workspace
   - Selecione o diretório do projeto
   - Click em Finish

3. **Instalar plugin Wild Web Developer**:
   - Help → Eclipse Marketplace
   - Buscar por "Wild Web Developer"
   - Instalar o plugin (suporte para TypeScript, JSON, YAML)

4. **Configurar Terminal Integrado**:
   - Window → Show View → Terminal
   - No terminal, navegar até a raiz do projeto

5. **Instalar dependências via Terminal**:
   ```bash
   yarn install
   npx playwright install
   yarn global add allure-commandline
   ```

6. **Executar testes via Terminal**:
   ```bash
   yarn test:e2e
   ```

7. **Visualizar relatórios**:
   ```bash
   yarn allure:serve
   ```

#### Alternativa: Usar Eclipse com Terminal Externo

Se preferir não usar o terminal integrado:

1. **Abrir terminal externo** (CMD, PowerShell, Bash)
2. **Navegar até o projeto**:
   ```bash
   cd caminho/do/projeto
   ```
3. **Executar comandos normalmente**:
   ```bash
   yarn install
   yarn test:e2e
   yarn allure:serve
   ```

#### Estrutura de Diretórios para IDEs

```
projeto/
├── .vscode/              # Configurações do VS Code
│   ├── settings.json
│   └── mcp.json
├── tests/                # Testes Playwright
├── playwright.config.ts  # Configuração do Playwright
├── package.json          # Dependências do projeto
├── yarn.lock             # Lock file do Yarn
└── allure-results/       # Resultados dos testes
```

#### Extensões Recomendadas para VS Code

Instale estas extensões para melhor experiência de desenvolvimento:

1. **Playwright Test for VSCode** (`ms-playwright.playwright`)
   - Execução visual de testes
   - Debugging integrado
   - IntelliSense para Playwright

2. **ESLint** (`dbaeumer.vscode-eslint`)
   - Linting de código

3. **Prettier** (`esbenp.prettier-vscode`)
   - Formatação de código

4. **TypeScript Hero** (`rbbit.typescript-hero`)
   - Organização de imports

Para instalar rapidamente:
```bash
code --install-extension ms-playwright.playwright
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension rbbit.typescript-hero
```

#### Troubleshooting - Desenvolvimento Local

**Problema: `yarn: command not found`**
```bash
npm install -g yarn
```

**Problema: Navegadores não encontrados**
```bash
npx playwright install
npx playwright install-deps  # Linux: instala dependências do sistema
```

**Problema: Allure não encontrado**
```bash
yarn global add allure-commandline
# Verificar PATH global do Yarn
yarn global bin
# Adicionar ao PATH se necessário
```

**Problema: Java não encontrado (Allure)**
- Instalar OpenJDK 17 ou superior
- Configurar variável de ambiente `JAVA_HOME`

**Problema: Permissões no Windows**
```powershell
# Executar PowerShell como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Problema: Porta 4040 em uso (Allure)**
```bash
# Parar servidor existente
yarn allure:stop

# Ou usar porta diferente
./manage-allure.sh 4041 serve
```

## 🎯 Scripts Disponíveis

### Testes Playwright

```bash
yarn test:e2e          # Executa todos os testes
yarn test:headed       # Executa com interface gráfica
yarn test:debug        # Modo debug com PWDEBUG
yarn codegen           # Gera código de teste automaticamente
```

### Allure Reports

#### 📊 Relatórios Publicados (GitHub Pages)

🔗 **Acesse ao vivo:** [https://wesleyjesus.github.io/playwright-typescrip-basico/](https://wesleyjesus.github.io/playwright-typescrip-basico/)

```bash
# Deploy rápido - executa testes e publica no GitHub Pages
./deploy-allure.sh "mensagem do commit"

# Ver ajuda rápida sobre GitHub Pages
./allure-pages-help.sh

# Ver documentação completa
cat .github/ALLURE_GITHUB_PAGES.md
```

#### 🖥️ Relatórios Locais

```bash
yarn allure:serve      # Executa testes e abre relatório
yarn allure:clean      # Limpa resultados anteriores
yarn allure:generate   # Gera relatório sem abrir
yarn allure:open       # Abre relatório existente
yarn allure:stop       # Para servidor Allure
yarn allure:status     # Verifica status do servidor
yarn test:allure       # Executa testes + abre relatório
yarn test:allure-clean # Limpa + executa testes + abre relatório
yarn test:ci           # Executa testes no modo CI (para GitHub Actions)
```

> **📝 Nota**: O workflow do GitHub Actions publica automaticamente os relatórios a cada push para `main`.

### Aliases Úteis (Oh My Zsh - apenas DevContainer)

```bash
# Playwright
pw                      # npx playwright
pwtest                  # npx playwright test
pwcodegen              # npx playwright codegen
pwshow                 # npx playwright show-report

# Gestão de projetos
ptest                  # yarn test:e2e
pcodegen               # yarn codegen
pallure                # yarn allure:serve
pclean                 # yarn allure:clean

# Allure direto
allure-serve           # yarn allure:serve
allure-clean           # yarn allure:clean
allure-generate        # yarn allure:generate
allure-open            # yarn allure:open
```

> **Nota**: Os aliases acima funcionam apenas dentro do DevContainer. No desenvolvimento local, use os comandos completos.

## 🔧 Resolução de Problemas

### Problema de Permissões EACCES

Se encontrar erros de permissão ao salvar arquivos:

**No host (fora do container):**

```bash
# Verificar atributos dos arquivos
lsattr .devcontainer/

# Corrigir permissões se necessário
chmod -R a+rwX .devcontainer/
```

**No container:**

```bash
# Corrigir permissões do Allure
sudo chown -R $(id -u):$(id -g) allure-results allure-report

# Ou use o comando de limpeza que inclui sudo:
yarn allure:clean
```

### Oh My Zsh não carregado

```bash
# Verificar se está usando zsh
echo $SHELL

# Mudar para zsh se necessário
zsh

# Recarregar configuração
source ~/.zshrc

# Verificar instalação
./test-zsh-setup.sh
```

### Servidor Allure com problemas

```bash
# Verificar status
yarn allure:status

# Reiniciar servidor
yarn allure:restart

# Parar servidor manualmente
yarn allure:stop

# Verificar portas em uso
./manage-allure.sh 4040 status
```

## 🎭 Playwright Codegen

Este projeto inclui scripts para facilitar o uso do Playwright Codegen para gravação de testes.

### Usando Yarn

```bash
# Abrir codegen com configurações padrão
yarn codegen

# Abrir codegen em uma URL específica
npx playwright codegen https://exemplo.com.br
```

### Usando o script personalizado (DevContainer)

```bash
# Usar configurações padrão (example.com, chromium)
./codegen.sh

# Especificar URL
./codegen.sh https://google.com

# Especificar URL e browser
./codegen.sh https://google.com firefox

# Usar opções adicionais
./codegen.sh https://google.com chromium --ignore-https-errors
```

### Opções úteis do Playwright Codegen

- `--browser=chromium|firefox|webkit` - Escolher o browser
- `--device="iPhone 12"` - Emular dispositivo específico
- `--viewport-size=1920,1080` - Definir tamanho da viewport
- `--ignore-https-errors` - Ignorar erros de HTTPS
- `--save-storage=auth.json` - Salvar estado de autenticação
- `--load-storage=auth.json` - Carregar estado de autenticação

### Exemplos avançados

```bash
# Codegen para mobile
npx playwright codegen --device="iPhone 12" https://google.com

# Codegen com autenticação salva
npx playwright codegen --load-storage=auth.json https://app.exemplo.com

# Codegen em modo escuro
npx playwright codegen --color-scheme=dark https://exemplo.com
```

## 📝 Observações

- A imagem base do Playwright fornece navegadores e dependências do sistema, mas é importante que a versão do `@playwright/test` no `package.json` esteja alinhada com a imagem Docker (aqui usamos `1.55.0`).
- Para maior segurança ao rodar Chromium com sandbox habilitado, considere usar o `seccomp_profile.json` recomendado pela documentação do Playwright e rodar o container com `--security-opt seccomp=./seccomp_profile.json`.

## 🔄 Próximos passos

- Adicionar exemplos de testes em `tests/` e configuração `playwright.config.ts`.
- Integrar comandos de CI (GitHub Actions) para rodar os testes automaticamente.

## 🔐 Corrigindo permissões no host

Se ao abrir o Dev Container você receber erros de permissão (EACCES) ao salvar arquivos em `.devcontainer` ou no projeto, execute no host (fora do contêiner):

```bash
# Torna o script executável (uma vez)
chmod +x .devcontainer/fix-host-perms.sh

# Executa o script (pedirá confirmação e sudo)
.devcontainer/fix-host-perms.sh
```

O script irá:

- Salvar o estado atual do diretório em `.devcontainer/perms-before.txt`.
- Executar `sudo chown -R pwuser:pwuser /home/pwuser/app`.
- Aplicar `chmod -R u+rwX /home/pwuser/app`.
- Salvar o estado final em `.devcontainer/perms-after.txt`.

Depois, reabra/reconstrua o Dev Container no VS Code.

Se você preferir não alterar proprietário, considere usar `chmod -R a+rwX /home/pwuser/app` no host — isso é menos seguro, mas rápido.

### Comandos úteis usados para diagnóstico e correção

Antes de alterar permissões, é útil inspecionar atributos estendidos (por exemplo, atributo imutável `i`):

```bash
# Verifica se o diretório tem o atributo imutável (i)
lsattr -d /home/pwuser/app /home/pwuser/app/.devcontainer

# Lista atributos dos arquivos dentro de .devcontainer
lsattr /home/pwuser/app/.devcontainer/*
```

Se não houver atributo `i` (imutável), os comandos abaixo ajustam permissões para permitir gravação:

```bash
# Torna todos arquivos e pastas graváveis por todos os usuários (mais aberto)
sudo chmod -R a+rwX /home/pwuser/app

# Alternativa mais restrita (aplica permissão apenas ao dono)
sudo chmod -R u+rwX /home/pwuser/app
```

Aviso: usar `a+rwX` concede permissões amplas (a todos os usuários). Prefira `u+rwX` sempre que possível.

### Ajuste automático ao iniciar o contêiner

O Dev Container agora inclui um `entrypoint` (`.devcontainer/entrypoint.sh`) que tenta ajustar automaticamente a propriedade dos arquivos montados para o usuário `pwuser` no momento da inicialização. Para que isso funcione, o serviço precisa iniciar como `root` (o `docker-compose.yml` foi atualizado para iniciar como root por padrão). O entrypoint tentará executar `chown` sobre `/home/pwuser/app` e então executará o comando do container como `pwuser`.

Para aplicar todas as mudanças (Dockerfile, entrypoint e compose), reconstrua o container:

```bash
# Na raiz do projeto
docker-compose -f .devcontainer/docker-compose.yml up --build
```

Depois abra o projeto no VS Code com Remote - Containers e verifique se agora é possível salvar em `.devcontainer` sem erro de permissão.

## ⚙️ Configuração de Gerenciadores de Pacotes

### Yarn (Principal)

Este projeto usa **Yarn** como gerenciador principal. Todos os scripts são otimizados para Yarn:

```bash
yarn install           # Instalar dependências
yarn test:e2e          # Executar testes
yarn allure:serve      # Servir relatório Allure
```

### npm (Disponível para instalações globais)

O Dev Container também está configurado para permitir instalações globais do npm sem sudo:

- `NPM_CONFIG_PREFIX=/home/pwuser/.npm-global` - diretório para pacotes globais
- PATH atualizado para incluir `/home/pwuser/.npm-global/bin`
- Configuração persistida no `.zshrc` do usuário

Isso permite executar comandos como:

```bash
npm install -g <pacote>
npm install -g npm@latest
```

Sem receber erros EACCES (permission denied).

> ⚠️ **Importante**: Use Yarn para dependências do projeto e npm apenas para instalações globais.

## 🐚 Shell padrão

O container está configurado para usar **zsh** como shell padrão em vez do bash. Isso inclui:

- Zsh instalado durante a build da imagem
- **Oh My Zsh** instalado automaticamente com tema "devcontainers"
- Configurado como shell padrão para o usuário `pwuser`
- Configurações do npm aplicadas ao `.zshrc`
- Features do Dev Container para plugins e histórico do zsh

### Oh My Zsh Features

O Oh My Zsh fornece:

- Centenas de plugins úteis
- Temas visuais atraentes
- Auto-complete inteligente
- Aliases úteis para desenvolvimento
- Histórico de comandos melhorado

## 🎯 Testes com Playwright e Allure Report

Este projeto está configurado com **Playwright** para testes end-to-end e **Allure Report** para geração de relatórios visuais detalhados.

### Configuração do Allure

O Allure Report foi integrado com os seguintes componentes:

- **allure-playwright**: Plugin para integração com Playwright
- **allure-commandline**: CLI global para gerar e servir relatórios
- **Configuração dual**: HTML nativo + Allure no `playwright.config.ts`

### Scripts Disponíveis

```bash
# Executar testes normalmente (gera relatórios HTML e Allure)
yarn test:e2e

# Executar testes com relatório Allure apenas
yarn test:allure

# Limpar + executar testes + abrir relatório
yarn test:allure-clean

# Gerar relatório Allure a partir dos resultados
yarn allure:generate

# Servir relatório Allure no navegador
yarn allure:serve

# Abrir Playwright Codegen
yarn codegen
```

### Playwright Codegen

O projeto inclui um script automatizado para abrir o **Playwright Codegen**:

```bash
# Script direto (DevContainer)
./codegen.sh

# Via Yarn (Local ou DevContainer)
yarn codegen
```

O codegen permite:

- Gravação automática de interações
- Geração de código de teste
- Inspeção de elementos
- Depuração visual

### Usando Allure nos Testes

Exemplo de uso das anotações Allure:

```typescript
import { test, expect } from "@playwright/test";
import {
    epic,
    feature,
    story,
    severity,
    description,
    step,
    attachment,
    parameter,
} from "allure-js-commons";

test("Exemplo com Allure", async ({ page }) => {
    await epic("Módulo Principal");
    await feature("Funcionalidade de Login");
    await story("Login com credenciais válidas");
    await severity("critical");
    await description("Teste de login básico");

    await step("Navegar para login", async () => {
        await page.goto("/login");
    });

    await step("Preencher formulário", async () => {
        await page.fill("#username", "usuario");
        await page.fill("#password", "senha");
    });

    await step("Verificar sucesso", async () => {
        await expect(page.locator(".success")).toBeVisible();
    });

    // Adicionar anexos
    await attachment("Screenshot", await page.screenshot(), "image/png");
    await parameter("Browser", "Chromium");
});
```

### Estrutura de Relatórios

Os relatórios são organizados da seguinte forma:

```
📁 allure-results/    # Dados brutos dos testes
📁 allure-report/     # Relatório HTML gerado
📁 test-results/      # Screenshots e vídeos
📁 playwright-report/ # Relatório HTML nativo
```

### Allure em Ambiente DevContainer

O projeto está configurado para funcionar em ambiente headless (sem interface gráfica). Para usar o Allure:

1. **Configurar ambiente** (primeira vez):

   ```bash
   ./setup-allure.sh
   ```

2. **Executar testes e gerar dados**:

   ```bash
   yarn test:e2e
   ```

3. **Gerenciar servidor Allure**:

   ```bash
   yarn allure:serve      # Iniciar servidor
   yarn allure:status     # Verificar status
   yarn allure:restart    # Reiniciar servidor
   yarn allure:stop       # Parar servidor
   ```

4. **Acessar no navegador**:

   - O relatório estará disponível em `http://localhost:4040`
   - Use o Simple Browser do VS Code ou acesse externamente

5. **Workflow completo**:

   ```bash
   yarn test:allure       # Testa + inicia servidor
   yarn test:allure-clean # Limpa + testa + inicia servidor
   ```

6. **Gerenciamento avançado**:

   ```bash
   ./manage-allure.sh 4041 serve    # Porta personalizada
   ./manage-allure.sh 4040 status   # Verificar status
   ./manage-allure.sh --help        # Ver todas as opções
   ```

### Anotações Allure Disponíveis

- **`epic()`**: Agrupa funcionalidades de alto nível
- **`feature()`**: Funcionalidade específica
- **`story()`**: Cenário de usuário
- **`severity()`**: Criticidade (blocker, critical, normal, minor, trivial)
- **`description()`**: Descrição detalhada
- **`step()`**: Passos individuais
- **`attachment()`**: Anexos (screenshots, logs, etc.)
- **`parameter()`**: Parâmetros de teste

> **Nota**: As funções Allure agora são importadas diretamente do `allure-js-commons` em vez da API depreciada `allure-playwright`.

### Workflow Completo

1. **Desenvolver testes** com anotações Allure
2. **Executar testes**: `yarn test:allure`
3. **Gerar relatório**: `yarn allure:generate`
4. **Visualizar resultados**: `yarn allure:serve`
5. **Workflow limpo**: `yarn test:allure-clean` (limpa + testa + visualiza)

O relatório Allure oferece:

- Timeline de execução
- Gráficos de tendências
- Categorização de falhas
- Histórico de execuções
- Screenshots automáticos
- Logs detalhados

### Troubleshooting Allure

**Problema: "Address already in use"**

```bash
# Solução: parar o servidor existente
yarn allure:stop
yarn allure:serve
```

**Problema: "Could not serve the report"**

```bash
# Verificar se há dados de teste
ls -la allure-results/

# Executar testes primeiro
yarn test:e2e
yarn allure:serve
```

**Problema: Java headless não funciona**

```bash
# Reconfigurar ambiente
./setup-allure.sh
yarn allure:restart
```

**Problema: Permissões ao limpar resultados**

```bash
# Usar comando de limpeza com sudo
yarn allure:clean

# Ou corrigir permissões manualmente
sudo chown -R $(id -u):$(id -g) allure-results allure-report
```

**Verificar logs do servidor**

```bash
tail -f allure-server.log
```

## 🌐 Ambientes de Desenvolvimento

### Comparação: DevContainer vs Local

| Característica | DevContainer | Local (VS Code/Eclipse) |
|---------------|--------------|-------------------------|
| Configuração inicial | Automática | Manual |
| Dependências do SO | Pré-instaladas | Requer instalação manual |
| Oh My Zsh | ✅ Incluído | ❌ Não disponível |
| Aliases personalizados | ✅ Incluído | ❌ Não disponível |
| Isolamento | ✅ Completo | ❌ Usa ambiente do host |
| Performance | Boa | Excelente |
| Portabilidade | ✅ Alta | ⚠️ Depende do SO |

### Quando usar cada opção?

**Use DevContainer se**:
- Quer ambiente configurado automaticamente
- Trabalha em equipe (padronização)
- Precisa de isolamento de dependências
- Usa Linux/macOS ou WSL2

**Use desenvolvimento local se**:
- Prefere não usar Docker
- Tem ambiente Node.js já configurado
- Precisa de máxima performance
- Trabalha sozinho no projeto

## 📚 Recursos Adicionais

- [Documentação do Playwright](https://playwright.dev/)
- [Documentação do Allure Report](https://docs.qameta.io/allure/)
- [Guia de TypeScript](https://www.typescriptlang.org/docs/)
- [Yarn Documentation](https://yarnpkg.com/)
- [VS Code DevContainers](https://code.visualstudio.com/docs/devcontainers/containers)

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.