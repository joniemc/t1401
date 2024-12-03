const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();
require('dotenv').config();

router.post('/login', (req, res) =>{
    const {username, password} = req.body;

    const sql = "select * from tr_usuario where username=? and password=? and state='A'"

    pool.query(sql, [username,password], (err, resultado)=>{
        if(err){
            return res.status(500).json({mensaje: 'Error ene l servidor'});
        }

        if(resultado.length === 0){
            return res.status(401).json({mensaje: 'Credenciales inválidas'});
        }

        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({mensaje:'Autenticación exitosa',token});
    });
    
});

module.exports = router;