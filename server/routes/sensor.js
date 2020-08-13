const express = require('express');
const bcrypt = require("bcrypt");
const { io } = require('../server');
const app = express();


io.on('connection',(client)=>{
    console.log('cliente conectado');
    client.on('disconnect',()=>{
        console.log('cliente desconectado');

    });
});
app.get('/sensor', (req, res) => {
    res.json('Conectados a sensor')
});


module.exports = app;