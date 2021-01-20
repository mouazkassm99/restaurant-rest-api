const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');
const promotionsController = require('../controllers/promotionsController');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json({ strict: true }));
promotionsRouter.use(bodyParser.urlencoded({ extended: true }));

promotionsRouter.route('/')
    .options(cors.corsWithOptions, promotionsController.okStatus)
    .get(cors.cors, promotionsController.getPromos)
    .post(cors.corsWithOptions, authenticate.verifyUser, promotionsController.addNewPromotion)
    .put(cors.corsWithOptions, authenticate.verifyUser, promotionsController.notSupported)
    .delete(cors.corsWithOptions, authenticate.verifyUser, promotionsController.deletePromotions)
;

promotionsRouter.route('/:promoId')
    .options(cors.corsWithOptions, promotionsController.okStatus)
    .get(cors.cors, promotionsController.getPromoOnId)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.notSupported)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.editPromotion)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.deletePromotionOnId)
;

module.exports = promotionsRouter;