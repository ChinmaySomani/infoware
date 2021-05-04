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

exports.getFData = async function(req, res){
    let farmerId= req.params.farmer_id;
    let formNo= req.params.form_no;

    let found=0;
    let ans,data_array;

    if(formNo==1) data_array=await models.fpdetails.findAll({where:{}});
    if(formNo==2) data_array=await models.plantg.findAll({where:{}});
    if(formNo==3) data_array=await models.valueadd.findAll({where:{}});
    if(formNo==4) data_array=await models.organic.findAll({where:{}});
    if(formNo==5) data_array=await models.farmbuyer.findAll({where:{}});
    if(formNo==6) data_array=await models.problem.findAll({where:{}});
    if(formNo==7) data_array=await models.experiment.findAll({where:{}});
    if(formNo==8) data_array=await models.futureplant.findAll({where:{}});
    if(formNo==9) data_array=await models.nearbyfarmer.findAll({where:{}});
    if(formNo==10) data_array=await models.dof.findAll({where:{}});
    
    for(var i=0;i<data_array.length;i++){
        if((data_array[i].userid==farmerId) || ((data_array[i].userid+"\n")==farmerId)){
            found=1;
            ans=data_array[i];
            break;
        }
    }
    if(found==0){
        return res.status(200).json({
            status: "success",
            message: "User has not filled this form yet!!",
            data: ans,
        });
    }
    return res.status(200).json({
        status: "success",
        message: "User has filled this form!!",
        data: ans,
    });
}

exports.getBData = async function(req, res){
    let buyerId= req.params.buyer_id;
    let formNo= req.params.form_no;

    let found=0;
    let ans,data_array;

    if(formNo==1) data_array=await models.buyerpdetails.findAll({where:{}});
    if(formNo==2) data_array=await models.buyercdetails.findAll({where:{}});
    if(formNo==3) data_array=await models.plantused.findAll({where:{}});
    if(formNo==4) data_array=await models.providetest.findAll({where:{}});
    if(formNo==5) data_array=await models.test.findAll({where:{}});
    if(formNo==6) data_array=await models.lab.findAll({where:{}});
    if(formNo==7) data_array=await models.routinesup.findAll({where:{}});
    if(formNo==8) data_array=await models.geoorigin.findAll({where:{}});
    if(formNo==9) data_array=await models.buyproblem.findAll({where:{}});
    if(formNo==10) data_array=await models.buyfutureplant.findAll({where:{}});
    if(formNo==11) data_array=await models.nearbybuyer.findAll({where:{}});
    if(formNo==12) data_array=await models.buyerdof.findAll({where:{}});
    
    for(var i=0;i<data_array.length;i++){
        if((data_array[i].userid==buyerId) || ((data_array[i].userid+"\n")==buyerId)){
            found=1;
            ans=data_array[i];
            break;
        }
    }
    if(found==0){
        return res.status(200).json({
            status: "success",
            message: "User has not filled this form yet!!",
            data: ans,
        });
    }
    return res.status(200).json({
        status: "success",
        message: "User has filled this form!!",
        data: ans,
    });
}

exports.allUsefulParts = function(req, res){
    models.useful_part_of_plants.findAll({
        where: {}
    })
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "List of all useful parts of plants are below!!",
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