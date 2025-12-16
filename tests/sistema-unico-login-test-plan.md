# Sistema Único - Plano de Teste da Tela de Login

## Resumo Executivo

Este documento apresenta o plano de teste completo para a tela de login do Sistema Único do Ministério Público Federal (MPF). O Sistema Único é uma aplicação web integrada que gerencia documentos, procedimentos e processos judiciais.

### Informações do Sistema
- **URL**: https://unico-homologacao-02.mpf.mp.br/unico/oauth2/login/loginNovo.jsp
- **Credencial Válida**: wesleyjesus@mpf.mp.br
- **Tecnologia**: Java/Spring, OAuth2, JSP

## Cenários de Teste Identificados

### 1. CENÁRIOS DE LOGIN VÁLIDO

#### 1.1 Login Bem-sucedido
**Objetivo**: Verificar login com credenciais válidas
**Passos**:
1. Acessar URL de login
2. Inserir "wesleyjesus@mpf.mp.br" no campo Usuário
3. Clicar em "Entrar"

**Resultado Esperado**:
- Redirecionamento para dashboard (/unico/?continue#/inicial)
- Exibição do nome "WESLEY JESUS" e unidade "CIVINT/STIC"
- Menu principal com 7 opções visíveis
- Contadores de documentos funcionais

### 2. CENÁRIOS DE VALIDAÇÃO

#### 2.1 Campo Obrigatório Vazio
**Objetivo**: Testar validação de campo obrigatório
**Passos**:
1. Acessar página de login
2. Deixar campo Usuário vazio
3. Clicar em "Entrar"

**Resultado Esperado**:
- Erro HTTP 400
- Mensagem: "O e-mail do usuário deve ser informado!"
- Redirecionamento para página de erro com stack trace

### 3. CENÁRIOS DE ACESSO NEGADO

#### 3.1 Usuário Sem Permissões
**Objetivo**: Verificar tratamento de usuário sem acesso
**Passos**:
1. Inserir "user@gmail.com"
2. Clicar em "Entrar"

**Resultado Esperado**:
- Redirecionamento para /unico/sem_atuacoes.jsp
- Mensagem: "Seu usuário não tem nenhum atuação no sistema"
- Link para encerrar sessão disponível

#### 3.2 Formato de Email Inválido
**Objetivo**: Testar validação de formato
**Passos**:
1. Inserir "invalid-email" (sem @)
2. Tentar submeter

**Resultado Esperado**:
- Não há validação client-side
- Campo aceita entrada inválida
- Validação apenas no servidor

### 4. CENÁRIOS DE INTERFACE

#### 4.1 Elementos Visuais
**Objetivo**: Verificar layout e elementos
**Verificações**:
- Logo "Único Digital" presente
- Campo com placeholder "Email" visível
- Botão "Entrar" acessível
- Layout responsivo

#### 4.2 Interações de Teclado
**Objetivo**: Testar acessibilidade
**Verificações**:
- Navegação por Tab funcional
- Enter submete formulário
- Foco adequado nos elementos

### 5. CENÁRIOS DE SEGURANÇA

#### 5.1 Injeção de Código
**Objetivo**: Verificar proteção contra ataques
**Teste**: Inserir "test@mpf.mp.br'; DROP TABLE users; --"
**Resultado Esperado**: Sistema deve tratar de forma segura

#### 5.2 Entrada Excessivamente Longa
**Objetivo**: Testar limites de entrada
**Teste**: String >1000 caracteres
**Resultado Esperado**: Tratamento adequado sem crash

### 6. CENÁRIOS DE NAVEGAÇÃO

#### 6.1 URLs Protegidas
**Objetivo**: Verificar controle de acesso
**Teste**: Acessar dashboard sem login
**Resultado Esperado**: Redirecionamento para login

#### 6.2 Botão Voltar do Navegador
**Objetivo**: Testar gerenciamento de sessão
**Resultado Esperado**: Estado consistente mantido

## Critérios de Aceitação

### ✅ Funcionalidade Core
- Login com credenciais válidas: 100% sucesso
- Redirecionamento correto pós-autenticação
- Validação de campos obrigatórios
- Tratamento de erros adequado

### ✅ Segurança
- Validações server-side robustas
- Proteção contra injeções básicas
- Controle de acesso por permissões
- Gerenciamento seguro de sessões

### ✅ Usabilidade
- Interface intuitiva e clara
- Mensagens de erro informativas
- Navegação consistente
- Suporte básico à acessibilidade

### ✅ Performance
- Tempo de resposta < 3 segundos
- Interface responsiva
- Sem vazamentos de recursos

## Observações Técnicas

- **Validação**: Apenas server-side, sem validação client-side
- **Domínios Aceitos**: Principalmente @mpf.mp.br
- **Resolução**: Interface otimizada para ≥ 992px
- **Autenticação**: OAuth2 com integração LDAP/AD

## Recomendações de Automação

1. **Priorizar**: Cenários 1.1, 2.1, 3.1 (críticos)
2. **Dados**: Manter base de emails de teste
3. **Ambiente**: Homologação estável
4. **Monitoramento**: Verificar disponibilidade do sistema
5. **Relatórios**: Screenshots para debug de falhas

---
**Documento gerado em**: 13 de outubro de 2025  
**Sistema testado**: Sistema Único - Homologação  
**Responsável**: Análise automatizada via Playwright