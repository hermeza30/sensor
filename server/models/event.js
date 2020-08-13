const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let eventSchema=new Schema({

    sensorid:{type:Schema.Types.ObjectId,ref:'Sensor'},
    createat:{type:String},
    value:{type:String,required:[true, "The value of sensor is required"]}
});

module.exports=mongoose.model('EventSensor',eventSchema);