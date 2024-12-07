const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../config/db');

const router = express.Router();

// Ruta GET /usuarios (protegida)
router.get('/usuarios', authMiddleware, (req, res) => {
  const query = 'SELECT codigo, username FROM tr_usuario';
  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
    }
    res.json({ mensaje: 'Usuarios obtenidos con éxito', usuarios: results });
  });
});

module.exports = router;
