var router = require('express').Router();
var index = require('../controllers/export_farmer_forms.controller.js');

router.get('/admin/export/data/farmer/all/forms', index.exportFarmerFormDataAll);

router.get('/admin/export/data/farmer/form1', index.exportFarmerFormData1);

router.get('/admin/export/data/farmer/form2', index.exportFarmerFormData2);

router.get('/admin/export/data/farmer/form3', index.exportFarmerFormData3);

router.get('/admin/export/data/farmer/form4', index.exportFarmerFormData4);

router.get('/admin/export/data/farmer/form5', index.exportFarmerFormData5);

router.get('/admin/export/data/farmer/form6', index.exportFarmerFormData6);

router.get('/admin/export/data/farmer/form7', index.exportFarmerFormData7);

router.get('/admin/export/data/farmer/form8', index.exportFarmerFormData8);

router.get('/admin/export/data/farmer/form9', index.exportFarmerFormData9);

router.get('/admin/export/data/farmer/form10', index.exportFarmerFormData10);

router.get('/admin/export/data/farmer/form11', index.exportFarmerFormData11);

module.exports = router;