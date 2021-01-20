var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt; //to get the token 
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var facebookStraregy = require('passport-facebook-token');

var config = require('./config.js');
var User = require('./models/users');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, //usually only takes a json obj with one value: _id.
        {expiresIn: 3600 * 12 * 30}); //create a token that lasts a month.
};




var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//will take the token and get th payload out of it using the extactor.
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => { //usually only takes a json obj with one value: _id.
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false}); //dont create a session for the jwt.

exports.verifyAdmin = (req, res, next)=>{
    if(req.user.admin == true){
        next();
    }
    else{
        var err = new Error('user does not have admin previligies');
        err.status = 403;
        next(err);
    }
}


exports.facebookPassport = passport.use(new facebookStraregy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
}, (accessToken, refreshToken, profile, done)=>{
    User.findOne({facebookId:profile.id}, (err, user)=>{
        if(err){
            return done(err, false);
        }else if( !err && user !== null){
            return done(null, user);
        }else{
            user = new User({username:profile.displayName});
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user)=>{
                if(err){
                    return done(err, null);
                }else{
                    return done(null, user);    
                }
            })
        }
    })
}))