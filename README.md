
# Sistema de Controle de Estoque do Mercadinho

## Sobre o projeto

Este projeto foi desenvolvido como parte de uma atividade acadêmica, com o objetivo de criar um sistema de controle de estoque para um mercadinho de bairro.

O sistema permite organizar os produtos cadastrados, acompanhar a movimentação de mercadorias e identificar itens que precisam de reposição.

## Funcionalidades

- Cadastro de produtos com nome, preço e quantidade.
- Edição e exclusão de produtos.
- Controle de entrada e saída de mercadorias.
- Consulta da quantidade disponível em estoque.
- Alertas de produtos com estoque abaixo do mínimo.
- Relatório de produtos que precisam de reposição.
- Painel com informações gerais do estoque.
- Armazenamento local dos dados no navegador.

## Tecnologias utilizadas

- Angular 22
- TypeScript
- HTML
- CSS
- LocalStorage

## Como executar o projeto

### 1. Requisitos

Ter o Node.js e o npm instalados no computador.

### 2. Instalar as dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

### 3. Iniciar o sistema

```bash
npm start
```

Depois, abra no navegador:

http://localhost:4200

## Objetivo do MVP

O MVP (Produto Mínimo Viável) busca facilitar o controle de estoque de pequenos estabelecimentos comerciais.

O sistema foi pensado para auxiliar o responsável pelo mercadinho no cadastro de produtos, no acompanhamento das quantidades disponíveis e na identificação de necessidades de reposição.

## Público-alvo

Proprietários e funcionários de pequenos mercadinhos e mercearias que precisam organizar e acompanhar seus estoques.

## Armazenamento dos dados

Os dados são armazenados no LocalStorage do navegador.

Isso permite manter os produtos cadastrados ao atualizar a página, mas não substitui um banco de dados com backup e sincronização entre dispositivos.

## Melhorias futuras

- Autenticação de usuários.
- Integração com banco de dados.
- Exportação de relatórios.
- Histórico detalhado das movimentações.
- Acesso ao estoque em diferentes dispositivos.

## Autor

Abel Henrique

Projeto acadêmico de desenvolvimento de software.
