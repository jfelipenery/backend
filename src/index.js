const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('../src/routes/user');
const categoriesRoutes = require('../src/routes/categories');
const produtosRoutes = require('../src/routes/produtos');
const opcoes_de_produtosRoutes = require('../src/routes/opcoes_de_produtos');

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/opcoes_de_produtos', opcoes_de_produtosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
