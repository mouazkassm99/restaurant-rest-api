const Leaders = require('../models/leaders');


//get all leaders with query
exports.getLeaders = (req, res, next) => {
    Leaders.find(req.query)
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, err => next(err))
        .catch(err => next(err));
}

//get leader by id
exports.getLeaderOnId = (req, res, next) => {
    Leaders.findById(req.params.leaderId)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
        .catch(err => next(err));
}


//add a new leader
exports.addLeader = (req, res, next) => {
    Leaders.create(req.body)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
        .catch(err => next(err));
}



//edit a leader by id :
exports.editLeader = (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
}


//delete all leaders 
exports.deleteLeaderOnId = (req, res, next) => {
    Leaders.remove()
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
        .catch((err) => next(err));
}

//delete leader by id
exports.deleteLeaderOnId = (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
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