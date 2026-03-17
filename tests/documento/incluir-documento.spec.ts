import { test, expect } from '@playwright/test'
import {
	epic,
	feature,
	story,
	severity,
	description,
	attachment,
} from 'allure-js-commons'
import { requiredDocumentData } from '../data/document-data'
import { loginAsValidUser } from '../helpers/auth.helper'
import { DocumentInclusionPage } from '../pages/document-inclusion.page'

test.describe('Documento - incluir', () => {
	test.beforeEach(async ({ page }) => {
		await epic('Documento')
		await feature('Incluir Documento')
	})

	test('deve incluir documento com dados obrigatórios', async ({ page }) => {
		const documentInclusionPage = new DocumentInclusionPage(page)

		await story('Incluir Documento Campos Obrigatórios')
		await severity('critical')
		await description(
			'Teste para incluir documento preenchendo apenas os campos obrigatórios',
		)

		await test.step('Arrange - autenticar e abrir a tela de inclusão', async () => {
			await loginAsValidUser(page)
			await documentInclusionPage.goto()
			await documentInclusionPage.assertLoaded()
		})

		await test.step('Act - preencher os campos obrigatórios', async () => {
			await documentInclusionPage.fillRequiredFields(requiredDocumentData)
			await documentInclusionPage.save()
		})

		await test.step('Assert - confirmar a inclusão do documento', async () => {
			await documentInclusionPage.assertSuccessMessage('Documento incluído.')
		})

		await attachment(
			'Screenshot mensagem de sucesso!',
			await page.screenshot(),
			'image/png',
		)
	})
})
