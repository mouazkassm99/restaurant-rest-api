const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const Scheman = mongoose.Schema;


const promotionSchema = new Scheman({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String, //img url or uri.
    },
    label:{
        type:String,
        default:'',
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
        required:true,
        default:false,
    }
});

var promotions = mongoose.model('promotion', promotionSchema);

module.exports = promotions;

