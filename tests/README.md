# Organização dos testes

## Estrutura

- `data/`: massa de dados reutilizável
- `helpers/`: helpers e assertions compartilháveis
- `pages/`: Page Objects
- `login/`: cenários de autenticação organizados por comportamento
- `documento/`: cenários da funcionalidade de documento
- `legacy/`: referência histórica da migração

## Convenções

- Os testes seguem o padrão AAA com `test.step()` para separar `Arrange`, `Act` e `Assert`.
- Interações de UI ficam concentradas em Page Objects.
- Validações reaproveitáveis ficam em helpers.
- Massa de dados deve ser centralizada em `data/`.
- Evite `waitForTimeout`; prefira assertions web-first do Playwright.
