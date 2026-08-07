import { expect, type Locator, type Page } from '@playwright/test'
import { type LoginUser } from '../data/login-users'

export class DashboardPage {
	readonly page: Page
	readonly systemLogo: Locator
	readonly searchInput: Locator

	constructor(page: Page) {
		this.page = page
		this.systemLogo = page.getByRole('img', { name: 'Sistema Único' })
		this.searchInput = page.getByRole('textbox', {
			name: 'Pesquisar expediente',
		})
	}

	menuItem(name: string) {
		return this.page.getByRole('menuitem', { name: `Menu ${name}` })
	}

	userButton(name: string) {
		return this.page.getByRole('button', { name })
	}

	async assertLoaded(user: LoginUser) {
		await expect(this.page).toHaveURL(/.*\/unico\/.*#\/inicial/)
		await expect(this.page).toHaveTitle('Página Inicial - Sistema Único')
		await expect(this.systemLogo).toBeVisible()
		await expect(this.searchInput).toBeVisible()

		if (user.displayName) {
			await expect(this.userButton(user.displayName)).toBeVisible()
		}

		if (user.unit) {
			await expect(this.page.getByText(user.unit).first()).toBeVisible()
		}

		for (const item of [
			'Documento',
			'Procedimento',
			'Judicial',
			'Integração',
			'Consultas',
			'Ajustes',
			'Tabelas',
		]) {
			await expect(this.menuItem(item)).toBeVisible()
		}
	}
}
