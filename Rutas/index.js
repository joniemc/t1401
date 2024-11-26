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

app.post('/productos', (req, res)=>{
    const producto = req.body;
    const sql ='insert into tr_producto (nombre,precio,codigo_fabricante) values(?,?,?)';

    if(!producto.nombre || !producto.precio || !producto.codigo_fabricante){
        return res.status(400).json({error:'Todos los campos son obligatorios'});
    }

    conexion.query(sql, [producto.nombre,producto.precio,producto.codigo_fabricante],(err, resultado)=>{
        if(err){
            res.status(500).json({error:'Error al agregar el producto'});
        }else{
            res.status(201).json({mesaje:'Producto agregado',codigo: resultado.insertId});
        }
    });
});

app.put('/productos', (req, res)=>{
    const producto = req.body;
    const sql ='update tr_producto set nombre=?,precio=?,codigo_fabricante=? where codigo = ?';

    if(!producto.nombre || !producto.precio || !producto.codigo_fabricante || !producto.codigo){
        return res.status(400).json({error:'Todos los campos son obligatorios'});
    }

    conexion.query(sql, [producto.nombre,producto.precio,producto.codigo_fabricante, producto.codigo],(err, resultado)=>{
        if(err){
            res.status(500).json({error:'Error al actualizar el producto'});
        }else if(resultado.affectedRows === 0){
            res.status(404).json({mensaje:'Producto no encontrado'});
        }else{
            res.status(200).json({mesaje:'Producto actualizado',producto});
        }
    });
});

app.delete('/productos/:codigo', (req, res)=>{
    const {codigo} = req.params;
    const sql ='delete from tr_producto where codigo=?';

    if(!codigo){
        return res.status(400).json({error:'El parametro código es requerido'});
    }

    conexion.query(sql, [codigo],(err, resultado)=>{
        if(err){
            res.status(500).json({error:'Error al eliminar el producto'});
        }else{
            res.status(200).json({mesaje:'Producto eliminado'});
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
