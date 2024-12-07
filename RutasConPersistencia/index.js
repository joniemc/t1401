const express = require('express');
const fs = require('fs');
const app = express();

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;

function leerUsuarios(){
    const data = fs.readFileSync('Usuarios.json','utf-8');
    return JSON.parse(data);
}

function guardarUsuarios(usuarios){
    fs.writeFileSync('Usuarios.json',JSON.stringify(usuarios, null, 2));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express.js!');
});

// Filtro por ID
// app.get('/usuarios/:id',(req,res) =>{
//     const id = parseInt(req.params.id);
    
//     let usuario = usuarios.find(us => us.id === id);

//     if(usuario){
//         res.json({mensaje:'Ok',usuario});
//     }else{
//         res.status(400).json({mensaje:'usuario no encontrado'});
//     }
// });

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/user', userRoutes); // Rutas protegidas

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err.message);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.post('/usuarios', (req,res)=>{
    let usuario = req.body;
    const usuarios = leerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
    res.status(201).json({mensaje:'Registro exitoso',usuario});
});

// app.put('/usuarios', (req,res)=>{
    
//     let usuario = req.body;
//     let exists = false;

//     usuarios.forEach(user => {
//         if(user.id === usuario.id){
//             exists = true;
//             user.nombre = usuario.nombre;
//             user.email = usuario.email;
//             user.telefono = usuario.telefono;
//         }
//     });

//     if(exists){
//         res.status(200).json({mensaje: 'Registro actualizado', usuario});
//     }else{
//         res.status(400).json({mensaje: 'Registro no encontrado'});
//     }
    
// });

app.delete('/usuarios/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const usuarios = leerUsuarios();

    const filtrarUsuarios = usuarios.filter(u => u.id !== id);

    if(filtrarUsuarios.length !== usuarios.length){
        guardarUsuarios(filtrarUsuarios);
        res.status(201).json({mensaje: 'Usuario eliminado'});
    }
    else{
        res.status(400).json({mensaje: 'Usuario no encontrado'});
    }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
