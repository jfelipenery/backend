const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar categorias
router.post('/', async (req, res) => {
    const { name, slug, use_in_menu } = req.body;
    try {
        const categories = await prisma.categories.create({
            data: { name, slug, use_in_menu }
        });
        res.status(201).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar categorias
router.get('/', async (req, res) => {
    const categories = await prisma.categories.findMany();
    res.json(categories);
});
// Listar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const categories = await prisma.categories.findUnique({ where: { id } });
  if (!categories) return res.status(404).json({ error: 'Categoria não encontrada' });
  res.json(categories);
});


// Atualizar categoria
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;
    try {
        const categories = await prisma.categories.update({
            where: { id: parseInt(id) },
            data: { name, slug, use_in_menu }
        });
        res.json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedCategories = await prisma.categories.update({
    where: { id },
    data: req.body
  });
  res.json(updatedCategories);
});


// Deletar usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.categories.delete({
            where: { id: parseInt(id) }
        });
        return res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
