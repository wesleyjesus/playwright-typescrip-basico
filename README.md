# Playwright Tests - Devcontainer

Este repositório contém a configuração inicial para executar testes E2E com Playwright usando um DevContainer/Docker.

## Requisitos

- Docker
- VS Code com Remote - Containers (opcional)

## Como construir a imagem localmente

```bash
# Na raiz do projeto
docker-compose -f .devcontainer/docker-compose.yml build
```

## Rodar o servidor Playwright (dentro do container)

```bash
# Usando docker-compose (recomendado)
docker-compose -f .devcontainer/docker-compose.yml up --remove-orphans

# Alternativa: rodar a imagem diretamente
docker build -t unico-playwright-custom -f .devcontainer/Dockerfile .

docker run --rm --init --ipc=host -p 3000:3000 --user pwuser --add-host hostmachine:host-gateway unico-playwright-custom \
  sh -c "npx -y playwright@1.55.0 run-server --port 3000 --host 0.0.0.0"
```

Se você estiver acessando serviços no host a partir do container, configure o host com `--add-host hostmachine:host-gateway` e use `hostmachine` nas URLs dos testes.

## Execução dos testes (locais)

Dentro do container (ou em um ambiente com Playwright instalado):

```bash
# Instalar dependências (uma vez)
yarn install

# Instalar navegadores do Playwright (se necessário)
npx playwright install --with-deps

# Executar testes headless
yarn test:e2e

# Executar tests com GUI
yarn test:headed
```

## 🎭 Playwright Codegen

Este projeto inclui scripts para facilitar o uso do Playwright Codegen para gravação de testes.

### Usando npm script

```bash
# Abrir codegen com configurações padrão
npm run codegen

# Abrir codegen em uma URL específica
npx playwright codegen https://exemplo.com.br
```

### Usando o script personalizado

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

## Observações

- A imagem base do Playwright fornece navegadores e dependências do sistema, mas é importante que a versão do `@playwright/test` no `package.json` esteja alinhada com a imagem Docker (aqui usamos `1.55.0`).
- Para maior segurança ao rodar Chromium com sandbox habilitado, considere usar o `seccomp_profile.json` recomendado pela documentação do Playwright e rodar o container com `--security-opt seccomp=./seccomp_profile.json`.

## Próximos passos

- Adicionar exemplos de testes em `tests/` e configuração `playwright.config.ts`.
- Integrar comandos de CI (GitHub Actions) para rodar os testes automaticamente.

## Corrigindo permissões no host

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

#### Comandos úteis usados para diagnóstico e correção

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

## Configuração do npm para instalações globais

O Dev Container está configurado para permitir instalações globais do npm sem sudo. As configurações incluem:

- `NPM_CONFIG_PREFIX=/home/pwuser/.npm-global` - diretório para pacotes globais
- PATH atualizado para incluir `/home/pwuser/.npm-global/bin`
- Configuração persistida no `.zshrc` do usuário

Isso permite executar comandos como:

```bash
npm install -g <pacote>
npm install -g npm@latest
```

Sem receber erros EACCES (permission denied).

## Shell padrão

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
npm run test:e2e

# Executar testes com relatório Allure apenas
npm run test:allure

# Gerar relatório Allure a partir dos resultados
npm run allure:generate

# Servir relatório Allure no navegador
npm run allure:serve

# Abrir Playwright Codegen
npm run codegen
```

### Playwright Codegen

O projeto inclui um script automatizado para abrir o **Playwright Codegen**:

```bash
# Script direto
./codegen.sh

# Via npm
npm run codegen
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
   npm run test:e2e
   ```

3. **Gerenciar servidor Allure**:
   ```bash
   npm run allure:serve    # Iniciar servidor
   npm run allure:status   # Verificar status
   npm run allure:restart  # Reiniciar servidor
   npm run allure:stop     # Parar servidor
   ```

4. **Acessar no navegador**:
   - O relatório estará disponível em `http://localhost:4040`
   - Use o Simple Browser do VS Code ou acesse externamente

5. **Workflow completo**:
   ```bash
   npm run test:allure     # Testa + inicia servidor
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
2. **Executar testes**: `npm run test:allure`
3. **Gerar relatório**: `npm run allure:generate`
4. **Visualizar resultados**: `npm run allure:serve`

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
npm run allure:stop
npm run allure:serve
```

**Problema: "Could not serve the report"**
```bash
# Verificar se há dados de teste
ls -la allure-results/

# Executar testes primeiro
npm run test:e2e
npm run allure:serve
```

**Problema: Java headless não funciona**
```bash
# Reconfigurar ambiente
./setup-allure.sh
npm run allure:restart
```

**Verificar logs do servidor**
```bash
tail -f allure-server.log
```

```

```
