var router = require('express').Router();
var index = require('../controllers/index.controller.js');
var passport = require('passport');
const isLoggedIn = require('../services/auth.js');
const farmlogin = require('../services/farmauth.js');
var models = require('../models');

router.post('/login', function(req, res, next ){
    passport.authenticate('local-signin', async function(err, user, info) {
      if (err) {
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            gujrati_message: "થોડી ભૂલ થઈ",
            data: null,
        });
      }
      if (!user) {
        return res.status(400).json({
            status: "failure",
            message: info.message,
            gujrati_message: info.gujrati_message,
            data: null,
        });
      }

      let checkUserStatus= await models.userStatus.findOne({where:{"userid": user.id}});
      if(!checkUserStatus){
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            gujrati_message: "થોડી ભૂલ થઈ",
            data: null,
        });
      }

      if(checkUserStatus.status=='Inactive'){
        return res.status(400).json({
            status: "failure",
            message: "Admin has inactive your account. Plz contact Admin",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Successfully logged in !!",
        gujrati_message: "સફળતાપૂર્વક લ inગ ઇન કર્યું !!",
        data: user,
        userId: user.id,
        type: user.type
     });
    })(req, res, next);   
});

router.get('/logout',index.logout);

router.post('/signup', function(req, res, next ){
    passport.authenticate('local-signup', async function(err, user, info) {
      if (err) {
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            gujrati_message: "થોડી ભૂલ થઈ",
            data: null,
        });
      }
      if (!user) {
        return res.status(400).json({
            status: "failure",
            message: info.message,
            gujrati_message: info.gujrati_message,
            data: null,
        });
      }
      
      let checkUserStatus= await models.userStatus.create({"userid": user.id});
      
      return res.status(200).json({
        status: "success",
        message: "Successfully registered or logged in (if already registered)!!",
        gujrati_message: "સફળતાપૂર્વક નોંધાયેલ",
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
        gujrati_message: "થોડી ભૂલ થઈ",
        data: null,
    });
});

module.exports = router;