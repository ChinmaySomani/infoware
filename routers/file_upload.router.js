var router = require('express').Router();
var index = require('../controllers/file_upload.controller.js');

router.post('/farmer/form/5/upload/file/:farmer_id', index.uploadFile);

module.exports = router;