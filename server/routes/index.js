const express =require('express');
const app= express();
app.use(require('./sensor'));
app.use(require('./events'));
app.use(require('./login'));


module.exports=app;