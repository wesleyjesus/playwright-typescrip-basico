import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
	readonly page: Page
	readonly logo: Locator
	readonly emailInput: Locator
	readonly submitButton: Locator

	constructor(page: Page) {
		this.page = page
		this.logo = page.getByRole('img', { name: 'Único Digital' })
		this.emailInput = page.getByRole('textbox', { name: 'Usuário' })
		this.submitButton = page.getByRole('button', { name: 'Entrar' })
	}

	async goto() {
		await this.page.goto('oauth2/login/loginNovo.jsp')
	}

	async assertLoaded() {
		await expect(this.page).toHaveTitle('Login')
		await expect(this.logo).toBeVisible()
		await expect(this.emailInput).toBeVisible()
		await expect(this.emailInput).toHaveAttribute('placeholder', 'Email')
		await expect(this.submitButton).toBeVisible()
	}

	async fillEmail(email: string) {
		await this.emailInput.fill(email)
	}

	async submit() {
		await this.submitButton.click()
	}

	async loginAs(email: string) {
		await this.fillEmail(email)
		await this.submit()
	}
}
