import { test, expect } from '@playwright/test'
import {
	epic,
	feature,
	story,
	severity,
	description,
	step,
	attachment,
	parameter,
} from 'allure-js-commons'

test.describe('Exemplo de Testes com Allure', () => {
	test.beforeEach(async ({ page }) => {
		// Adicionar informações ao relatório Allure
		await epic('Testes de Exemplo')
		await feature('Navegação Básica')
	})

	test('Deve carregar a página inicial do Google', async ({ page }) => {
		await story('Carregamento da página')
		await severity('critical')
		await description(
			'Teste básico para verificar se a página do Google carrega corretamente'
		)

		// Adicionar step manual
		await step('Navegar para o Google', async () => {
			await page.goto('https://www.google.com')
		})

		await step('Verificar título da página', async () => {
			await expect(page).toHaveTitle(/Google/)
		})

		await step('Verificar presença da caixa de pesquisa', async () => {
			// Usar múltiplos seletores possíveis para a caixa de pesquisa
			const searchBox = page
				.locator(
					'textarea[name="q"], input[name="q"], input[title*="Search"], textarea[title*="Search"]'
				)
				.first()
			await expect(searchBox).toBeVisible({ timeout: 10000 })
		})

		await step('Verificar elementos essenciais da página', async () => {
			// Verificar se existe algum logo do Google
			const googleLogo = page
				.locator('img[alt*="Google"], img[src*="logo"], [role="img"]')
				.first()
			await expect(googleLogo).toBeVisible({ timeout: 10000 })
		})

		// Adicionar anexo (screenshot)
		await attachment(
			'Screenshot da página inicial',
			await page.screenshot(),
			'image/png'
		)
	})

	test('Deve realizar uma pesquisa no Google', async ({ page }) => {
		await story('Funcionalidade de Pesquisa')
		await severity('normal')
		await description(
			'Teste para verificar a funcionalidade de pesquisa do Google'
		)

		const searchTerm = 'Playwright testing'

		await step('Navegar para o Google', async () => {
			await page.goto('https://www.google.com')
		})

		await step(`Pesquisar por "${searchTerm}"`, async () => {
			// Aguardar a página carregar completamente
			await page.waitForLoadState('networkidle')

			// Usar seletor mais robusto para a caixa de pesquisa
			const searchBox = page
				.locator(
					'textarea[name="q"], input[name="q"], input[title*="Search"], textarea[title*="Search"]'
				)
				.first()
			await searchBox.waitFor({ state: 'visible', timeout: 10000 })

			await searchBox.fill(searchTerm)
			await page.keyboard.press('Enter')
		})

		await step('Verificar resultados da pesquisa', async () => {
			// Aguardar a página de resultados carregar
			await page.waitForURL(/.*google\.com\/search.*/, { timeout: 15000 })

			// Verificar se estamos na página de resultados (URL contém 'search')
			const currentUrl = page.url()
			expect(currentUrl).toContain('search')

			// Verificar se a página carregou corretamente aguardando por qualquer conteúdo
			await page.waitForLoadState('networkidle')

			// Verificar se existe o termo de pesquisa na página ou na URL
			const urlContainsSearch =
				currentUrl.includes('q=') || currentUrl.includes('Playwright')
			expect(urlContainsSearch).toBeTruthy()

			// Verificar se a página tem conteúdo (não está vazia)
			const pageHasContent = await page.locator('body *').count()
			expect(pageHasContent).toBeGreaterThan(10) // Deve ter mais de 10 elementos
		})

		// Adicionar parâmetros ao relatório
		await parameter('Termo de pesquisa', searchTerm)
		await parameter('Browser', 'Chromium')
	})

	test('Deve verificar funcionalidades avançadas do Google', async ({
		page,
	}) => {
		await story('Funcionalidades Avançadas')
		await severity('normal')
		await description(
			'Teste para verificar funcionalidades avançadas e responsividade do Google'
		)

		await step('Navegar para o Google', async () => {
			await page.goto('https://www.google.com')
			await page.waitForLoadState('networkidle')
		})

		await step('Verificar responsividade da página', async () => {
			// Testar em viewport móvel
			await page.setViewportSize({ width: 375, height: 667 })
			await page.waitForTimeout(1000)

			const searchBox = page
				.locator(
					'textarea[name="q"], input[name="q"], input[title*="Search"], textarea[title*="Search"]'
				)
				.first()
			await expect(searchBox).toBeVisible({ timeout: 10000 })
		})

		await step(
			'Verificar navegação para outras páginas do Google',
			async () => {
				// Tentar clicar em "Imagens" se existir
				const imagesLink = page
					.locator(
						'a[href*="tbm=isch"], a:has-text("Images"), a:has-text("Imagens")'
					)
					.first()

				// Se o link existir, vamos verificar
				if ((await imagesLink.count()) > 0) {
					await expect(imagesLink).toBeVisible()
				}

				// Verificar se existem links de navegação
				const navLinks = page.locator('a[href*="google"], nav a, header a')
				const linkCount = await navLinks.count()
				expect(linkCount).toBeGreaterThan(0)
			}
		)

		await step('Testar interação com elementos da página', async () => {
			// Voltar para viewport desktop
			await page.setViewportSize({ width: 1920, height: 1080 })
			await page.waitForTimeout(1000)

			// Verificar se a caixa de pesquisa ainda está visível
			const searchBox = page
				.locator(
					'textarea[name="q"], input[name="q"], input[title*="Search"], textarea[title*="Search"]'
				)
				.first()
			await expect(searchBox).toBeVisible()

			// Verificar se podemos focar na caixa de pesquisa
			await searchBox.click()
			await expect(searchBox).toBeFocused()
		})

		// Adicionar anexo do estado final
		await attachment(
			'Screenshot final da página',
			await page.screenshot(),
			'image/png'
		)

		// Adicionar parâmetros
		await parameter('Teste de responsividade', 'Concluído')
		await parameter(
			'Viewports testados',
			'Mobile (375x667) e Desktop (1920x1080)'
		)
	})
})
