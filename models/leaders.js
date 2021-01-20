const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
    },
    designation:{
        type:String,
        required:true,
    },
    abbr:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    
});

var leaders = mongoose.model('leader', leaderSchema);

module.exports = leaders;