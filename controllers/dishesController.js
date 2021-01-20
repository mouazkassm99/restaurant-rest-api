const Dishes = require('../models/dishes');
const mongoose = require('mongoose');


//gets all the dishes in the DB using the query selected
exports.getDishes = (req, res, next) => {
    Dishes.find(req.query)
        .populate('comments.author')
        .then((dishes) => {
            res.statusCode = 200;
            
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);

        }, (err) => next(err))
        .catch(err => next(err));
}
//get a dish on Id from the params
exports.getDishOnId = (req, res, next) => {
    // console.log(req.params.dishId);
    Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}



//create a new Dish
exports.createNewDish = (req, res, next) => {
    console.log(req.body);
    Dishes.create(req.body)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}



//edit a dish
exports.editDish = (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}


//remove All dishes

exports.removeDishes = (req, res, next) => {
    Dishes.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => { next(err) })
        .catch(err => next(err));
}
//remove dish on id
exports.removeDishOnId = (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}



// *************************Comments******************************

//get comments for a dish
exports.getCommentsOnDish = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then(dish => {
            if (dish != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments);
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                res.statusCode = 404;
                return next(err);
            }
        }, err => next(err))
        .catch(err => next(err));
}
//get a comment by id
exports.getCommentOnId = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then((dish) => {
            //returns the comment if there was a dish and there was a comment.
            if (dish != null && dish.comments.id(req.params.commentId) != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentId));
            }
            //otherwise there is an error.
            else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}


//post a comment on a dish
exports.postCommnetOnDish = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            if (dish != null) {
                req.body.author = req.user._id;
                dish.comments.push(req.body);
                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(dish);
                    }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}


//edit comment
exports.editComment = (req, res, next) => {

    Dishes.findById(req.params.dishId)
        .then((dish) => {
            if (dish != null && dish.comments.id(req.params.commentId) != null) {

                //only edit the rating and the comment.

                if (req.body.rating) {
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }
                if (req.body.comment) {
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                dish.save()
                    .then((dish) => {
                        Dishes.findById(dish._id)
                            .populate('comments.author')
                            .then((dish) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(dish);
                            })
                    }, (err) => next(err));
            }
            else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}


//delete all comments on dish
exports.deleteCommentsOnDish = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            if (dish != null) {
                //delete all comments
                for (let i = 0; i < dish.comments.length; i++) {
                    // console.log(dish.comments.id(dish.comments[i]._id)._id);
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(dish);
                    }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }

        }, err => next(err))
        .catch(err => next(err));
}
//delete comment by id
exports.deleteCommentOnId = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {


            if (dish != null && dish.comments.id(req.params.commentId) != null
                && dish.comments.id(req.params.commentId).author.equals(req.user._id)
            ) {
                dish.comments.id(req.params.commentId).remove();
                dish.save()
                    .then((dish) => {
                        Dishes.findById(dish._id)
                            .populate('comments.author')
                            .then((dish) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(dish);
                            })
                    }, (err) => next(err));
            }
            else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
            else if (!dish.comments.id(req.params.commentId).author.equals(req.user._id)) {
                if(req.user.admin){
                    dish.comments.id(req.params.commentId).remove();
                    dish.save()
                    .then((dish) => {
                        Dishes.findById(dish._id)
                            .populate('comments.author')
                            .then((dish) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(dish);
                            })
                    }, (err) => next(err));
                }else{
                var errr = new Error('you can not delete a comment that you did not post');
                errr.status = 403;
                return next(errr);
                }
            }
            else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
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