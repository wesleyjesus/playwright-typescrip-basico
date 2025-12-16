// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('CENÁRIOS DE NAVEGAÇÃO', () => {
	test('URLs Protegidas', async ({ page }) => {
		// Tentar acessar dashboard diretamente sem login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/?continue#/inicial'
		)

		// Verificar se o sistema redireciona para login
		// O sistema deve proteger URLs e redirecionar usuários não autenticados
		await expect(page).toHaveURL(/.*\/oauth2\/login/)

		// Verificar que a tela de login é exibida
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

		// Verificar título da página de login
		await expect(page).toHaveTitle('Login')
	})

	test('Botão Voltar do Navegador', async ({ page }) => {
		// Acessar página de login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp'
		)

		// Realizar login com sucesso
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('wesleyjesus@mpf.mp.br')
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar redirecionamento para dashboard
		await expect(page).toHaveURL(/.*\/unico\/#\/inicial/)
		await expect(page).toHaveTitle('Página Inicial - Sistema Único')

		// Usar botão "Voltar" do navegador
		await page.goBack()

		// Verificar estado da sessão
		// O sistema deve manter a sessão ou redirecionar adequadamente
		const isOnLogin = page.url().includes('login')
		const isOnDashboard = page.url().includes('inicial')

		// Estado deve ser consistente (em uma das duas páginas válidas)
		expect(isOnLogin || isOnDashboard).toBe(true)

		// Se voltou para login, verificar que elementos estão presentes
		if (isOnLogin) {
			await expect(
				page.getByRole('img', { name: 'Único Digital' })
			).toBeVisible()
		}

		// Se permaneceu no dashboard, verificar elementos do dashboard
		if (isOnDashboard) {
			await expect(page.getByText('WESLEY JESUS')).toBeVisible()
		}
	})

	test('Refresh da Página Durante Login', async ({ page }) => {
		// Acessar página de login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp'
		)

		// Preencher campo de login
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('wesleyjesus@mpf.mp.br')

		// Verificar que o campo foi preenchido
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue(
			'wesleyjesus@mpf.mp.br'
		)

		// Pressionar F5 para refresh da página antes de submeter
		await page.reload()

		// Verificar estado dos dados após refresh
		// Dados do formulário devem ser perdidos (comportamento normal)
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue('')

		// Verificar que a página recarregou adequadamente
		await expect(page).toHaveTitle('Login')
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

		// Verificar que a funcionalidade de login permanece intacta
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('wesleyjesus@mpf.mp.br')
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar que o login ainda funciona após o refresh
		await expect(page).toHaveURL(/.*\/unico\/#\/inicial/)
		await expect(page).toHaveTitle('Página Inicial - Sistema Único')
	})

	test('Navegação Direta com Parâmetros', async ({ page }) => {
		// Tentar acessar URL com parâmetros específicos
		const urlWithParams =
			'https://unico-homologacao-02.mpf.mp.br/unico/?continue#/inicial&param=test'
		await page.goto(urlWithParams)

		// Deve redirecionar para login
		await expect(page).toHaveURL(/.*\/oauth2\/login/)

		// Verificar elementos de login
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()

		// Realizar login
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('wesleyjesus@mpf.mp.br')
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar redirecionamento para dashboard (pode ou não preservar parâmetros)
		await expect(page).toHaveURL(/.*\/unico\/.*#\/inicial/)

		// Verificar que chegou ao dashboard correto
		await expect(page).toHaveTitle('Página Inicial - Sistema Único')
		await expect(page.getByText('WESLEY JESUS')).toBeVisible()
	})
})
