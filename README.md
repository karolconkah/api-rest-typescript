API REST - Node.js + TypeScript

Sobre o projeto

Esta é uma API REST desenvolvida com Node.js e TypeScript para fins de aprendizado e aprofundamento em backend.

O projeto foi desenvolvido com base em estudos no curso de API REST do canal Lucas Souza Dev, porém implementado e estruturado de forma independente.

Conceitos abordados

Endpoints

Controllers

Banco de dados SQL

Query Builder

Migrations

Seeds

Autenticação com e-mail e senha

Criptografia de senha

Login de usuários

Geração e validação de tokens JWT

Validação de dados

Paginação

Filtros de consulta

Testes automatizados

Boas práticas e princípios de Clean Code

Integração

Esta API não possui interface neste repositório.

O frontend que consome esta API está disponível no repositório:

karolconkah/frontend-react

Como rodar o projeto
Pré-requisitos

Node.js instalado

Yarn instalado

1. Clone o seu repositório
git clone https://github.com/karolconkah/api-rest-typescript.git
2. Acesse a pasta do projeto
cd api-rest-typescript
3. Instale as dependências
yarn install
4. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

PORT=3333
NODE_ENV=dev
IS_LOCALHOST=true
ENABLED_CORS=http://localhost:3000
JWT_SECRET=uma_string_segura
5. Rode o projeto
yarn start

Servidor rodando em:

http://localhost:3333
Autora

Karoline Vieira Neves
