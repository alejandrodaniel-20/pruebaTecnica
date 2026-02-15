const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sequelize, User, House } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware de Autenticación [cite: 68]
const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) { res.status(400).json({ error: 'Token no válido' }); }
};

// --- RUTAS DE AUTENTICACIÓN [cite: 53] ---
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    res.status(400).json({ error: e.name === 'SequelizeUniqueConstraintError' ? 'Email ya registrado' : 'Error en el registro' });
  }
});

app.post('/auth/login', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET); // [cite: 14]
    res.json({ token, user: { id: user.id, name: user.name } });
  } else { res.status(401).json({ error: 'Credenciales inválidas' }); }
});

// --- RUTAS DE INMUEBLES [cite: 59] ---
app.get('/houses', auth, async (req, res) => {
  const { status } = req.query; // Para filtrado [cite: 23]
  const where = status ? { status } : {};
  const houses = await House.findAll({ where, include: User });
  res.json(houses);
});

app.post('/houses', auth, async (req, res) => {
  const { address, price } = req.body;
  if (!address || price == null || price === '') {
    return res.status(400).json({ error: 'Dirección y precio son obligatorios' });
  }
  if (isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({ error: 'Precio debe ser un número válido' });
  }
  try {
    const house = await House.create({ address, price: Number(price), status: req.body.status || 'disponible', sellerId: req.user.id });
    res.json(house);
  } catch (e) {
    res.status(400).json({ error: 'Error al crear inmueble' });
  }
});

app.get('/houses/:id', auth, async (req, res) => {
  const house = await House.findByPk(req.params.id, { include: User });
  if (!house) return res.status(404).json({ error: 'Inmueble no encontrado' });
  res.json(house);
});

app.put('/houses/:id', auth, async (req, res) => {
  const house = await House.findByPk(req.params.id);
  if (!house) return res.status(404).json({ error: 'Inmueble no encontrado' });
  const { address, price, status } = req.body;
  if (address !== undefined) house.address = address;
  if (price !== undefined) house.price = price;
  if (status !== undefined) house.status = status;
  await house.save();
  res.json(house);
});

app.delete('/houses/:id', auth, async (req, res) => {
  const house = await House.findByPk(req.params.id);
  if (!house) return res.status(404).json({ error: 'Inmueble no encontrado' });
  await house.destroy();
  res.json({ message: 'Inmueble eliminado' });
});

// --- RUTAS DE USUARIOS (requieren auth) ---
app.get('/users', auth, async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'isActive', 'createdAt'] });
  res.json(users);
});

app.put('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const { name, email, password, isActive } = req.body;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (isActive !== undefined) user.isActive = isActive;
    await user.save();
    res.json({ id: user.id, name: user.name, email: user.email, isActive: user.isActive });
  } catch (e) {
    res.status(400).json({ error: e.name === 'SequelizeUniqueConstraintError' ? 'Email ya en uso' : 'Error al actualizar' });
  }
});

app.delete('/users/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  await user.destroy();
  res.json({ message: 'Usuario eliminado' });
});

// Sincronizar y Arrancar [cite: 33]
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor en puerto 3000'));
});