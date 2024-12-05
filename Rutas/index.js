const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

//Importando Modulos Locales
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 3000;

//Configuraciones generales
app.use(express.json());
app.use(cors());

//Configuración de Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error global:', err.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
