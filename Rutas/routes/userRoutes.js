const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/usuarios', authMiddleware, (req,res)=>{
    
    //conexión a base de datos y su logica de negocio
    res.status(200).json({mensaje:'Todos los usuarios'});
});

router.post('/usuarios', async (req,res)=>{
    const {username,plainPassword} = req.body;

    const sql = "INSERT INTO tr_usuario (username, password, state) values (?,?,'A')";

    if(!username || !plainPassword){
        return res.status(400).json({error:'Todos los campos son obligatorios'});
    }

    const saltRound = 10;
    const password = await bcrypt.hash(plainPassword, saltRound);

    pool.query(sql, [username,password],(err, resultado)=>{
        if(err){
            return res.status(500).json({error:'Error al agregar el usuario'});
        }else{
            return res.status(201).json({mesaje:'Usuario agregado',codigo: resultado.insertId});
        }
    });
});

router.put('/usuarios', authMiddleware, (req,res)=>{

    //conexión a base de datos y su logica de negocio
    res.status(200).json({mensaje: 'Registro actualizado', producto});
    
});

router.delete('/usuarios/:id', authMiddleware, (req,res)=>{

    //conexión a base de datos y su logica de negocio
    res.status(200).json({mensaje:'Registro eliminado'});
});

module.exports = router;