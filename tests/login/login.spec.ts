import { expect, test } from '@playwright/test'
import { loginUsers } from '../data/login-users'
import { DashboardPage } from '../pages/dashboard.page'
import { LoginPage } from '../pages/login.page'

test.describe('Login - sucesso', () => {
	let loginPage: LoginPage
	let dashboardPage: DashboardPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		dashboardPage = new DashboardPage(page)

		await loginPage.goto()
		await loginPage.assertLoaded()
	})

	test('deve autenticar usuário válido e abrir a página inicial', async () => {
		await test.step('Arrange - preparar o formulário de login', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - enviar credenciais válidas', async () => {
			await loginPage.loginAs(loginUsers.valid.email)
		})

		await test.step('Assert - exibir dashboard com dados do usuário', async () => {
			await dashboardPage.assertLoaded(loginUsers.valid)
		})
	})
})
