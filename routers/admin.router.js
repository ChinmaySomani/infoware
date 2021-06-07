var router = require('express').Router();
var index = require('../controllers/admin.controller.js');

router.post('/admin/register', index.adminRegister);

router.post('/admin/login', index.adminLogin);

router.get('/admin/get/data/farmer/:farmer_id/form/:form_no', index.getFData);

router.get('/admin/get/data/buyer/:buyer_id/form/:form_no', index.getBData);

router.get('/admin/get/data/buyer/:buyer_id/webinar/form', index.getWebBData);

router.get('/farmer/get/all/medicinalCrops', index.allMedicinalCrops);

router.get('/farmer/get/all/usefulPartsOfPlants', index.allUsefulParts);

router.get('/admin/all/buyers', index.allBuyers);

router.get('/admin/all/farmers', index.allFarmers);

router.get('/admin/all/plants', index.allPlants);

router.get('/admin/all/memberships', index.allMemberships);

router.get('/admin/export/data/:eventId', index.exportWebinarData);

router.post('/admin/change/user/status/:user_id', index.changeUserStatus);

router.get('/admin/get/all/active/users', index.activeUsers);

router.get('/admin/get/all/inactive/users', index.inactiveUsers);

router.get('/admin/get/all/remove/users', index.removeUsers);

router.get('/admin/create/user/status', index.createUserStatus);

router.get('/admin/get/current/status/user/:user_id', index.getCurrentUserStatus);

module.exports = router;