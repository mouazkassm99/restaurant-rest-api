const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dishes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'dish'
        }
    ]
});

var Favorites = mongoose.model('favorite', favoriteSchema);

module.exports = Favorites;