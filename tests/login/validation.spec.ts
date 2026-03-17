import { expect, test } from '@playwright/test'
import { expectRequiredEmailError } from '../helpers/login-assertions'
import { LoginPage } from '../pages/login.page'

test.describe('Login - validações', () => {
	let loginPage: LoginPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)

		await loginPage.goto()
		await loginPage.assertLoaded()
	})

	test('deve impedir envio com o campo usuário vazio', async () => {
		await test.step('Arrange - garantir que o campo está vazio', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - submeter o formulário sem preencher o usuário', async () => {
			await loginPage.submit()
		})

		await test.step('Assert - exibir erro de campo obrigatório', async () => {
			await expectRequiredEmailError(loginPage.page)
		})
	})
})
