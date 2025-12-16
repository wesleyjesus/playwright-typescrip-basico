// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

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

test.describe('CENÁRIOS DE TESTES: LOGIN', () => {
	test.beforeEach(async ({ page }) => {
		// Adicionar informações ao relatório Allure
		await epic('Funcionalidade de Login')
		await feature('Realizar Login no Sistema Único')
	})

	test('Deve logar e redirecionar para a página inicial', async ({ page }) => {
		await story('Login Bem-sucedido')
		await severity('critical')
		await description(
			'Teste para verificar se o login no sistema Único é realizado com sucesso'
		)
		// 1. Acessar URL de login
		await page.goto('/oauth2/login/loginNovo.jsp')

		// Verificar se o logo 'Único Digital' está presente na tela de login
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()

		// Verificar se o campo 'Usuário' com placeholder 'Email' está visível
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()

		// Verificar se o botão 'Entrar' está visível
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

		// 2. Inserir "wesleyjesus@mpf.mp.br" no campo Usuário
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('wesleyjesus@mpf.mp.br')

		// 3. Clicar em "Entrar"
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar redirecionamento para dashboard
		await expect(page).toHaveURL(/.*\/unico\/#\/inicial/)

		// Verificar título da página
		await expect(page).toHaveTitle('Página Inicial - Sistema Único')

		// Verificar exibição do nome "WESLEY JESUS" e unidade "CIVINT/STIC"
		await expect(page.getByText('WESLEY JESUS')).toBeVisible()
		await expect(page.getByText('CIVINT/STIC').first()).toBeVisible()

		// Verificar presença do logo Sistema Único na dashboard
		await expect(page.getByRole('img', { name: 'Sistema Único' })).toBeVisible()

		// Verificar menu principal com 7 opções visíveis
		await expect(
			page.getByRole('button', { name: 'Menu Documento' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Procedimento' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Judicial' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Integração' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Consultas' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Ajustes' })
		).toBeVisible()
		await expect(
			page.getByRole('button', { name: 'Menu Tabelas' })
		).toBeVisible()

		// Verificar campo de pesquisa de expediente
		await expect(
			page.getByRole('textbox', { name: 'Pesquisar expediente' })
		).toBeVisible()
	})

	test('Não deve realizar login com campo obrigatório vazio', async ({
		page,
	}) => {
		await story('Login com Campo Obrigatório Vazio')
		await severity('critical')
		await description(
			'Teste para verificar se o sistema exibe a mensagem de erro ao tentar logar sem preencher o campo obrigatório Usuário'
		)
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

		// Verificar redirecionamento para página de erro
		await expect(page).toHaveURL(/.*\/unico\/rest-api\/oauth2\/login/)

		// Verificar se a mensagem de erro está visível (pode estar em XML)
		await expect(page.locator('body')).toContainText(
			'O e-mail do usuário deve ser informado!'
		)

		// Verificar se o status HTTP 400 (BAD_REQUEST) está visível
		await expect(page.locator('body')).toContainText('BAD_REQUEST')

		// Verificar código de erro 400
		await expect(page.locator('body')).toContainText('400')

		// Verificar se a mensagem XML de erro está presente
		await expect(page.getByText('<RestExceptionInfo>')).toBeVisible()
	})
})
