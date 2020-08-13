const express =require('express');
const app= express();
app.use(require('./sensor'));
app.use(require('./events'));

module.exports=app;