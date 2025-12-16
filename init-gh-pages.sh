#!/bin/bash

# Script para forçar criação da branch gh-pages com estrutura inicial

set -e

echo "🚀 Criando estrutura inicial do GitHub Pages..."

# Criar diretório temporário
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Criar estrutura
mkdir -p allure-report

# Criar index.html da página inicial
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playwright TypeScript - Testes Automatizados</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 800px;
      width: 100%;
      padding: 60px 40px;
      text-align: center;
    }
    h1 {
      color: #667eea;
      font-size: 2.5rem;
      margin-bottom: 20px;
      font-weight: 700;
    }
    .subtitle {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 40px;
    }
    .badges {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }
    .badges img {
      height: 20px;
    }
    .description {
      color: #555;
      font-size: 1.1rem;
      margin-bottom: 40px;
      text-align: left;
      line-height: 1.8;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 18px 50px;
      border-radius: 50px;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
      margin-bottom: 30px;
    }
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
    }
    .cta-button.disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 40px;
      text-align: left;
    }
    .feature {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      border-left: 4px solid #667eea;
    }
    .feature h3 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 1rem;
    }
    .feature p {
      color: #666;
      font-size: 0.9rem;
    }
    .links {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #eee;
    }
    .links a {
      color: #667eea;
      text-decoration: none;
      margin: 0 15px;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    .links a:hover {
      color: #764ba2;
    }
    .icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🎭</div>
    <h1>Playwright TypeScript</h1>
    <p class="subtitle">Testes Automatizados End-to-End</p>
    
    <div class="badges">
      <img src="https://github.com/wesleyjesus/playwright-typescrip-basico/actions/workflows/playwright-allure.yml/badge.svg" alt="Playwright Tests">
      <img src="https://img.shields.io/badge/Allure-Report-yellow.svg" alt="Allure Report">
      <img src="https://img.shields.io/badge/GitHub-Pages-blue.svg" alt="GitHub Pages">
    </div>

    <div class="description">
      <p>Este projeto fornece um ambiente completo de desenvolvimento e teste com Playwright, incluindo relatórios visuais detalhados gerados automaticamente pelo Allure Report.</p>
    </div>

    <div class="warning">
      <strong>⚠️ Primeiro Deploy</strong><br>
      O relatório Allure será gerado após a primeira execução dos testes.<br>
      Execute um push para a branch main para iniciar o processo.
    </div>

    <a href="allure-report/index.html" class="cta-button disabled">
      📊 Relatório em Processamento...
    </a>

    <div class="features">
      <div class="feature">
        <h3>✅ Testes Automatizados</h3>
        <p>Testes E2E com Playwright executados a cada push</p>
      </div>
      <div class="feature">
        <h3>📊 Relatórios Visuais</h3>
        <p>Allure Report com histórico e tendências</p>
      </div>
      <div class="feature">
        <h3>🚀 CI/CD Integrado</h3>
        <p>GitHub Actions com deploy automático</p>
      </div>
      <div class="feature">
        <h3>📸 Screenshots</h3>
        <p>Captura automática de falhas</p>
      </div>
    </div>

    <div class="links">
      <a href="https://github.com/wesleyjesus/playwright-typescrip-basico" target="_blank">📁 Repositório</a>
      <a href="https://github.com/wesleyjesus/playwright-typescrip-basico/actions" target="_blank">⚙️ Actions</a>
    </div>
  </div>
</body>
</html>
EOF

# Criar placeholder do relatório
cat > allure-report/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Relatório em Processamento</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .message {
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="message">
    <div class="spinner"></div>
    <h1>⚠️ Relatório em Processamento</h1>
    <p>O relatório Allure será gerado na próxima execução dos testes.</p>
    <p>Aguarde alguns minutos e atualize a página.</p>
    <p><a href="../">← Voltar para página inicial</a></p>
  </div>
</body>
</html>
EOF

# Inicializar git no diretório temporário
git init
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

# Adicionar arquivos
git add .
git commit -m "chore: initialize GitHub Pages structure"

# Obter a URL do repositório remoto
cd - > /dev/null
REPO_URL=$(git config --get remote.origin.url)

# Push forçado para gh-pages
cd "$TEMP_DIR"
git push -f "$REPO_URL" HEAD:gh-pages

# Limpar
cd - > /dev/null
rm -rf "$TEMP_DIR"

echo "✅ Branch gh-pages criada com estrutura inicial!"
echo ""
echo "🌐 Acesse: https://wesleyjesus.github.io/playwright-typescrip-basico/"
echo ""
echo "💡 Próximo passo: Faça um push para main para executar os testes e gerar o relatório"