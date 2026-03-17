import { type Page } from '@playwright/test'
import { loginUsers, type LoginUser } from '../data/login-users'
import { DashboardPage } from '../pages/dashboard.page'
import { LoginPage } from '../pages/login.page'

export async function loginAs(page: Page, user: LoginUser) {
	const loginPage = new LoginPage(page)

	await loginPage.goto()
	await loginPage.assertLoaded()
	await loginPage.loginAs(user.email)
}

export async function loginAsValidUser(page: Page) {
	await loginAs(page, loginUsers.valid)

	const dashboardPage = new DashboardPage(page)
	await dashboardPage.assertLoaded(loginUsers.valid)

	return dashboardPage
}
