var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRoutes');
const promotionsRouter = require('./routes/promotionsRoutes');
const leadersRouter = require('./routes/leadersRouter');
const uploadRouter = require('./routes/uploadRouter');
const favotitesRouter = require('./routes/favoritesRouter');





const mongoose = require('mongoose');

const urlNew = config.mongoUrl;
const connect = mongoose.connect(urlNew, { useNewUrlParser: true, useUnifiedTopology: true, });



connect.then((db) => {
  console.log("connected successfully to db");
}).catch((err) => {
  console.log(err.message);
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cookieParser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use('/dishes', dishRouter);
app.use('/promotions', promotionsRouter)
app.use('/leaders', leadersRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites', favotitesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
