const express = require("express");
const Sensor = require("../models/sensor.js");
const {verifyToken}=require('../middleware/verifyToken');
const app = express();



app.get("/sensor", (req, res) => {
  Sensor.find((err, sensor) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      sensor,
    });
  });
});
app.get("/sensor/:id", (req, res) => {
  let id = req.params.id;
  Sensor.findById(id, (err, sensor) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      sensor,
    });
  });
});
app.post("/sensor", (req, res) => {
  let body = req.body;
  let sensor = new Sensor({
    name: body.name,
    lat: body.lat,
    long: body.long,
    minval: body.minval,
    maxval: body.maxval,
    active: body.active,
  });

  sensor.save((err, sensorsave) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: err,
        mensaje: "Error to save sensor",
      });
    }
    res.status(201).json({
      ok: true,
      sensorsave,
    });
  });
});
app.put("/sensor/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let sensorupdate = new Sensor({
    name: body.name,
    lat: body.lat,
    long: body.long,
    minval: body.minval,
    maxval: body.maxval,
    active: body.active,
  });

  Sensor.findById(id, (err, sensor) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: err,
        mensaje: "Error to find sensor",
      });
    }
    if (!sensor) {
      return res.status(500).json({
        ok: false,
        err: err,
        mensaje: "Sensor not found.",
      });
    }
    sensor.name = sensorupdate.name;
    sensor.lat = sensorupdate.lat;
    sensor.long = sensorupdate.long;
    sensor.minval = sensorupdate.minval;
    sensor.maxval = sensorupdate.maxval;
    sensor.active = sensorupdate.active;

    sensor.save((err, sensorsave) => {
        if (err) {
            return res.status(500).json({
              ok: false,
              err: err,
              mensaje: "Error to update sensor",
            });
          }
      res.status(201).json({
        ok: true,
        sensorsave,
      });
    });
  });
});

app.delete("/sensor/:id",verifyToken, (req, res) => {
    let id = req.params.id;

    Sensor.findByIdAndDelete(id, (err, sensor) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err: err,
          mensaje: "Error to delete sensor",
        });
      }
      if (!sensor) {
        return res.status(404).json({
          ok: false,
          err: err,
          mensaje: "Sensor not found.",
        });
      }
      res.status(201).json({
        ok: true,
        sensor,
      });
    });
  });
module.exports = app;
