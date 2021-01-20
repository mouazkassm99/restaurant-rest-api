const express = require('express');
const bodyParser = require('body-parser');
const authenticate= require('../authenticate');
const cors = require('./cors');
const leadersController = require('../controllers/leadersController');


const leaderRoute = express.Router();
leaderRoute.use(bodyParser.json());
leaderRoute.use(bodyParser.urlencoded({ extended: true }))


leaderRoute.route('/')
.options(cors.corsWithOptions, leadersController.okStatus)
.get(cors.cors, leadersController.getLeaders)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leadersController.addLeader)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,leadersController.notSupported)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leadersController.deleteLeaderOnId)
;


leaderRoute.route('/:leaderId')
.options(cors.corsWithOptions, leadersController.okStatus)
.get(cors.cors, leadersController.getLeaderOnId)
    .post(cors.corsWithOptions, authenticate.verifyUser, leadersController.notSupported)
    .put(cors.corsWithOptions, authenticate.verifyUser, leadersController.editLeader)
    .delete(cors.corsWithOptions, authenticate.verifyUser, leadersController.deleteLeaderOnId)
;





module.exports = leaderRoute;