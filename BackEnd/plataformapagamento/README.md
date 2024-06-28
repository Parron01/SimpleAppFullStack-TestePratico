# Plataforma de Pagamento Simplificada

Este projeto é uma aplicação de exemplo para uma plataforma de pagamentos simplificada, desenvolvida como parte de um desafio técnico. A plataforma permite depósitos e transferências entre usuários, utilizando Java com Spring Framework.

## Funcionalidades

- **Usuários Comuns**: Podem enviar e receber transferências.
- **Lojistas**: Podem apenas receber transferências.
- **Validação de Saldos**: Confirmação de saldo antes das transferências.
- **Autenticação com JWT**: Segurança através de autenticação JWT.
- **Autorização por Tipo de Usuário**: Controle de acesso baseado em papéis (roles).

## Tecnologias Utilizadas

- **Linguagem**: Java 17
- **Framework**: Spring Framework (Spring Boot, Spring Security)
- **Banco de Dados**: PostgreSQL (utilizado via Docker Compose)
- **Ferramentas**: Docker, Maven, JUnit 5, Mockito, MockMVC
- **Documentação da API**: Swagger (Springdoc OpenAPI)

## Pré-requisitos

Para executar este projeto localmente, certifique-se de ter os seguintes pré-requisitos instalados:

- **Java Development Kit (JDK) 17**: Instalação adequada do JDK.
- **Docker**: Para executar o banco de dados PostgreSQL via Docker Compose.
- **PostgreSQL**: Alternativamente, pode usar um banco de dados PostgreSQL instalado localmente.

## Como Executar

1. **Clonar o Repositório**:
   ```sh
   git clone <URL_do_repositorio>
   cd nome_do_projeto
   ```

2. **Executar PostgreSQL com Docker Compose**:
    - Certifique-se de ter o Docker instalado e em execução.
    - No diretório raiz do projeto, execute:
      ```sh
      docker-compose up -d
      ```

3. **Configurar o Projeto**:
    - Importe o projeto na sua IDE como um projeto Maven.
    - Certifique-se de que as dependências do Maven sejam baixadas automaticamente.

4. **Executar a Aplicação**:
    - Execute a aplicação através da classe principal `PlataformapagamentoApplication.java`.

5. **Acessar a Documentação da API**:
    - Após iniciar o aplicativo, acesse a documentação da API em:
      ```
      http://localhost:8080/swagger-ui/index.html
      ```

## Testes

- Este projeto inclui testes unitários para as principais classes de serviço (Services) e controladores (Controllers).
- Utiliza JUnit 5, Mockito e MockMVC para garantir a qualidade e integridade do código.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para melhorias e novas funcionalidades.
