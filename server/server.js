require('./config/config');
const express=require('express');
const bodyparser=require('body-parser');
const socketIO=require('socket.io');
const http=require('http');
const mongoose=require('mongoose');
const app=express();
const path=require('path');
let server=http.createServer(app);
//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });
// parse application/json
app.use(bodyparser.json());
//carpeta publica
app.use(express.static(path.resolve(__dirname+'/../public')));
// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);


app.use(require('./routes/index'));
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.URLDB,(err,res)=>{
    if(err)throw err;
    console.log("Base de datos ONLINE")
});
server.listen(process.env.PORT,()=>{
    console.log("Escuchando puerto 3000")
});