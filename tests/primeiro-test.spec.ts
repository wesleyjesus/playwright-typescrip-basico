import test from '@playwright/test'

test('Meu primeiro teste com Playwright', async ({ page }) => {
	await page.goto('https://example.com')
	await page.screenshot({ path: `example.png` })
})
