export type RequiredDocumentData = {
	nature: string
	typeSearch: string
	typeOption: string
	restrictionLevel: string
	objectiveOption: string
	summary: string
	signerScope: string
	signerSearch: string
	signerOption: string
}

export const requiredDocumentData: RequiredDocumentData = {
	nature: 'X',
	typeSearch: 'oficio',
	typeOption: 'OFÍCIO',
	restrictionLevel: '0',
	objectiveOption: 'Declarar',
	summary:
		process.env.MPF_DOCUMENT_SUMMARY ||
		'Teste realizado via automação Playwright.',
	signerScope: '2',
	signerSearch: process.env.MPF_DOCUMENT_SIGNER_SEARCH || 'Wesley Pereira',
	signerOption:
		process.env.MPF_DOCUMENT_SIGNER_OPTION || '27393 - WESLEY PEREIRA DE JESUS',
}
