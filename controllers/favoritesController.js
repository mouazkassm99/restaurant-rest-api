const Favorites = require('../models/favorite');


//A USER ONLY HAS 1 FAVORITE OBJECT AND ONE IS CREATED IF THERE IS NONE.
//IF NOT EXISTED A NEW ONE IS CREATED AND THE DISHES ARE ADDED TO IT. 


//get all the favorite dishes for the user that is logged in.
exports.getFavoriteForUser = (req, res, next) => {
    Favorites.find({ userId: req.user._id })
        .populate('userId')
        .populate('dishes')
        .then((favs) => {
            res.status(200).setHeader('Content-Type', 'application/json');
            res.json(favs);
        }, err => next(err))
        .catch(err => next(err));
}



//add punch of dishes to my favorite (an array of dishes)
exports.addDishesToMyFavorite = (req, res, next) => {
    var listFav = req.body;

    //find the favorites for the user and if it is not there create one
    Favorites.findOne({ userId: req.user._id })
        .then((fav) => {
            if (fav) {
                console.log("found the fav");
                fav.dishes.push(listFav);
                fav.save((err, saveFav) => {
                    if (err) {
                        throw new Error('could not edit the favorite');
                    } else {
                        res.status(200).setHeader('Content-Type', 'application/json');
                        res.json(saveFav);
                    }
                })
            } else {
                //create a new One
                var newFav = new Favorites({
                    userId: req.user._id,
                });
                newFav.dishes = listFav;
                newFav.save((err, savedFav) => {
                    if (err) {
                        throw new Error('could not create a fav');
                    } else {
                        res.status(200).setHeader('Content-Type', 'application/json');
                        res.json(savedFav);
                    }
                });
            }
        }, err => next(err))
        .catch(err => next(err));
}
//add dish to user favorite by dish id:
exports.addDishToFavOnDishId =(req, res, next) => {
    Favorites.findOne({ userId: req.user._id })
        .then((fav) => {
            if (fav) {
                console.log("found the fav");
                fav.dishes.push(req.params.dishId);
                fav.save((err, saveFav) => {
                    if (err) {
                        throw new Error('could not add to the favorite');
                    } else {
                        res.status(200).setHeader('Content-Type', 'application/json');
                        res.json(saveFav);
                    }
                })
            } else {
                //create a new One
                var newFav = new Favorites({
                    userId: req.user._id,
                });
                newFav.dishes.push(req.params.dishId);
                newFav.save((err, savedFav) => {
                    if (err) {
                        throw new Error('could not create a fav');
                    } else {
                        res.status(200).setHeader('Content-Type', 'application/json');
                        res.json(savedFav);
                    }
                });
            }
        }, err => next(err))
        .catch(err => next(err));
}



//remove all dishes from the user favorites (even fav is removed).
exports.removeUserFavorite = (req, res, next) => {
    Favorites.findOneAndDelete({ userId: req.user._id })
        .then((fav) => {
            res.status(200).setHeader('Content-Type', 'application/json');
            res.json(fav);
        })
        .catch(err => next(err));
}
//remove a dish from the favorite by dish id
exports.removeDishFromFavoriteOnId = (req, res, next)=>{
    // var index = array.indexOf(elem);

    Favorites.findOne({userId:req.user._id})
        .then((fav)=>{
            var index = fav.dishes.indexOf(req.params.dishId);
            if (index > -1) {
                fav.dishes.splice(index, 1);
            }
            fav.save((err, saveFav)=>{
                if(err){
                    throw new Error('could not delete the dish');
                }else{
                    res.status(200).setHeader('Content-Type', 'application/json');
                    res.json(saveFav);
                }
            })
        })
        .catch(err=>next(err));

}



//operation not supported 
exports.notSupported =  (req, res, next) => {
    res.statusCode = 501;
    res.end('operation not supported on this router');
}

//send ok status
exports.okStatus = (req, res) => { res.sendStatus(200); }