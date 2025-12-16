// spec: tests/sistema-unico-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('CENÁRIOS DE SEGURANÇA', () => {
	test('Injeção de Código', async ({ page }) => {
		// Acessar página de login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp'
		)

		// Verificar elementos básicos estão presentes
		await expect(page.getByRole('img', { name: 'Único Digital' })).toBeVisible()
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

		// Testar proteção contra SQL Injection
		const maliciousInput = "test@mpf.mp.br'; DROP TABLE users; --"
		await page.getByRole('textbox', { name: 'Usuário' }).fill(maliciousInput)

		// Clicar no botão 'Entrar' para testar proteção contra SQL Injection
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar que o sistema não processou o código malicioso
		// O sistema deve tratar de forma segura, permanecendo na página de login ou retornando erro controlado
		const remainsOnLogin = page.url().includes('loginNovo.jsp')
		const hasControlledError = page.url().includes('rest-api/oauth2/login')

		// Verificar que o sistema não crashou e manteve a funcionalidade
		expect(remainsOnLogin || hasControlledError).toBe(true)

		// Verificar que o campo ainda contém o input (não foi processado de forma perigosa)
		if (remainsOnLogin) {
			await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue(
				maliciousInput
			)
		}

		// Verificar que a página ainda está funcional
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
	})

	test('Entrada Excessivamente Longa', async ({ page }) => {
		// Acessar página de login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp'
		)

		// Criar string muito longa (>1000 caracteres)
		const longInput =
			'very.long.email.address.that.exceeds.normal.limits.and.should.be.tested.for.proper.handling.by.the.system.to.ensure.no.buffer.overflow.or.security.issues.occur.when.processing.extremely.long.input.strings.in.the.email.field.and.we.need.to.make.this.string.even.longer.to.reach.over.one.thousand.characters.so.we.will.add.more.descriptive.text.about.testing.scenarios.and.security.validations.that.should.be.performed.on.web.applications.to.prevent.buffer.overflow.attacks.and.other.security.vulnerabilities.that.could.be.exploited.by.malicious.users.trying.to.compromise.the.system.integrity.and.data.security.measures.implemented.by.the.development.team@verylongdomainname.mpf.mp.br.that.should.also.be.tested.for.length.limits.and.proper.validation.mechanisms.to.prevent.any.security.vulnerabilities.or.system.crashes.due.to.excessive.input.length.and.we.continue.adding.more.text.to.ensure.we.reach.the.minimum.required.length.for.this.comprehensive.security.test.case.validation.scenario.implementation.and.verification.process'

		// Verificar que a string é realmente longa (>1000 caracteres)
		expect(longInput.length).toBeGreaterThan(1000)

		// Testar com entrada excessivamente longa
		await page.getByRole('textbox', { name: 'Usuário' }).fill(longInput)

		// Clicar no botão 'Entrar' para testar com entrada longa
		await page.getByRole('button', { name: 'Entrar' }).click()

		// Verificar que o sistema tratou adequadamente sem crash
		const remainsOnLogin = page.url().includes('loginNovo.jsp')
		const hasControlledError = page.url().includes('rest-api/oauth2/login')

		// Sistema deve permanecer estável
		expect(remainsOnLogin || hasControlledError).toBe(true)

		// Verificar que a interface permanece responsiva
		await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
		await expect(page.getByRole('textbox', { name: 'Usuário' })).toBeVisible()

		// Verificar que o campo de entrada ainda funciona após o teste
		if (remainsOnLogin) {
			// Testar que o campo ainda aceita entrada normal
			await page
				.getByRole('textbox', { name: 'Usuário' })
				.fill('teste.normal@mpf.mp.br')
			await expect(page.getByRole('textbox', { name: 'Usuário' })).toHaveValue(
				'teste.normal@mpf.mp.br'
			)
		}
	})

	test('Múltiplas Submissões Rápidas', async ({ page }) => {
		// Acessar página de login
		await page.goto(
			'https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp'
		)

		// Preencher o campo com email válido
		await page
			.getByRole('textbox', { name: 'Usuário' })
			.fill('teste.multiplo@mpf.mp.br')

		const enterButton = page.getByRole('button', { name: 'Entrar' })

		// Clicar rapidamente múltiplas vezes para testar prevenção de submissões duplicadas
		await Promise.all([
			enterButton.click(),
			enterButton.click(),
			enterButton.click(),
		])

		// Aguardar processamento
		await page.waitForTimeout(1000)

		// Verificar que o sistema manteve estabilidade
		// Deve ter processado apenas uma requisição ou ter controle adequado
		const isStable = await page
			.getByRole('button', { name: 'Entrar' })
			.isVisible()
		expect(isStable).toBe(true)

		// Verificar que não há múltiplas janelas ou comportamento inesperado
		// A página deve estar em um estado consistente
		const currentUrl = page.url()
		expect(currentUrl).toMatch(/unico-homologacao-02\.mpf\.mp\.br/)
	})
})
