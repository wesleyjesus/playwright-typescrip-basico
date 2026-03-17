import { expect, test } from '@playwright/test'
import { loginUsers } from '../data/login-users'
import {
	expectLoginRejectedOrStayedOnLogin,
	expectNoPermissionsResult,
} from '../helpers/login-assertions'
import { LoginPage } from '../pages/login.page'

test.describe('Login - controle de acesso', () => {
	let loginPage: LoginPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)

		await loginPage.goto()
		await loginPage.assertLoaded()
	})

	test('deve tratar usuário sem permissões', async () => {
		await test.step('Arrange - preparar um usuário sem atuação', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - tentar autenticar usuário sem permissões', async () => {
			await loginPage.loginAs(loginUsers.noPermissions.email)
		})

		await test.step('Assert - manter fluxo controlado de acesso negado', async () => {
			await expectNoPermissionsResult(
				loginPage.page,
				loginUsers.noPermissions.email,
			)
		})
	})

	test('deve rejeitar usuário MPF inexistente', async () => {
		await test.step('Arrange - preparar um e-mail inexistente', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - tentar autenticar usuário inexistente', async () => {
			await loginPage.loginAs(loginUsers.unknownMpfUser.email)
		})

		await test.step('Assert - exibir resposta controlada do sistema', async () => {
			await expectLoginRejectedOrStayedOnLogin(loginPage.page)
		})
	})
})
