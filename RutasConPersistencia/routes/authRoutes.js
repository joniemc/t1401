const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const cors = require('cors');
require('dotenv').config();


// Configuración de CORS específica para la ruta de login
const loginCorsOptions = {
  origin: 'http://localhost:4200', // Reemplaza con el origen permitido
  methods: ['POST'], // Solo permite el método POST
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
};

const router = express.Router();

router.options('/login', cors(loginCorsOptions));

router.post('/login', cors(loginCorsOptions), async (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM tr_usuario WHERE username = ? AND state = 'A'";
  pool.query(query, [username, password], async (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const user = results[0];

    // Comparar la contraseña proporcionada con la contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Autenticación exitosa', token });
  });
});

module.exports = router;