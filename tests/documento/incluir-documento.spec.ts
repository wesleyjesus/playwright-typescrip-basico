import { test, expect } from '@playwright/test'

test('Deve incluir documento com dados obrigatórios', async ({ page }) => {
	await page.goto('https://unico-homologacao-02.mpf.mp.br/unico')
	// await page.getByRole('textbox', { name: 'Usuário' }).click()
	await page
		.getByRole('textbox', { name: 'Usuário' })
		.fill('wesleyjesus@mpf.mp.br')
	await page.getByRole('button', { name: 'Entrar' }).click()
	await expect(page).toHaveURL(/.*\/inicial/)
	await expect(page.getByRole('button', { name: 'WESLEY JESUS' })).toBeVisible()
	await page.goto(
		'https://unico-homologacao-02.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/incluir/expedido'
	)
	await page.getByLabel('Natureza').selectOption('X')
	await page.getByRole('textbox', { name: 'Tipo*' }).click()
	await page.getByRole('textbox', { name: 'Tipo*' }).fill('oficio')
	await page.getByRole('link', { name: 'OFÍCIO', exact: true }).click()
	await page.getByLabel('Nível de Restrição').selectOption('0')
	await page.getByRole('button', { name: 'Objetivo activate' }).click()
	await page.getByText('Declarar').click()
	await page.getByRole('button', { name: 'Abrir calendário' }).click()
	await page.getByRole('button', { name: 'Hoje', exact: true }).click()
	await page.getByRole('textbox', { name: 'Resumo*' }).click()
	await page
		.getByRole('textbox', { name: 'Resumo*' })
		.fill('Teste realizado via codegen.')
	await page
		.getByLabel(
			'Filtrar abrangência da pesquisa pelo nome do responsável pela assinatura'
		)
		.selectOption('2')
	await page
		.getByRole('textbox', {
			name: 'Pesquisar nome do responsável pela assinatura',
		})
		.click()
	await page
		.getByRole('textbox', {
			name: 'Pesquisar nome do responsável pela assinatura',
		})
		.fill('Wesley Pereira')
	await page
		.getByRole('link', { name: '27393 - WESLEY PEREIRA DE JESUS' })
		.click()
	await page.getByRole('button', { name: 'Salvar' }).click()
	await expect(page.getByText('Documento incluído.')).toBeVisible()
})
