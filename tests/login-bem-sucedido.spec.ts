// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('CENÁRIOS DE LOGIN VÁLIDO', () => {
	test('Login Bem-sucedido', async ({ page }) => {
		// 1. Acessar URL de login
		await page.goto('/oauth2/login/loginNovo.jsp')

		// Verificar se o logo 'Único Digital' está presente na tela de login
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()

		// Verificar se o campo 'Usuário' com placeholder 'Email' está visível
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()

		// Verificar se o botão 'Entrar' está visível
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

		// 2. Inserir "wesleyjesus@mpf.mp.br" no campo Usuário
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('wesleyjesus@mpf.mp.br')

		// 3. Clicar em "Entrar"
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar redirecionamento para dashboard
		await expect(page).toHaveURL(/.*\/unico\/#\/inicial/)

		// Verificar título da página
		await expect(page).toHaveTitle('Página Inicial - Sistema Único')

		// Verificar exibição do nome "WESLEY JESUS" e unidade "CIVINT/STIC"
		await expect(page.getByText('WESLEY JESUS')).toBeVisible()
		await expect(page.getByText('CIVINT/STIC').first()).toBeVisible()

		// Verificar presença do logo Sistema Único na dashboard
		await expect(page.getByRole('img', { name: 'Sistema Único' })).toBeVisible()

		// Verificar menu principal com 7 opções visíveis
		await expect(
			page.getByRole('button', { name: 'Menu Documento' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Procedimento' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Judicial' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Integração' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Consultas' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Ajustes' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Tabelas' })
		).toBeVisible()

		// Verificar campo de pesquisa de expediente
		await expect(
			page.getByRole('textbox', { name: 'Pesquisar expediente' })
		).toBeVisible()
	})
})
