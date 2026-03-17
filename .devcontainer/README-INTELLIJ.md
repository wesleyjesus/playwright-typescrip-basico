# IntelliJ Dev Container Setup

## Problema

Quando você conecta ao container no IntelliJ, a pasta `/home/pwuser/app` pode estar vazia porque o IntelliJ não monta automaticamente o volume do projeto como o VSCode faz.

## Solução

O setup foi ajustado para funcionar com ambos VSCode e IntelliJ:

### Para VSCode (Padrão)

Use o arquivo `.env` como está:
```env
PROJECT_MOUNT=..
```

O VSCode montará automaticamente o diretório do projeto no container.

### Para IntelliJ

1. **Opção 1: Usar arquivos copiados durante build (Recomendado)**
   
   Copie o arquivo `.env.intellij` para `.env`:
   ```bash
   cp .devcontainer/.env.intellij .devcontainer/.env
   ```
   
   Ou edite `.env` e deixe `PROJECT_MOUNT` vazio:
   ```env
   PROJECT_MOUNT=
   ```
   
   Então rebuild a imagem:
   ```bash
   docker compose -f .devcontainer/docker-compose.yml build --no-cache
   docker compose -f .devcontainer/docker-compose.yml up -d
   ```

2. **Opção 2: Mount manual (para desenvolvimento)**
   
   Se você quiser editar arquivos no host e ver refletido no container, configure o IntelliJ para montar o volume:
   
   - Abra as configurações do Docker no IntelliJ
   - Configure um bind mount: `$(pwd):/home/pwuser/app:cached`

## Como conectar no IntelliJ

### Passo a passo:

1. **Instale o plugin Docker** no IntelliJ (se ainda não tiver)

2. **Abra o Terminal do IntelliJ** (View > Tool Windows > Terminal)

3. **Build e inicie o container**:
   ```bash
   cd .devcontainer
   docker compose build --no-cache
   docker compose up -d
   ```

4. **Conecte ao container**:
   - Abra a janela "Services" (View > Tool Windows > Services)
   - Expanda "Docker" > "Containers"
   - Encontre o container `playwright-devcontainer-intellij`
   - Clique com botão direito > "Attach Shell" ou "Exec"

5. **Verifique os arquivos**:
   ```bash
   ls -la /home/pwuser/app
   ```

6. **Configure o IntelliJ para usar o SDK do container** (opcional):
   - File > Project Structure > SDKs
   - Adicione um novo SDK apontando para o Node.js do container

## Verificação

Para verificar se os arquivos foram copiados corretamente:

```bash
docker exec -it playwright-devcontainer-intellij ls -la /home/pwuser/app
```

Você deve ver todos os arquivos do projeto listados.

## Troubleshooting

### Container está vazio

Se a pasta ainda estiver vazia:

1. Verifique o arquivo `.env`:
   ```bash
   cat .devcontainer/.env
   ```
   `PROJECT_MOUNT` deve estar vazio ou comentado para IntelliJ.

2. Rebuild completamente:
   ```bash
   docker compose -f .devcontainer/docker-compose.yml down -v
   docker compose -f .devcontainer/docker-compose.yml build --no-cache
   docker compose -f .devcontainer/docker-compose.yml up -d
   ```

### Permissões incorretas

Se você encontrar erros de permissão:

```bash
docker exec -it playwright-devcontainer-intellij sudo chown -R pwuser:pwuser /home/pwuser/app
docker exec -it playwright-devcontainer-intellij sudo chmod -R 755 /home/pwuser/app
```

### Node modules não instalados

Se os node_modules não estiverem instalados:

```bash
docker exec -it playwright-devcontainer-intellij bash -c "cd /home/pwuser/app && yarn install"
```

## Diferenças VSCode vs IntelliJ

| Aspecto | VSCode | IntelliJ |
|---------|--------|----------|
| Mount automático | ✅ Sim | ❌ Não |
| Arquivos no container | Via bind mount | Via COPY no Dockerfile |
| Sincronização | Automática | Requer rebuild |
| Performance | Pode ser mais lenta | Mais rápida (arquivos locais ao container) |

## Recomendação

Para desenvolvimento no IntelliJ, use a **Opção 1** (arquivos copiados durante build) para melhor performance. Faça rebuild quando precisar atualizar arquivos no container.

