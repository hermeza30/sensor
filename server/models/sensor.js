const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let sensorSchema=new Schema({

    name:{type:String,required:[true, "The name is required"]},
    lat:{type:Number,required:[true, "The latitude is required"]},
    long:{type:Number,required:[true, "The longitude is required"]},
    minval:{type:Number,required:[true, "The minval is required"]},
    maxval:{type:Number,required:[true, "The maxval is required"]},
    active:{type:Boolean,default:true}
});

module.exports=mongoose.model('Sensor',sensorSchema);