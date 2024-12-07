const express = require('express');
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//Devolver todos los productos en la base
router.get('/productos', authMiddleware, (req,res)=>{
    const sql = 'select nombre, precio, codigo_fabricante, codigo from tr_producto';
    pool.query(sql, (err, resultado) =>{
        if(err){
            res.status(500).json({error:'Error al obtener los datos del producto'});
        }else{
            res.json({mensaje:'Solicitud exitosa', resultado});
        }
    });
});

router.post('/productos', authMiddleware, (req, res)=>{
    const producto = req.body;
    const sql ='insert into tr_producto (nombre,precio,codigo_fabricante) values(?,?,?)';

    if(!producto.nombre || !producto.precio || !producto.codigo_fabricante){
        return res.status(400).json({error:'Todos los campos son obligatorios'});
    }

    pool.query(sql, [producto.nombre,producto.precio,producto.codigo_fabricante],(err, resultado)=>{
        if(err){
            res.status(500).json({error:'Error al agregar el producto'});
        }else{
            res.status(201).json({mesaje:'Producto agregado',codigo: resultado.insertId});
        }
    });
});

router.put('/productos', authMiddleware, (req, res)=>{
    const producto = req.body;
    const sql ='update tr_producto set nombre=?,precio=?,codigo_fabricante=? where codigo = ?';

    if(!producto.nombre || !producto.precio || !producto.codigo_fabricante || !producto.codigo){
        return res.status(400).json({error:'Todos los campos son obligatorios'});
    }

    pool.query(sql, [producto.nombre,producto.precio,producto.codigo_fabricante, producto.codigo],(err, resultado)=>{
        if(err){
            res.status(500).json({error:'Error al actualizar el producto'});
        }else if(resultado.affectedRows === 0){
            res.status(404).json({mensaje:'Producto no encontrado'});
        }else{
            res.status(200).json({mesaje:'Producto actualizado',producto});
        }
    });
});

router.delete('/productos/:codigo', authMiddleware, (req, res)=>{
    const {codigo} = req.params;
    const sql ='delete from tr_producto where codigo=?';

    if(!codigo){
        return res.status(400).json({error:'El parametro código es requerido'});
    }

    pool.query(sql, [codigo],(err, resultado)=>{
        if(err){
            res.status(500).json({error:'Error al eliminar el producto'});
        }else{
            res.status(200).json({mesaje:'Producto eliminado'});
        }
    });
});

module.exports = router;