# Plataforma de Pagamento - Frontend

Este projeto é a interface de usuário para a Plataforma de Pagamentos Simplificada, desenvolvida como parte de um desafio técnico. A aplicação permite visualizar usuários, realizar e acompanhar transferências entre usuários comuns e lojistas.

## Funcionalidades

- **Autenticação de Usuários**: Sistema de login seguro com JWT.
- **Cadastro de Usuários**: Registro de novos usuários comuns e lojistas.
- **Listagem de Usuários**: Visualização de todos os usuários cadastrados no sistema.
- **Transações de Pagamento**: Realização de transferências entre usuários.
- **Visualização de Transações**: Acompanhamento de todas as transações e transações pessoais.
- **Interface Responsiva**: Design adaptado para diferentes dispositivos.
- **Validação por Tipo de Usuário**: Lojistas podem apenas receber, não enviar dinheiro.

## Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: React (Create React App)
- **Estilização**: Styled Components
- **Roteamento**: React Router DOM
- **Requisições HTTP**: Axios
- **Notificações**: React Toastify
- **Modal**: React Modal
- **Gerenciamento de Estado**: Context API
- **Autenticação**: JWT (armazenado em cookies)

## Pré-requisitos

Para executar este projeto localmente, certifique-se de ter os seguintes pré-requisitos instalados:

- **Node.js**: Versão 14.0.0 ou superior
- **npm** ou **yarn**: Gerenciadores de pacotes para Node.js

## Como Executar

1. **Clonar o Repositório**:
   ```sh
   git clone https://github.com/Parron01/SimpleAppFullStack-TestePratico.git
   cd FrontEnd/frontend-plataformapagamento
   ```

2. **Instalar Dependências**:
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Configurar a API**:
   - **Importante**: Antes de executar o projeto, você precisa configurar a URL da API.
   - Abra o arquivo `src/services/axios.ts` e altere a baseURL para o endereço onde o backend está rodando:
     ```typescript
     export const api = axios.create({
        baseURL: 'http://localhost:8080', // Altere para sua URL local
     });
     ```

4. **Iniciar a Aplicação**:
   ```sh
   npm start
   # ou
   yarn start
   ```
   - O aplicativo será executado em modo de desenvolvimento.
   - Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

5. **Construir para Produção**:
   ```sh
   npm run build
   # ou
   yarn build
   ```
   - Cria a versão de produção otimizada na pasta `build`.

## Estrutura do Projeto

- **src/components/**: Componentes React reutilizáveis
- **src/hooks/**: Custom hooks para lógica compartilhada
- **src/styles/**: Estilos globais e temas
- **src/services/**: Serviços para comunicação com a API

## Recursos Adicionais

- **Tema Personalizado**: Esquema de cores consistente através da aplicação
- **Feedback Visual**: Notificações e validações para ações do usuário
- **Tabelas Interativas**: Visualização clara de usuários e transações

