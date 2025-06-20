# 📦 Projeto Backend com Prisma

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-lightgrey?logo=prisma)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)

---

Este projeto é um backend construído com **Node.js**, **Express** e **Prisma ORM**, utilizando um banco de dados relacional **MySQL**. Ele tem como objetivo fornecer uma estrutura escalável e organizada para o desenvolvimento de APIs RESTful.

---

## 🧱 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript (opcional)](https://www.typescriptlang.org/)
- Banco de Dados: MySQL (ou PostgreSQL, SQLite)

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/jfelipenery/backend.git
cd backend
Instale as dependências:

bash
Copy
Edit
npm install
🛠️ Configurando o Banco de Dados
Edite o arquivo .env com a URL de conexão do banco de dados MySQL:

env
Copy
Edit
DATABASE_URL="mysql://root:123456@localhost:3306/backend"
🧩 Definição do Modelo (schema.prisma)
prisma
Copy
Edit
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int    @id @default(autoincrement())
  firstname String
  surname   String
  email     String @unique
  password  String
}

model Categories {
  id          Int     @id @default(autoincrement())
  name        String
  slug        String
  use_in_menu Boolean? @unique
}

model Produtos {
  id                  Int     @id @default(autoincrement())
  enabled             Boolean
  name                String
  slug                String
  use_in_menu         Boolean? @unique
  stock               Int
  description         String
  price               Float
  price_with_discount Float
}

model OpcoesDeProdutos {
  id         Int    @id @default(autoincrement())
  product_id Int
  title      String
  shape      String
  radius     Int
  type       String
  values     String
}
🧱 Criando a Base de Dados
Para gerar a base e aplicar as migrações:

bash
Copy
Edit
npx prisma migrate dev --name init
Esse comando:

Cria as tabelas no banco de dados;

Gera os arquivos de migração;

Atualiza o Prisma Client para refletir os modelos.

✏️ Uso no Código
js
Copy
Edit
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/user');

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
📂 Estrutura de Pastas
bash
Copy
Edit
├── prisma/
│   └── schema.prisma
├── src/
│   ├── categorias/
│   ├── opcoes_de_produtos/
│   ├── users/
│   └── produtos/
├── routes/
│   └── user.js
├── index.js
├── .env
├── package.json
└── README.md
📌 Considerações Finais
Essa API foi desenvolvida como parte do projeto de backend do Curso Geração Tech, e foi construída pelos alunos:

João Felipe

David Michael

Karol Danttas

Lannylton

Foi um grande aprendizado fazer parte deste projeto, aplicando conceitos reais de desenvolvimento backend com foco em boas práticas, organização e trabalho em equipe.

📃 Licença
Este projeto está licenciado sob os termos da licença MIT.
