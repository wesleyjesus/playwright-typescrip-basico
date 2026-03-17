import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
	testDir: './tests',
	testIgnore: ['**/data/**', '**/helpers/**', '**/legacy/**', '**/pages/**'],
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 2,
	reporter: [
		['html'],
		['list'],
		[
			'allure-playwright',
			{
				detail: true,
				outputFolder: 'allure-results',
				suiteTitle: false,
				environmentInfo: {
					framework: 'Playwright',
					node_version: process.version,
					os: process.platform,
				},
			},
		],
	],
	use: {
		baseURL:
			process.env.BASE_URL || 'https://unico-homologacao-02.mpf.mp.br/unico/',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		ignoreHTTPSErrors: true,
		video: 'retain-on-failure',
		headless: true,
		launchOptions: {
			args: [
				'--disable-gpu',
				'--disable-dev-shm-usage',
				'--no-sandbox',
				'--disable-software-rasterizer',
			],
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
})
