// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CENÁRIOS DE INTERFACE', () => {
  test('Elementos Visuais', async ({ page }) => {
    // Acessar página de login
    await page.goto('https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp');

    // Verificar se o logo 'Único Digital' está presente
    await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible();

    // Verificar se o campo 'Usuário' com placeholder 'Email' está visível
    await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible();

    // Verificar se o botão 'Entrar' está acessível
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();

    // Verificar se o placeholder "Email" está presente
    const usuarioField = page.getByRole('textbox', { name: 'Usuário' });
    await expect(usuarioField).toHaveAttribute('placeholder', 'Email');

    // Verificar título da página
    await expect(page).toHaveTitle('Login');
    
    // Verificar layout básico - elementos estão organizados
    const logo = page.getByRole('img', { name: 'Único Digital' });
    const textbox = page.getByRole('textbox', { name: 'Usuário' });
    const button = page.getByRole('button', { name: 'Entrar' });

    // Verificar que todos os elementos essenciais estão presentes
    await expect(logo).toBeVisible();
    await expect(textbox).toBeVisible();
    await expect(button).toBeVisible();
  });

  test('Interações de Teclado', async ({ page }) => {
    // Acessar página de login
    await page.goto('https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp');

    // Testar navegação por Tab para verificar acessibilidade
    await page.keyboard.press('Tab');
    
    // Verificar se o campo de usuário recebeu o foco
    await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeFocused();

    // Pressionar Tab novamente para navegar para o botão
    await page.keyboard.press('Tab');
    
    // Verificar se o botão recebeu o foco
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeFocused();

    // Voltar para o campo com Shift+Tab
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeFocused();

    // Digitar algo no campo
    await page.getByRole('textbox', { name: 'Usuário' }).fill('teste.usuario@mpf.mp.br');
    
    // Verificar se o valor foi inserido corretamente
    await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue('teste.usuario@mpf.mp.br');
  });

  test('Comportamento do Placeholder', async ({ page }) => {
    // Acessar página de login
    await page.goto('https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp');

    const usuarioField = page.getByRole('textbox', { name: 'Usuário' });

    // Verificar se o placeholder "Email" está visível quando campo está vazio
    await expect(usuarioField).toHaveAttribute('placeholder', 'Email');
    await expect(usuarioField).toHaveValue('');

    // Começar a digitar e verificar que o placeholder não interfere
    await usuarioField.fill('teste');
    await expect(usuarioField).toHaveValue('teste');

    // Limpar o campo e verificar se o placeholder retorna
    await usuarioField.fill('');
    await expect(usuarioField).toHaveValue('');
    await expect(usuarioField).toHaveAttribute('placeholder', 'Email');

    // Preencher com email completo
    await usuarioField.fill('usuario.teste@mpf.mp.br');
    await expect(usuarioField).toHaveValue('usuario.teste@mpf.mp.br');
  });
});