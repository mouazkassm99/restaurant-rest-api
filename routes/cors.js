
const express = require('express');
const cors = require('cors');
const app = express();


const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://localhost:8080'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) { //if the origin is in the whitelist.
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.use(cors({
    origin:'http://localhost:8080'
}))

exports.cors = cors(); //cors without options.
exports.corsWithOptions = cors(corsOptionsDelegate); //cors with options