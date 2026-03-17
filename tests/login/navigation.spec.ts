import { expect, test } from '@playwright/test'
import { loginUsers } from '../data/login-users'
import { loginAsValidUser } from '../helpers/auth.helper'
import { DashboardPage } from '../pages/dashboard.page'
import { LoginPage } from '../pages/login.page'

test.describe('Login - navegação', () => {
	test('deve redirecionar URL protegida para a autenticação', async ({
		page,
	}) => {
		const loginPage = new LoginPage(page)

		await test.step('Arrange - acessar uma rota protegida sem sessão', async () => {
			await page.goto('?continue#/inicial')
		})

		await test.step('Act - aguardar a resolução do redirecionamento', async () => {
			await expect(page).toHaveURL(/.*\/oauth2\/login/)
		})

		await test.step('Assert - apresentar a tela de login', async () => {
			await loginPage.assertLoaded()
		})
	})

	test('deve manter um estado consistente ao usar voltar no navegador', async ({
		page,
	}) => {
		const dashboardPage = new DashboardPage(page)
		const loginPage = new LoginPage(page)

		await test.step('Arrange - autenticar com usuário válido', async () => {
			await loginAsValidUser(page)
		})

		await test.step('Act - voltar para a página anterior', async () => {
			await page.goBack()
		})

		await test.step('Assert - manter sessão consistente em login ou dashboard', async () => {
			const isOnLogin = page.url().includes('login')
			const isOnDashboard = page.url().includes('inicial')

			expect(isOnLogin || isOnDashboard).toBeTruthy()

			if (isOnLogin) {
				await loginPage.assertLoaded()
				return
			}

			await dashboardPage.assertLoaded(loginUsers.valid)
		})
	})

	test('deve limpar o formulário após refresh antes do envio', async ({
		page,
	}) => {
		const loginPage = new LoginPage(page)
		const dashboardPage = new DashboardPage(page)

		await test.step('Arrange - preencher o formulário de login', async () => {
			await loginPage.goto()
			await loginPage.assertLoaded()
			await loginPage.fillEmail(loginUsers.valid.email)
			await expect(loginPage.emailInput).toHaveValue(loginUsers.valid.email)
		})

		await test.step('Act - recarregar a página antes de enviar', async () => {
			await page.reload()
		})

		await test.step('Assert - resetar o formulário e permitir novo login', async () => {
			await loginPage.assertLoaded()
			await expect(loginPage.emailInput).toHaveValue('')
			await loginPage.loginAs(loginUsers.valid.email)
			await dashboardPage.assertLoaded(loginUsers.valid)
		})
	})

	test('deve aceitar navegação direta com parâmetros e concluir login', async ({
		page,
	}) => {
		const dashboardPage = new DashboardPage(page)
		const loginPage = new LoginPage(page)

		await test.step('Arrange - acessar rota protegida com parâmetros', async () => {
			await page.goto('?continue#/inicial&param=test')
		})

		await test.step('Act - autenticar após o redirecionamento', async () => {
			await expect(page).toHaveURL(/.*\/oauth2\/login/)
			await loginPage.loginAs(loginUsers.valid.email)
		})

		await test.step('Assert - chegar ao dashboard principal', async () => {
			await expect(page).toHaveURL(/.*\/unico\/.*#\/inicial/)
			await dashboardPage.assertLoaded(loginUsers.valid)
		})
	})
})
