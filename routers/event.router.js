var router = require('express').Router();
var index = require('../controllers/event.controller.js');

router.post('/event/create', index.createEvent);

module.exports = router;