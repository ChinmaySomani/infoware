var router = require('express').Router();
var index = require('../controllers/index.controller.js');
var passport = require('passport');
const isLoggedIn = require('../services/auth.js');
const farmlogin = require('../services/farmauth.js');
var models = require('../models');

router.post('/login', function(req, res, next ){
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) {
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
      }
      if (!user) {
        return res.status(400).json({
            status: "failure",
            message: info.message,
            data: null,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully logged in !!",
        data: user,
        userId: user.id,
        type: user.type
     });
    })(req, res, next);   
});

router.get('/logout',index.logout);

router.post('/signup', function(req, res, next ){
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
      }
      if (!user) {
        return res.status(400).json({
            status: "failure",
            message: info.message,
            data: null,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully registered or logged in (if already registered)!!",
        data: user,
        userId: user.id,
        type: user.type
      });
    })(req, res, next);   
});

router.get("/signup/failure",(req,res)=>{
    return res.status(400).json({
        status: "failure",
        message: "Some error ocurred!",
        data: null,
    });
});

module.exports = router;