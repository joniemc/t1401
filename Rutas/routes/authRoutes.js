const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();
require('dotenv').config();

router.post('/login', async (req, res) =>{
    const {username, password} = req.body;

    const sql = "select * from tr_usuario where username=? and state='A'"

    console.log(username+' ha intentado iniciar sesión');
    pool.query(sql, [username,password], async (err, resultado)=>{
        if(err){
            return res.status(500).json({mensaje: 'Error en el servidor'});
        }

        if(resultado.length === 0){
            return res.status(401).json({mensaje: 'Credenciales inválidas'});
        }

        const usuario = resultado[0];

        const isMatch = await bcrypt.compare(password, usuario.password);

        if(!isMatch){
            return res.status(401).json({mensaje: 'Credenciales inválidas'});
        }
        
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({mensaje:'Autenticación exitosa',token});
    });
    
});

module.exports = router;