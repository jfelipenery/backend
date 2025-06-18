const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar Produtos
router.post('/', async (req, res) => {
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;
    try {
        const produtos = await prisma.produtos.create({
            data: { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount }
        });
        res.status(201).json(produtos);
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
});

// Listar Produtos
router.get('/', async (req, res) => {
    const produtos = await prisma.produtos.findMany();
    res.json(produtos);
});
// Listar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const produtos = await prisma.produtos.findUnique({ where: { id } });
  if (!produtos) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(produtos);
});


// Atualizar Produtos
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;
    try {
        const produtos = await prisma.produtos.update({
            where: { id: parseInt(id) },
            data: { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount }
        });
        res.json(produtos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedProdutos = await prisma.produtos.update({
    where: { id },
    data: req.body
  });
  res.json(updatedProdutos);
});


// Deletar Produtos
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.produtos.delete({
            where: { id: parseInt(id) }
        });
        return res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
