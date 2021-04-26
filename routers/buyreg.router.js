var router = require('express').Router();
var index = require('../controllers/buyreg.controller.js');

router.post('/buyer/webinar/form/:id', index.bWebp);

router.post('/register/buyer/1/:id', index.reg1p);

router.post('/register/buyer/2/:id', index.reg2p);

router.post('/register/buyer/3/:id', index.reg3p);

router.post('/register/buyer/4/:id', index.reg4p);

router.post('/register/buyer/5/:id', index.reg5p);

router.post('/register/buyer/6/:id', index.reg6p);

router.post('/register/buyer/7/:id', index.reg7p);

router.post('/register/buyer/8/:id', index.reg8p);

router.post('/register/buyer/9/:id', index.reg9p);

router.post('/register/buyer/10/:id', index.reg10p);

router.post('/register/buyer/11/:id', index.reg11p);

router.post('/register/buyer/12/:id', index.reg12p);

router.post('/membership/buyer/:id', index.memB);

module.exports = router;