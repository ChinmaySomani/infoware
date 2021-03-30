var models = require('../models');
var exports = module.exports = {}

exports.allMedicinalCrops = function(req, res){
    models.medicinal_crop.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all medicinal crops are below!!",
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

exports.allBuyers = function(req, res){
    models.user.findAll({
        where: {"type": "buyer"}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Details of all registered buyers!!",
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

exports.allFarmers = function(req, res){
    models.user.findAll({
        where: {"type": "farmer"}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Details of all registered farmers!!",
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


exports.allPlants = function(req, res){
    models.postrequirementfarmer.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Details of all Plants!!",
            total_plants: result.length,
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

exports.allMemberships = function(req, res){
    models.membership.findAll({})
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Details of all memberships taken by users!!",
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