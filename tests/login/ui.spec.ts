import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

test.describe('Login - interface', () => {
	let loginPage: LoginPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)

		await loginPage.goto()
		await loginPage.assertLoaded()
	})

	test('deve exibir os elementos visuais essenciais', async () => {
		await test.step('Arrange - abrir a tela de login', async () => {
			await expect(loginPage.page).toHaveTitle('Login')
		})

		await test.step('Act - observar a estrutura principal da tela', async () => {
			await expect(loginPage.logo).toBeVisible()
		})

		await test.step('Assert - garantir que os controles básicos estão disponíveis', async () => {
			await expect(loginPage.emailInput).toHaveAttribute('placeholder', 'Email')
			await expect(loginPage.submitButton).toBeVisible()
		})
	})

	test('deve permitir navegação por teclado', async () => {
		await test.step('Arrange - carregar a página sem interação prévia', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - navegar pelos controles com tabulação', async () => {
			await loginPage.page.keyboard.press('Tab')
			await expect(loginPage.emailInput).toBeFocused()
			await loginPage.page.keyboard.press('Tab')
		})

		await test.step('Assert - focar o botão e permitir retorno ao campo', async () => {
			await expect(loginPage.submitButton).toBeFocused()
			await loginPage.page.keyboard.press('Shift+Tab')
			await expect(loginPage.emailInput).toBeFocused()
		})
	})

	test('deve preservar o comportamento esperado do placeholder', async () => {
		await test.step('Arrange - começar com o campo vazio', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - preencher e limpar o campo usuário', async () => {
			await loginPage.fillEmail('usuario.teste@mpf.mp.br')
			await expect(loginPage.emailInput).toHaveValue('usuario.teste@mpf.mp.br')
			await loginPage.fillEmail('')
		})

		await test.step('Assert - restaurar estado inicial do placeholder', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
			await expect(loginPage.emailInput).toHaveAttribute('placeholder', 'Email')
		})
	})
})
