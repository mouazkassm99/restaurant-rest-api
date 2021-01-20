const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');
const favoriteController = require('../controllers/favoritesController');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json({ strict: true }));
favoritesRouter.use(bodyParser.urlencoded({ extended: true }));


favoritesRouter.route('/')
    .options(cors.corsWithOptions, favoriteController.okStatus)
    .get(cors.cors, authenticate.verifyUser, favoriteController.getFavoriteForUser)
    .post(cors.corsWithOptions, authenticate.verifyUser, favoriteController.addDishesToMyFavorite)
    .put(cors.corsWithOptions, authenticate.verifyUser, favoriteController.notSupported)
    .delete(cors.corsWithOptions, authenticate.verifyUser, favoriteController.removeUserFavorite)
;


favoritesRouter.route('/:dishId')
    .options(cors.corsWithOptions, favoriteController.okStatus)
    .get(cors.corsWithOptions, authenticate.verifyUser, favoriteController.notSupported)
    .post(cors.corsWithOptions, authenticate.verifyUser, favoriteController.addDishToFavOnDishId)
    .put(cors.corsWithOptions, authenticate.verifyUser, favoriteController.notSupported)
    .delete(cors.corsWithOptions, authenticate.verifyUser, favoriteController.removeDishFromFavoriteOnId)
;


module.exports = favoritesRouter;