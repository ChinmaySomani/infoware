var models = require('../models');
var exports = module.exports = {}
var bCrypt = require('bcrypt-nodejs');

var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

var isValidPassword = function(userpass, password) {
    return bCrypt.compareSync(password, userpass);
}

exports.adminRegister = async function(req, res){
    const isAdmin= await models.admin.findOne({where: {"username": req.body.username}});
    if(isAdmin){
        return res.status(400).json({
            status: "failure",
            message: "Admin already registered!!",
        });
    }

    const obj={
        "username": req.body.username,
        "name": req.body.name ? req.body.name: '',
        "password": generateHash(req.body.password)
    }

    const new_admin= await models.admin.create(obj); 
    return res.status(200).json({
        status: "success",
        message: "Admin successfully registered!!",
    });
}

exports.adminLogin = async function(req, res){
    const isAdmin= await models.admin.findOne({where: {"username": req.body.username}});
    if(!isAdmin){
        return res.status(400).json({
            status: "failure",
            message: "Admin does not exists!!",
        });
    }

    if(!isValidPassword(isAdmin.password,req.body.password)) {
        console.log("Incorrect Password. Enter correct password");
        return res.status(400).json({
            status: "failure",
            message: "Incorrect Password. Enter correct password!!"
        });
    } 
    
    return res.status(200).json({
        status: "success",
        message: "Admin successfully login!!",
    });
}


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