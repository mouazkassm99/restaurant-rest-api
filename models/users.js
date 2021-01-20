var mongoose = require('mongoose');
const passport = require('passport');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname:{
        type:String,
        default:'',
    },
    lastname:{
        type:String,
        default:'',
    },
    facebookId:{
        type:String
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);