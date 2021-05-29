var router = require('express').Router();
var index = require('../controllers/farmreg.controller.js');

router.post('/register/farmer/1/:id', index.reg1p);

router.post('/register/farmer/2/:id', index.reg2p);

router.post('/register/farmer/3/:id',index.reg3p);

router.post('/register/farmer/4/:id', index.reg4p);

router.post('/register/farmer/5/:id', index.reg5p);

router.post('/register/farmer/6/:id', index.reg6p);

router.post('/register/farmer/7/:id', index.reg7p);

router.post('/register/farmer/8/:id', index.reg8p);

router.post('/register/farmer/9/:id', index.reg9p);

router.post('/register/farmer/10/:id', index.reg10p);

router.post('/register/farmer/11/:id', index.reg11p);

router.post('/membership/farmer/:id', index.memF);


module.exports = router;