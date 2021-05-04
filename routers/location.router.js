var router = require('express').Router();
var index = require('../controllers/location.controller.js');

router.get('/location/get/all/states', index.allStates);

router.get('/location/get/all/districts', index.allDistricts);

router.get('/location/get/all/talukas', index.allTalukas);

router.get('/location/get/all/area', index.allArea);

router.get('/location/get/all/villages', index.allVillages);

router.get('/location/get/all/village_code', index.allVillageCode);

router.get('/location/state/:stateId/get/districts', index.getDistrictsOfState);

router.get('/location/district/:districtId/get/talukas', index.getTalukasOfDistrict);

router.get('/location/taluka/:talukaId/get/villages', index.getVilagesOfTaluka);

router.get('/location/village/:villageId/get/village_code', index.getVillageCodeOfVillage);

router.get('/location/taluka/:talukaId/get/area', index.getAreaOfTaluka);

router.get('/location/area/:areaId/get/pincode', index.getPincodeOfArea);

module.exports = router;