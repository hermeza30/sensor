const { io } = require("../server");
const express = require("express");
const EventSensor = require("../models/event");
const app = express();

io.on("connection", (scoket) => {
  console.log("cliente conectado");
  scoket.on("disconnect", () => {
    console.log("cliente desconectado");
  });
  scoket.on("createEvent", function(data,callback)  {

    // createEvent(data).then(id=>{
    //     returnListbyId(id).then(evnts=>callback(evnts));
    // });

  });
//   client.emit("returnListEvents", function(callback)  {

//     eventList().then(list=>{
//         console.log(list)
//         callback(list);
//     });
//   });
scoket.emit('returnListEvents',[{id:222,precio:"2222"},{id:222,precio:"2222"}]);
});
function createEvent(data) {
  return new Promise((resolve, reject) => {
    let ev = new EventSensor({
      sensorid: data.sensorId,
      createat: data.createat,
      value: data.value,
    });
    
    ev.save((err, evt) => {
        if (err) {
           reject(err);
          }
        resolve(evt.sensorid);
    });
  });
}
function returnListbyId(id){
    console.log('entrando a la busqueda',id);
    return new Promise((resolve,reject)=>{
        EventSensor.find({sensorid:id},(err,event)=>{
            if (err) {
                reject(err);
               }
               console.log(event);
               resolve(event);
        });
    });
}
function eventList(){
    return new Promise((resolve,reject)=>{
        EventSensor.find((err,event)=>{
            if (err) {
                reject(err);
               }
               console.log('Retornando',event);
               resolve(event);
        });
    });
}
app.get('/events',(req,res)=>{
    EventSensor.find((err,event)=>{
        if (err) {
            // reject(err);
           }
           res.status(200).json({
            ok:true,
            event
           });
    });
})

module.exports = app;
