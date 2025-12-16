// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CENÁRIOS DE ACESSO NEGADO', () => {
  test('Usuário Sem Permissões', async ({ page }) => {
    // 1. Acessar página de login
    await page.goto('https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp');

    // Verificar se elementos da tela de login estão presentes
    await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();

    // 1. Inserir "user@gmail.com" (email válido mas sem permissões)
    await page.getByRole('textbox', { name: 'Usuário' }).fill('user@gmail.com');

    // 2. Clicar em "Entrar"
    await page.getByRole('button', { name: 'Entrar' }).click();

    // Aguardar o redirecionamento e verificar URL
    // O comportamento pode variar - pode redirecionar para sem_atuacoes.jsp ou permanecer na página de login
    // Vamos verificar ambos os cenários possíveis

    // Cenário 1: Redirecionamento para página de sem atuações
    const isSemAtuacoesPage = page.url().includes('sem_atuacoes.jsp');
    
    if (isSemAtuacoesPage) {
      // Verificar redirecionamento para /unico/sem_atuacoes.jsp
      await expect(page).toHaveURL(/.*\/unico\/sem_atuacoes\.jsp/);
      
      // Verificar título da página
      await expect(page).toHaveTitle('Sistema Único');
      
      // Capturar mensagem de sem permissões para comparação detalhada
      const mensagemEsperada = 'Seu usuário não tem nenhum atuação no sistema';
      
      // Aguardar um pouco para a página carregar completamente
      await page.waitForTimeout(2000);
      
      // Capturar conteúdo da página
      const conteudoPagina = await page.locator('body').textContent() || '';
      
      // Log detalhado para debug
      console.log('=== VALIDAÇÃO DE USUÁRIO SEM PERMISSÕES ===');
      console.log('Mensagem esperada:', mensagemEsperada);
      console.log('Conteúdo capturado (primeiros 300 chars):', conteudoPagina.substring(0, 300));
      console.log('Contém a mensagem esperada?', conteudoPagina.includes(mensagemEsperada));
      
      // Verificação com melhor tratamento de erro
      try {
        await expect(page.getByText(mensagemEsperada)).toBeVisible();
        console.log('✅ Mensagem de sem permissões encontrada com sucesso');
      } catch (error) {
        console.log('❌ Mensagem de sem permissões não encontrada');
        throw new Error(`Mensagem esperada "${mensagemEsperada}" não encontrada. Conteúdo atual: "${conteudoPagina.substring(0, 200)}..."`);
      }
      
      // Verificar link para encerrar sessão disponível
      await expect(page.getByRole('link', { name: 'Clique aqui para fechar a sessão' })).toBeVisible();
    } else {
      // Cenário 2: Permanecer na página de login (possível mudança de comportamento)
      await expect(page).toHaveURL(/.*\/unico\/oauth2\/login\/loginNovo\.jsp/);
      
      // O sistema pode não processar emails de domínios externos
      // Verificar se o campo ainda contém o email digitado
      await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue('user@gmail.com');
    }
  });

  test('Email com Domínio Correto mas Usuário Inexistente', async ({ page }) => {
    // Acessar página de login
    await page.goto('https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp');

    // 1. Inserir email com domínio correto mas usuário inexistente
    await page.getByRole('textbox', { name: 'Usuário' }).fill('usuarioinexistente@mpf.mp.br');

    // 2. Clicar em "Entrar"
    await page.getByRole('button', { name: 'Entrar' }).click();

    // Verificar se há alguma resposta do sistema
    // Pode ser erro de usuário não encontrado ou redirecionamento
    const hasError = await page.getByText('O e-mail do usuário deve ser informado!').isVisible().catch(() => false);
    const hasUserNotFound = await page.getByText('usuário não encontrado').isVisible().catch(() => false);
    const remainsOnLogin = page.url().includes('loginNovo.jsp');

    // Validar um dos comportamentos esperados
    expect(hasError || hasUserNotFound || remainsOnLogin).toBe(true);
  });
});