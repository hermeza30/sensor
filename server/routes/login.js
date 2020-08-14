const express = require("express");
const bcrypt = require("bcrypt");
const Sensor = require("../models/sensor.js");
const jwt=require('jsonwebtoken');
const app = express();


app.get('/login',(req,res)=>{
  let usuariodb={nombre:"usuario1",password:"123"};
  let token=jwt.sign(
    {usuario:usuariodb}
  ,process.env.SEED,{expiresIn:60*60*24*30});
   res.status(200).json({
    usuariodb,
    token
  });
});
module.exports = app;
