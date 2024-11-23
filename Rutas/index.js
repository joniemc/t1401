const express = require('express');
const app = express();
const PORT = 3000;

const productos = [{id:1,nombre:'Botella de Agua',precio:'$2',cantidad:'1'},{id:2,nombre:'Llavero',precio:'$6',cantidad:'2'}];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express.js!');
});

// Filtro por ID
app.get('/productos/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    
    let producto = productos.find(us => us.id === id);

    if(producto){
        res.json({mensaje:'Ok',producto});
    }else{
        res.status(400).json({mensaje:'producto no encontrado'});
    }
});

//Devolver todos los productos en la base
app.get('/productos', (req,res)=>{
    res.json(productos);
});

app.post('/productos', (req,res)=>{
    let producto = req.body;
    productos.push(producto);
    res.status(201).json({mensaje:'Registro exitoso',producto});
});

app.put('/productos', (req,res)=>{
    
    let producto = req.body;
    let exists = false;

    productos.forEach(prod => {
        if(prod.id === producto.id){
            exists = true;
            prod.nombre = producto.nombre;
            prod.precio = producto.precio;
            prod.cantidad = producto.cantidad;
        }
    });

    if(exists){
        res.status(200).json({mensaje: 'Registro actualizado', producto});
    }else{
        res.status(400).json({mensaje: 'Registro no encontrado'});
    }
    
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
