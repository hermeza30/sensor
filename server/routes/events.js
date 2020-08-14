const { io } = require("../server");
const express = require("express");
const EventSensor = require("../models/event");
const app = express();

io.on("connection", (client) => {
  console.log("cliente conectado");

  //disconect
  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  //LISTEN EVENT TO RETURN LIST ALL EVENTS BY IDSENSOR
  client.on("listen", function (data) {
    returnEventsbyId(data).then((lista) => {
      io.emit("returnList", lista);
    });
  });
});
///FUNCTION RETURN EVENTS BY ID
function returnEventsbyId(id) {
  return new Promise((resolve, reject) => {
    EventSensor.find({ sensorid: id }, (err, event) => {
      if (err) {
        reject(err);
      }
      resolve(event);
    });
  });
}

//POST EVENT
app.post("/event", (req, res) => {
  let body = req.body;
  let ev = new EventSensor({
    sensorid: body.sensorid,
    createat: body.createat,
    value: body.value,
  });
  ev.save((err, evt) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok:true,
      evt
    });
  });
});

module.exports = app;
