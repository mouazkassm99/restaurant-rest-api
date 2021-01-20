var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {

  // const id="wakdjk";
  // const token = jwt.sign({id}, 'whaidhd', {
  //   expiresIn: 1 * 24 * 60 * 60,
  // });

  // res.cookie('name', token, {
    // maxAge:1 * 24 * 60 * 60
  // });

  // res.render('indexx', { title: 'Express' });
  res.sendFile('public/index.html', {root:'./'});

});

module.exports = router;
