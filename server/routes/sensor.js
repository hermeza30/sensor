const express = require('express');
const bcrypt = require("bcrypt");
const app = express();


app.get('/sensor', (req, res) => {
    res.json('Conectados a sensor')
});


module.exports = app;