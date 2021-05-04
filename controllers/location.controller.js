var models = require('../models');
var exports = module.exports = {}

exports.allStates = function(req, res){
    models.state.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all states are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.allDistricts = function(req, res){
    models.district.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all districts are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.allTalukas = function(req, res){
    models.taluka.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all talukas are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.allArea = function(req, res){
    models.area.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all area are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.allVillages = function(req, res){
    models.village.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all villages are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.allVillageCode = function(req, res){
    models.village_code.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all village codes are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.getDistrictsOfState = function(req, res){
    let state_id=req.params.stateId;
    models.district.findAll({
        where: {stateId: state_id}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all districts of given state are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.getTalukasOfDistrict = function(req, res){
    let district_id=req.params.districtId;
    models.taluka.findAll({
        where: {districtId: district_id}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all talukas of given district are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.getAreaOfTaluka = function(req, res){
    let taluka_id=req.params.talukaId;
    models.area.findAll({
        where: {talukaId: taluka_id}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all areas of given taluka are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.getPincodeOfArea = function(req, res){
    let area_id=req.params.areaId;
    models.pincode.findAll({
        where: {areaId: area_id}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Pincode of given area is below!!",
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

exports.getVilagesOfTaluka = function(req, res){
    let taluka_id=req.params.talukaId;
    models.village.findAll({
        where: {talukaId: taluka_id}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all villages of given taluka are below!!",
            total: result.length,
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}


exports.getVillageCodeOfVillage = function(req, res){
    let village_id=req.params.villageId;
    models.village_code.findAll({
        where: {villageId: village_id}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Village Code of given village is below!!",
            data: result,
        });
    }).catch(error => {
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    });
}

