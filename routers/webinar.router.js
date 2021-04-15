var router = require('express').Router();
var index = require('../controllers/webinar.controller.js');

router.get('/check/status/of/webinar/forms/farmer/:farmer_id', index.webinarF);

router.get('/check/status/of/webinar/forms/buyer/:buyer_id', index.webinarB);


module.exports = router;