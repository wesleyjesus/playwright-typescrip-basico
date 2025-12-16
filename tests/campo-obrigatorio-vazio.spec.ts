// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('CENÁRIOS DE VALIDAÇÃO', () => {
	test('Campo Obrigatório Vazio', async ({ page }) => {
		// 1. Acessar página de login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp'
		)

		// Verificar se elementos da tela de login estão presentes
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

		// 2. Deixar campo Usuário vazio (não preencher nada)
		// 3. Clicar em "Entrar"
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Aguardar redirecionamento para página de erro
		await expect(page).toHaveURL(/.*\/unico\/rest-api\/oauth2\/login/)

		// Capturar mensagem de erro para comparação detalhada
		const mensagemEsperada = 'O e-mail do usuário deve ser informado!'
		
		// Aguardar um pouco para a resposta do servidor
		await page.waitForTimeout(2000)
		
		// Capturar conteúdo da página completo
		const conteudoPagina = await page.locator('body').textContent() || ''
		
		// Log detalhado para debug
		console.log('=== VALIDAÇÃO DE MENSAGEM DE ERRO ===')
		console.log('Mensagem esperada:', mensagemEsperada)
		console.log('Conteúdo capturado (primeiros 500 chars):', conteudoPagina.substring(0, 500))
		console.log('Contém a mensagem esperada?', conteudoPagina.includes(mensagemEsperada))
		console.log('Contém BAD_REQUEST?', conteudoPagina.includes('BAD_REQUEST'))
		console.log('Contém código 400?', conteudoPagina.includes('400'))
		
		// Verificações com melhor tratamento de erro
		try {
			await expect(page.locator('body')).toContainText(mensagemEsperada, {
				timeout: 5000
			})
			console.log('✅ Mensagem de erro encontrada com sucesso')
		} catch (error) {
			console.log('❌ Mensagem de erro não encontrada')
			throw new Error(`Mensagem esperada "${mensagemEsperada}" não encontrada. Conteúdo atual: "${conteudoPagina.substring(0, 300)}..."`)
		}

		// Verificar se o status HTTP 400 (BAD_REQUEST) está visível
		await expect(page.locator('body')).toContainText('BAD_REQUEST')

		// Verificar código de erro 400
		await expect(page.locator('body')).toContainText('400')
	})
})
