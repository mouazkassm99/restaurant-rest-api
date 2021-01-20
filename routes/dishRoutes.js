const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');
const dishesController = require('../controllers/dishesController');
const upload = require('../imagesConfig');


const dishRouter = express.Router();

dishRouter.use(bodyParser.json({ strict: true }));
dishRouter.use(bodyParser.urlencoded({ extended: true }))

dishRouter.route('/')
    .options(cors.corsWithOptions, dishesController.okStatus)
    .get(cors.cors, dishesController.getDishes)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.createNewDish)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.notSupported)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.removeDishes);

dishRouter.route('/:dishId')
    .options(cors.corsWithOptions, dishesController.okStatus)
    .get(cors.cors, dishesController.getDishOnId)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.notSupported)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.editDish)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.removeDishOnId);

dishRouter.route('/:dishId/comments')
    .options(cors.corsWithOptions, dishesController.okStatus)
    .get(cors.cors, dishesController.getCommentsOnDish)
    .post(cors.corsWithOptions, authenticate.verifyUser, dishesController.postCommnetOnDish)
    .put(cors.corsWithOptions, authenticate.verifyUser, dishesController.notSupported)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishesController.deleteCommentsOnDish);


dishRouter.route('/:dishId/comments/:commentId')
    .options(cors.corsWithOptions, dishesController.okStatus)
    .get(cors.cors, dishesController.getCommentOnId)
    .post(cors.corsWithOptions, authenticate.verifyUser, dishesController.notSupported)
    .put(cors.corsWithOptions, authenticate.verifyUser, dishesController.editComment)
    .delete(cors.corsWithOptions, authenticate.verifyUser, dishesController.deleteCommentOnId);

module.exports = dishRouter;