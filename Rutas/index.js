const express = require('express');
const app = express();
const mysql = require('mysql2');

const cors = require('cors');
const PORT = 3001;

const productos = [{id:1,nombre:'Botella de Agua',precio:'$2',cantidad:'1'},{id:2,nombre:'Llavero',precio:'$6',cantidad:'2'}];

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'db_fabricantes'
});

conexion.connect((err) => {
    if(err){
        console.error('Error de conexión a la base de datos',err);
    }else{
        console.log('Conexión exitosa...');
    }
});

app.use(express.json());
app.use(cors());

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
    const sql = 'select nombre, precio, codigo_fabricante, codigo from tr_producto';
    conexion.query(sql, (err, resultado) =>{
        if(err){
            res.status(500).json({error:'Error al obtener los datos del producto'});
        }else{
            res.json(resultado);
        }
    });
    
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
