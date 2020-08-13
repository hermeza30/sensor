const express =require('express');
const app= express();
app.use(require('./sensor'));

module.exports=app;