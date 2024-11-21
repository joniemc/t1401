const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

const usuarios = [{id:1,nombre:'Juan Gomez',email:'jgomez@patito.com',telefono:'9990-0009'},{id:2,nombre:'Pedro Gonzalez',email:'pgonzalez@patito.com',telefono:'9991-0009'}];

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express.js!');
});

// Filtro por ID
app.get('/usuarios/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    
    let usuario = usuarios.find(us => us.id === id);

    if(usuario){
        res.json({mensaje:'Ok',usuario});
    }else{
        res.status(400).json({mensaje:'usuario no encontrado'});
    }
});

//Devolver todos los usuarios en la base
app.get('/usuarios', (req,res)=>{
    res.json(usuarios);
});

app.get('/usuarios-nextid', (req,res)=>{
    let lastUser = usuarios[usuarios.length-1]
    res.json(lastUser.id + 1);
});

app.post('/usuarios', (req,res)=>{
    let usuario = req.body;
    usuarios.push(usuario);
    res.status(201).json({mensaje:'Registro exitoso',usuario});
});

app.delete('/usuarios/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    let index = usuarios.findIndex(us => us.id === id);
    usuarios.splice(index,1);
    res.status(200).json({mensaje:'Registro eliminado'});
});

app.put('/usuarios', (req,res)=>{
    let usuario = req.body;
    let exists = false;
    usuarios.forEach(user => {
        if(user.id === usuario.id){
            exists = true;
            user.nombre = usuario.nombre;
            user.email = usuario.email;
            user.telefono = usuario.telefono;
        }
    });

    if(exists){
        res.status(200).json({mensaje: 'Registro actualizado', usuario});
    }else{
        res.status(400).json({mensaje: 'Registro no encontrado'});
    }
    
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
