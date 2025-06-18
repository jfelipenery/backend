const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar Opções dos produtos
router.post('/', async (req, res) => {
    const { product_id, title, shape, radius, type, values } = req.body;
    try {
        const opcoesProduto = await prisma.opcoes_de_produtos.create({
            data: { product_id, title, shape, radius, type, values }
        });
        res.status(201).json(opcoesProduto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar usuários
router.get('/', async (req, res) => {
    const opcoesProduto = await prisma.opcoes_de_produtos.findMany();
    res.json(opcoesProduto);
});
// Listar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const opcoesProduto = await prisma.opcoes_de_produtos.findUnique({ where: { id } });
  if (!opcoesProduto) return res.status(404).json({ error: 'Opções do produto não encontrado' });
  res.json(opcoesProduto);
});


// Atualizar usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product_id, title, shape, radius, type, values } = req.body;
    try {
        const opcoesProduto = await prisma.opcoes_de_produtos.update({
            where: { id: parseInt(id) },
            data: { product_id, title, shape, radius, type, values }
        });
        res.json(opcoesProduto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedOpcoesProduto = await prisma.opcoes_de_produtos.update({
    where: { id },
    data: req.body
  });
  res.json(updatedOpcoesProduto);
});


// Deletar usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.opcoes_de_produtos.delete({
            where: { id: parseInt(id) }
        });
        return res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
