const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verificarToken = require('../middlewares/verificarToken');
require('dotenv').config();

const prisma = new PrismaClient();

// 🔐 LOGIN (gera token)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ error: 'Email e Senha obrigatorio'})
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário ou Senha incorretos' });

    const passwordConfere = await bcrypt.compare(password, user.password);
    if (!passwordConfere) return res.status(401).json({ error: 'Usuário ou Senha incorretos'});

    // Gerar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user.id, nome: user.nome, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar usuário
router.post('/', async (req, res) => {
    const { firstname, surname, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: { firstname, surname, email, password : hashedPassword },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar usuários
router.get('/', verificarToken, async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
// Listar por ID
router.get('/:id', verificarToken, async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});


// Atualizar usuário
router.put('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const { firstname, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { firstname, surname, email, password : hashedPassword },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// atualizar com Patch
router.patch('/:id', verificarToken, async (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: req.body
  });
  res.json(updatedUser);
});


// Deletar usuário
router.delete('/:id', verificarToken , async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
