const Promotions = require('../models/promotions');


//get all promotions
exports.getPromos = (req, res, next) => {
    Promotions.find(req.query)
        .then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
        }, err => next(err))
        .catch(err => next(err));
}

//get Promotion by id 
exports.getPromoOnId = (req, res, next) => {
    Promotions.findById(req.params.promoId)
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err => next(err))
        .catch(err => next(err));
}


//add a new promotion 
exports.addNewPromotion = (req, res, next) => {
    Promotions.create(req.body)
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err => next(err))
        .catch(err => next(err));
}


//edit a promotion
exports.editPromotion = (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
}




//delelte all promotions
exports.deletePromotions=(req, res, next) => {
    Promotions.remove()
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
        .catch((err) => next(err));
}
//delete promotion by id
exports.deletePromotionOnId = (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
        .catch((err) => next(err));
}




//operation not supported 
exports.notSupported =  (req, res, next) => {
    res.statusCode = 501;
    res.end('operation not supported on this router');
}

//send ok status
exports.okStatus = (req, res) => { res.sendStatus(200); }