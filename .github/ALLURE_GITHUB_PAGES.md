# 📊 Publicar Relatórios Allure no GitHub Pages

## 🚀 Configuração Passo a Passo

### 1️⃣ Habilitar GitHub Pages no Repositório

1. Acesse seu repositório no GitHub: `https://github.com/wesleyjesus/playwright-typescrip-basico`
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Clique em **Save**

### 2️⃣ Dar Permissões ao GitHub Actions

1. Ainda em **Settings**, vá em **Actions** > **General**
2. Role até **Workflow permissions**
3. Selecione: **Read and write permissions**
4. Marque: ✅ **Allow GitHub Actions to create and approve pull requests**
5. Clique em **Save**

### 3️⃣ Executar o Workflow

Agora você tem 3 formas de executar os testes e gerar o relatório:

#### Opção A: Push para o repositório
```bash
git add .
git commit -m "feat: adicionar workflow para Allure Reports"
git push origin main
```

#### Opção B: Executar manualmente
1. Vá em **Actions** no GitHub
2. Selecione **Playwright Tests with Allure Report**
3. Clique em **Run workflow**
4. Clique em **Run workflow** (botão verde)

#### Opção C: Via Pull Request
- Qualquer PR para `main` ou `master` vai executar automaticamente

### 4️⃣ Acessar o Relatório

Após o workflow executar com sucesso:

🔗 **URL do Relatório Allure:**
```
https://wesleyjesus.github.io/playwright-typescrip-basico/
```

Ou encontre em:
1. **Actions** > Última execução > **deploy** job
2. Procure por: `🚀 Deployed to: https://wesleyjesus.github.io/...`

---

## 📁 Estrutura Criada

```
.github/
└── workflows/
    └── playwright-allure.yml    # Workflow principal
```

---

## 🔧 Como Funciona

1. **Trigger**: Push, PR ou execução manual
2. **Install**: Instala dependências e navegadores
3. **Test**: Executa os testes do Playwright com Allure
4. **Report**: Gera relatório Allure com histórico
5. **Deploy**: Publica no GitHub Pages (branch `gh-pages`)

---

## 📊 Features do Relatório

✅ Histórico das últimas 20 execuções  
✅ Gráficos de tendências  
✅ Screenshots automáticos  
✅ Videos das falhas  
✅ Logs detalhados  
✅ Duração dos testes  
✅ Estatísticas completas  

---

## 🛠️ Scripts Disponíveis

```bash
# Executar testes localmente e gerar relatório
npm run test:allure

# Executar testes no modo CI
npm run test:ci

# Limpar resultados anteriores
npm run allure:clean

# Apenas gerar relatório dos resultados existentes
npm run allure:generate

# Abrir relatório localmente
npm run allure:open

# Servir relatório em servidor local
npm run allure:serve
```

---

## 🔍 Troubleshooting

### Erro: "Permission denied"
**Solução**: Verifique as permissões do GitHub Actions (passo 2️⃣)

### Erro: "gh-pages branch not found"
**Solução**: O workflow vai criar automaticamente na primeira execução

### Relatório não atualiza
**Solução**: 
1. Limpe o cache do navegador (Ctrl+Shift+R)
2. Aguarde 2-3 minutos para propagação do GitHub Pages
3. Acesse: Settings > Pages > Visite novamente a URL

### Workflow falha no step "Run Playwright tests"
**Solução**: 
- Verifique os logs em Actions
- Execute localmente: `npm run test:ci`
- Verifique se todos os testes passam

---

## 📝 Customizações

### Mudar a quantidade de relatórios mantidos

Edite `.github/workflows/playwright-allure.yml`:

```yaml
with:
  allure_results: allure-results
  allure_history: allure-history
  keep_reports: 50  # Mude aqui (padrão: 20)
```

### Executar apenas em branches específicas

```yaml
on:
  push:
    branches: [ main, develop, staging ]  # Adicione suas branches
```

### Adicionar notificações

Adicione no final do workflow:

```yaml
    - name: Send notification
      if: failure()
      run: |
        echo "Tests failed! Check the Allure report"
```

---

## 🎯 Próximos Passos

1. ✅ Configurar GitHub Pages
2. ✅ Habilitar permissões
3. ✅ Executar primeiro workflow
4. 🎉 Compartilhar URL do relatório com a equipe!

---

## 📚 Links Úteis

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Playwright Documentation](https://playwright.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Mantido por**: Wesley Jesus (@wesleyjesus)  
**Última atualização**: December 16, 2025
