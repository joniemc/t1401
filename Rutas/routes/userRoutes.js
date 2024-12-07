const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
// const cors = require('cors'); // importar solamente si se quiere configurar permisos individuales
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//este bloque de configuración es solamente para proporcionar los cords a un api especifico
// const loginOptionsConfig = {
//     origin: 'http://localhost:4200',
//     methots: ['POST'],
//     allowedHeaders: ['Content-Type','Authorization']
//   };

// router.options('/usuarios',cors(loginOptionsConfig));

router.get('/usuarios', authMiddleware, (req,res)=>{
    
    //conexión a base de datos y su logica de negocio
    res.status(200).json({mensaje:'Todos los usuarios'});
});

// Esta linea seria la que se utiliza si quiero que esta api tenga habilitados los permisos cors
// router.post('/usuarios', cors(loginOptionsConfig), async (req,res)=>{
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