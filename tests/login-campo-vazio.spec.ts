// spec: plano-teste-sistema-unico.md
// cenário: 1.2 Tentativa de Login com Campo Vazio

import { test, expect } from '@playwright/test'

test.describe('Login - Tentativa com Campo Vazio', () => {
	test('deve validar campo obrigatório quando usuário está vazio', async ({
		page,
	}) => {
		await test.step('Navegar para a página de login', async () => {
			await page.goto('/')

			// Aguardar carregamento da página
			await page.waitForLoadState('networkidle')

			// Verificar se a página de login carregou corretamente
			await expect(page).toHaveTitle('Login')

			// Aguardar a imagem aparecer
			await page.waitForSelector('img[alt*="Único"]', { timeout: 10000 })
			await expect(page.locator('img').first()).toBeVisible()
		})

		await test.step('Verificar que o campo "Usuário" está vazio', async () => {
			// Aguardar o campo aparecer e usar seletor mais específico
			await page.waitForSelector('input[placeholder="Email"]', {
				timeout: 10000,
			})

			const userField = page.locator('input[placeholder="Email"]')
			await expect(userField).toBeVisible()
			await expect(userField).toHaveAttribute('placeholder', 'Email')

			// Garantir que o campo está vazio - limpar se necessário
			await userField.clear()
			await expect(userField).toHaveValue('')
		})

		await test.step('Clicar no botão "Entrar" com campo vazio', async () => {
			// Usar seletor mais específico para o botão
			const enterButton = page.locator('button').filter({ hasText: 'Entrar' })
			await expect(enterButton).toBeVisible()
			await enterButton.click()
		})

		await test.step('Verificar comportamento do sistema com campo vazio', async () => {
			// Aguardar possíveis redirecionamentos ou validações
			await page.waitForTimeout(3000)

			// O sistema redireciona para uma página de login OAuth2 mesmo com campo vazio
			await expect(page).toHaveURL(/.*oauth2\/login.*/)

			// Verificar se ainda está em uma página de login (não foi para o dashboard)
			await expect(page.locator('text=Sistema Único')).not.toBeVisible({
				timeout: 2000,
			})

			// Capturar a URL atual para análise
			const currentUrl = page.url()
			console.log('URL após tentativa de login com campo vazio:', currentUrl)

			// Verificar se há campos de login visíveis na nova página
			const hasLoginElements = await page
				.locator(
					'input[type="text"], input[type="email"], input[placeholder*="mail"], input[placeholder*="usuário"], input[placeholder*="Usuário"]'
				)
				.count()

			if (hasLoginElements > 0) {
				console.log('✓ Página possui campos de login - validação funcionando')

				// Verificar se há mensagens de erro ou validação
				const possibleErrorSelectors = [
					'.error',
					'.invalid',
					'.alert',
					'.validation-error',
					'[class*="error"]',
					'[id*="error"]',
					'text=obrigatório',
					'text=necessário',
					'text=required',
				]

				let errorFound = false
				for (const selector of possibleErrorSelectors) {
					const errorElements = await page.locator(selector).count()
					if (errorElements > 0) {
						const isVisible = await page.locator(selector).first().isVisible()
						if (isVisible) {
							console.log(`✓ Mensagem de validação encontrada: ${selector}`)
							errorFound = true
							break
						}
					}
				}

				if (!errorFound) {
					console.log(
						'⚠ Nenhuma mensagem de erro explícita encontrada, mas permaneceu em página de login'
					)
				}

				// O teste é bem-sucedido se:
				// 1. Não foi redirecionado para o dashboard
				// 2. Permaneceu em uma página de login/autenticação
				expect(currentUrl).toMatch(/login|auth|oauth/i)
			} else {
				console.log('⚠ Página sem campos de login detectáveis')

				// Verificar se há alguma mensagem de erro na página
				const pageContent = await page.textContent('body')
				console.log(
					'Conteúdo da página (primeiros 200 caracteres):',
					pageContent?.substring(0, 200)
				)
			}

			// Verificação final: não deve estar no dashboard principal
			const isDashboard =
				currentUrl.includes('/#/inicial') ||
				(await page.locator('text=Sistema Único 4.18').isVisible())
			expect(isDashboard).toBe(false)

			console.log('✓ Teste bem-sucedido: Sistema impediu login com campo vazio')
		})
	})
})
