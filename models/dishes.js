const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,
    },
    comment:{
        type:String,   
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    
},{timestamps:true,});

const dishSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    comments: {
        type:[commentSchema]
    },
    image:{
        type:String,
    },
    category:{
        type:String,
    },
    label:{
        type:String,
        default: '',
    },
    price:{
        type:Number,
        required:true,
    },
    feature:{
        type:Boolean,
        default: false,
    }
},{
    timestamps:true,
});

dishSchema.static.deleteComment = ()=>{
    delete mongoose.connection.models['comment'];
}
var dishes = mongoose.model('dish', dishSchema);

module.exports = dishes;