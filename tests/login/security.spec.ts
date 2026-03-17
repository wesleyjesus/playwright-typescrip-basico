import { expect, test } from '@playwright/test'
import { expectSafeFailureState } from '../helpers/login-assertions'
import { LoginPage } from '../pages/login.page'

test.describe('Login - segurança', () => {
	let loginPage: LoginPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)

		await loginPage.goto()
		await loginPage.assertLoaded()
	})

	test('deve tratar entrada com tentativa de injeção', async () => {
		const maliciousInput = "test@mpf.mp.br'; DROP TABLE users; --"

		await test.step('Arrange - preparar payload malicioso', async () => {
			await expect(loginPage.emailInput).toHaveValue('')
		})

		await test.step('Act - enviar o payload pelo formulário', async () => {
			await loginPage.loginAs(maliciousInput)
		})

		await test.step('Assert - manter resposta controlada do sistema', async () => {
			await expectSafeFailureState(loginPage.page)

			if (loginPage.page.url().includes('loginNovo.jsp')) {
				await expect(loginPage.emailInput).toHaveValue(maliciousInput)
			}
		})
	})

	test('deve tratar entrada excessivamente longa sem perder estabilidade', async () => {
		const longInput = `${'very.long.email.segment.'.repeat(60)}@mpf.mp.br`

		await test.step('Arrange - gerar entrada acima do tamanho usual', async () => {
			expect(longInput.length).toBeGreaterThan(1000)
		})

		await test.step('Act - submeter o campo com valor longo', async () => {
			await loginPage.loginAs(longInput)
		})

		await test.step('Assert - preservar estabilidade e permitir novo uso do campo', async () => {
			await expectSafeFailureState(loginPage.page)

			if (loginPage.page.url().includes('loginNovo.jsp')) {
				await loginPage.fillEmail('teste.normal@mpf.mp.br')
				await expect(loginPage.emailInput).toHaveValue('teste.normal@mpf.mp.br')
			}
		})
	})

	test('deve lidar com múltiplas submissões rápidas', async () => {
		await test.step('Arrange - preencher o formulário uma única vez', async () => {
			await loginPage.fillEmail('teste.multiplo@mpf.mp.br')
		})

		await test.step('Act - clicar rapidamente várias vezes em entrar', async () => {
			await Promise.all([
				loginPage.submitButton.click(),
				loginPage.submitButton.click(),
				loginPage.submitButton.click(),
			])
		})

		await test.step('Assert - manter a interface utilizável após o envio', async () => {
			await expectSafeFailureState(loginPage.page)
			await expect(loginPage.page).toHaveURL(
				/unico-homologacao-02\.mpf\.mp\.br/,
			)
		})
	})
})
