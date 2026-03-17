import { expect, type Locator, type Page } from '@playwright/test'
import { type RequiredDocumentData } from '../data/document-data'

function createSearchPattern(value: string) {
	const normalized = value
		.trim()
		.split(/\s+/)
		.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		.join('.*')

	return new RegExp(normalized, 'i')
}

export class DocumentInclusionPage {
	readonly page: Page
	readonly natureSelect: Locator
	readonly typeInput: Locator
	readonly restrictionLevelSelect: Locator
	readonly objectiveButton: Locator
	readonly calendarButton: Locator
	readonly todayButton: Locator
	readonly summaryInput: Locator
	readonly signerScopeSelect: Locator
	readonly signerSearchInput: Locator
	readonly saveButton: Locator

	constructor(page: Page) {
		this.page = page
		this.natureSelect = page.getByLabel('Natureza')
		this.typeInput = page.getByRole('textbox', { name: 'Tipo*' })
		this.restrictionLevelSelect = page.getByLabel('Nível de Restrição')
		this.objectiveButton = page.getByRole('button', {
			name: 'Objetivo activate',
		})
		this.calendarButton = page.getByRole('button', {
			name: 'Abrir calendário',
		})
		this.todayButton = page.getByRole('button', { name: 'Hoje', exact: true })
		this.summaryInput = page.getByRole('textbox', { name: 'Resumo*' })
		this.signerScopeSelect = page.getByLabel(
			'Filtrar abrangência da pesquisa pelo nome do responsável pela assinatura',
		)
		this.signerSearchInput = page.getByRole('textbox', {
			name: 'Pesquisar nome do responsável pela assinatura',
		})
		this.saveButton = page.getByRole('button', { name: 'Salvar' })
	}

	async goto() {
		await this.page.goto(
			'unico-v2/app/modules/documentos/DocumentosView.html#/incluir/expedido',
		)
	}

	async assertLoaded() {
		await expect(this.natureSelect).toBeVisible()
		await expect(this.typeInput).toBeVisible()
		await expect(this.summaryInput).toBeVisible()
		await expect(this.saveButton).toBeVisible()
	}

	async selectType(typeSearch: string, typeOption: string) {
		await this.typeInput.click()
		await this.typeInput.fill(typeSearch)
		await this.page.getByRole('link', { name: typeOption, exact: true }).click()
	}

	async selectObjective(option: string) {
		await this.objectiveButton.click()
		await this.page.getByText(option, { exact: true }).click()
	}

	async selectSigner(search: string, option: string) {
		await this.signerSearchInput.click()
		await this.signerSearchInput.fill(search)

		const preferredOption = this.page.getByRole('link', {
			name: option,
			exact: true,
		})
		const fallbackOption = this.page
			.getByRole('link', { name: createSearchPattern(search) })
			.first()

		if (await preferredOption.isVisible().catch(() => false)) {
			await preferredOption.click()
			return
		}

		await expect(fallbackOption).toBeVisible({ timeout: 10000 })
		await fallbackOption.click()
	}

	async fillRequiredFields(data: RequiredDocumentData) {
		await this.natureSelect.selectOption(data.nature)
		await this.selectType(data.typeSearch, data.typeOption)
		await this.restrictionLevelSelect.selectOption(data.restrictionLevel)
		await this.selectObjective(data.objectiveOption)
		await this.calendarButton.click()
		await this.todayButton.click()
		await this.summaryInput.fill(data.summary)
		await this.signerScopeSelect.selectOption(data.signerScope)
		await this.selectSigner(data.signerSearch, data.signerOption)
	}

	async save() {
		await this.saveButton.click()
	}

	async assertSuccessMessage(message: string) {
		await expect(this.page.locator('body')).toContainText(message)
	}
}
