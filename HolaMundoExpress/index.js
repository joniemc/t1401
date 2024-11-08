const express = require('express');
const app = express();
const PORT = 3000;

// Ruta básica
app.get('/', (req, res) => { 
  res.send('¡Hola Mundo desde Express.js!');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});