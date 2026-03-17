import { expect, type Page } from '@playwright/test'

export async function expectRequiredEmailError(page: Page) {
	const body = page.locator('body')

	await expect(page).toHaveURL(/.*\/unico\/rest-api\/oauth2\/login/)
	await expect(body).toContainText('O e-mail do usuário deve ser informado!')
	await expect(body).toContainText('BAD_REQUEST')
	await expect(body).toContainText('400')
}

export async function expectNoPermissionsResult(page: Page, email: string) {
	const body = page.locator('body')

	if (page.url().includes('sem_atuacoes.jsp')) {
		await expect(page).toHaveURL(/.*\/unico\/sem_atuacoes\.jsp/)
		await expect(page).toHaveTitle('Sistema Único')
		await expect(body).toContainText(
			'Seu usuário não tem nenhum atuação no sistema',
		)
		await expect(
			page.getByRole('link', { name: 'Clique aqui para fechar a sessão' }),
		).toBeVisible()
		return
	}

	await expect(page).toHaveURL(/.*\/unico\/oauth2\/login\/loginNovo\.jsp/)
	await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue(
		email,
	)
}

export async function expectLoginRejectedOrStayedOnLogin(page: Page) {
	const isLoginPage = page.url().includes('loginNovo.jsp')
	const isErrorPage = page.url().includes('rest-api/oauth2/login')
	const isNoPermissionsPage = page.url().includes('sem_atuacoes.jsp')

	expect(isLoginPage || isErrorPage || isNoPermissionsPage).toBeTruthy()

	if (isLoginPage) {
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
		return
	}

	if (isErrorPage) {
		await expect(page.locator('body')).toContainText(/erro|error|usuário/i)
		return
	}

	await expect(page.locator('body')).toContainText(
		'Seu usuário não tem nenhum atuação no sistema',
	)
}

export async function expectSafeFailureState(page: Page) {
	const isLoginPage = page.url().includes('loginNovo.jsp')
	const isErrorPage = page.url().includes('rest-api/oauth2/login')

	expect(isLoginPage || isErrorPage).toBeTruthy()
	await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
}
