# Playwright TypeScript 🎭

[![Playwright Tests](https://github.com/wesleyjesus/playwright-typescrip-basico/actions/workflows/playwright-allure.yml/badge.svg)](https://github.com/wesleyjesus/playwright-typescrip-basico/actions/workflows/playwright-allure.yml)
[![Allure Report](https://img.shields.io/badge/Allure-Report-yellow.svg)](https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue.svg)](https://wesleyjesus.github.io/playwright-typescrip-basico/)

Projeto de automação E2E com Playwright, TypeScript e Allure, reorganizado para manter a base mais limpa, com testes no padrão `Page Object`, `AAA` e scripts operacionais centralizados fora da raiz.

## Visão geral

A estrutura atual prioriza:

- organização por feature em `tests/`
- `Page Objects` em `tests/pages/`
- dados de teste em `tests/data/`
- helpers reutilizáveis em `tests/helpers/`
- scripts operacionais em `scripts/`
- relatórios locais e publicados com Allure
- execução local, em DevContainer e em CI

## Estrutura do projeto

```text
.
├── .devcontainer/              # ambiente containerizado
├── .github/                    # workflows e documentação de CI/CD
├── scripts/
│   ├── allure/                 # deploy e gerenciamento do Allure
│   ├── devcontainer/           # apoio ao ambiente containerizado
│   └── playwright/             # utilitários do Playwright
├── specs/                      # planos de teste
├── tests/
│   ├── data/                   # massa de dados
│   ├── documento/              # specs da feature documento
│   ├── helpers/                # helpers e assertions reutilizáveis
│   ├── legacy/                 # referência histórica da migração
│   ├── login/                  # specs da feature login
│   └── pages/                  # Page Objects
├── playwright.config.ts        # configuração do Playwright
├── package.json                # scripts e dependências
└── README.md                   # documentação única do projeto
```

## Padrões adotados nos testes

### Page Objects

Toda interação com a UI deve ficar concentrada em `Page Objects` dentro de `tests/pages/`.

Exemplos atuais:

- `LoginPage`
- `DashboardPage`
- `DocumentInclusionPage`

### AAA

Os testes seguem a separação:

- `Arrange`
- `Act`
- `Assert`

Essa separação é refletida com `test.step()` para melhorar leitura e rastreabilidade no relatório.

### Helpers e dados

- assertions reaproveitáveis ficam em `tests/helpers/`
- massa de dados fica em `tests/data/`
- evitar duplicação de seletores e valores fixos nos specs

### Convenções

- preferir locators acessíveis do Playwright
- evitar `waitForTimeout`
- usar assertions web-first
- usar `baseURL` configurada em [playwright.config.ts](playwright.config.ts)

## Gerenciador de pacotes

O projeto usa `Yarn` como gerenciador principal.

```bash
yarn install
npx playwright install
```

> Não use `npm install` no projeto para evitar lockfiles conflitantes.

## Como executar

### Ambiente local

Pré-requisitos:

- Node.js 18+
- Yarn
- Java 17+ para Allure
- Git

Instalação básica:

```bash
yarn install
npx playwright install
```

Execução da suíte:

```bash
yarn test:e2e
```

### DevContainer

Abra o projeto no container e depois execute:

```bash
yarn install
npx playwright install
zsh -ic 'alias pwtest && alias pclean && alias pallure'
```

Se precisar iniciar o ambiente manualmente:

```bash
bash scripts/devcontainer/start.sh
```

Se precisar gerar `.devcontainer/.env` com UID/GID:

```bash
bash scripts/devcontainer/setup-env.sh
```

### IntelliJ

O fluxo do IntelliJ também passa a ser documentado aqui:

- o container pode usar bind mount ou arquivos copiados no build
- se precisar desabilitar o mount automático, ajuste `.devcontainer/.env`
- para rebuild manual, use `docker compose -f .devcontainer/docker-compose.yml up -d --build`

## Scripts principais

### Testes

```bash
yarn test:e2e
yarn test:headed
yarn test:debug
yarn test:ci
```

### Codegen

```bash
yarn codegen
yarn codegen:guided
bash scripts/playwright/codegen.sh https://example.com chromium
```

### Allure local

```bash
yarn allure:generate
yarn allure:open
yarn allure:serve
yarn allure:stop
yarn allure:restart
yarn allure:status
yarn test:allure
yarn test:allure-clean
```

### Allure GitHub Pages

```bash
bash scripts/allure/deploy.sh "mensagem do commit"
bash scripts/allure/first-deploy.sh
cat .github/ALLURE_GITHUB_PAGES.md
```

## Relatórios Allure

Relatórios publicados:

- projeto: [https://wesleyjesus.github.io/playwright-typescrip-basico/](https://wesleyjesus.github.io/playwright-typescrip-basico/)
- relatório: [https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/](https://wesleyjesus.github.io/playwright-typescrip-basico/allure-report/)

Estrutura local de artefatos:

```text
allure-results/     # dados brutos
allure-report/      # relatório HTML do Allure
playwright-report/  # relatório HTML nativo
test-results/       # screenshots, vídeos e traces
```

## Aliases úteis no DevContainer

```bash
pw
pwtest
pwcodegen
pwshow
ptest
pcodegen
pallure
pclean
allure-serve
allure-clean
allure-generate
allure-open
```

## Troubleshooting

### Porta do Allure em uso

```bash
yarn allure:stop
bash scripts/allure/manage.sh 4041 serve
```

### Verificar estado do servidor Allure

```bash
yarn allure:status
bash scripts/allure/manage.sh 4040 status
tail -f allure-server.log
```

### Permissões no projeto ou no container

```bash
sudo chown -R $(id -u):$(id -g) allure-results allure-report
sudo chmod -R u+rwX /home/pwuser/app
```

### Zsh e aliases

```bash
echo $SHELL
zsh
source ~/.zshrc
zsh -ic 'alias pw && alias pwtest && alias pclean'
```

### Navegadores ausentes

```bash
npx playwright install
npx playwright install-deps
```

## Situação atual da suíte

A base foi migrada para a nova organização e a suíte principal está estruturada em:

- `tests/login/`
- `tests/documento/`
- `tests/pages/`
- `tests/helpers/`
- `tests/data/`

A pasta `tests/legacy/` permanece apenas como referência histórica da migração.

## Recursos adicionais

- [Playwright](https://playwright.dev/)
- [Allure Report](https://docs.qameta.io/allure/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Yarn](https://yarnpkg.com/)
- [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)

## Licença

MIT.
