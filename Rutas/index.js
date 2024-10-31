const express = require('express');
const app = express();
const PORT = 3000;

const usuarios = [{id:1,nombre:'Juan Gomez',email:'jgomez@patito.com',telefono:'9990-0009'},{id:2,nombre:'Pedro Gonzalez',email:'pgonzalez@patito.com',telefono:'9991-0009'}];

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express.js!');
});

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

app.post('/usuarios', (req,res)=>{
    res.send('¡Usuarios sin filtro desde el post!');
});

app.put('/usuarios', (req,res)=>{
    res.send('¡Actualización desde el put!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
