var models = require('../models');
var exports = module.exports = {}

exports.reg1p = function (req, res){
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if(typeof req.body.surname!="string" && req.body.surname){
        return res.status(400).json({
            status: "failure",
            message: "Surname must be alphabets",
        });
    }
    if(typeof req.body.father_or_husband_name!="string" && req.body.father_or_husband_name){
        return res.status(400).json({
            status: "failure",
            message: "Father/Husband Name must be alphabets",
        });
    }
    if((typeof req.body.phone!="number" || (req.body.phone).toString().length!=10) && req.body.phone){
        return res.status(400).json({
            status: "failure",
            message: "Phone must be number & length must be 10",
        });
    }
    if((typeof req.body.mobile!="number" || (req.body.mobile).toString().length!=10) && req.body.mobile){
        return res.status(400).json({
            status: "failure",
            message: "Mobile must be number & length must be 10",
        });
    }
    if((typeof req.body.whatsApp!="number" || (req.body.whatsApp).toString().length!=10) && req.body.whatsApp){
        return res.status(400).json({
            status: "failure",
            message: "Whatsapp must be number & length must be 10",
        });
    }
    if((typeof req.body.telegram!="number" || (req.body.telegram).toString().length!=10) && req.body.telegram){
        return res.status(400).json({
            status: "failure",
            message: "Telegram must be number & length must be 10",
        });
    }
    if(typeof req.body.aadharno!="number" && req.body.aadharno){
        return res.status(400).json({
            status: "failure",
            message: "Aadhar No must be number",
        });
    }
    if(typeof req.body.land_revenue_record_no!="number" && req.body.land_revenue_record_no){
        return res.status(400).json({
            status: "failure",
            message: "Land Revenue record no must be number",
        });
    }
    if(typeof req.body.survey_number_sub_survey_number!="number" && req.body.survey_number_sub_survey_number){
        return res.status(400).json({
            status: "failure",
            message: "Survey no must be number",
        });
    }
    if(typeof req.body.acre_hectare_goontha!="number" && req.body.acre_hectare_goontha){
        return res.status(400).json({
            status: "failure",
            message: "Acre must be number",
        });
    }
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    
    // var array=[];
    // models.fpdetails.findAll({
    //     where: {}
    // }).then(result=>{
    //     array=result;
    //     console.log(array);
    //     for(var i=0;i<array.length;i++){
    //         if(array[i].userid==pid){
    //             return res.status(400).json({
    //                 status: "failure",
    //                 message: "User has already filled this form!!",
    //             });
    //         }
    //     }

    //     models.fpdetails.create(fpd)
    //     .then(function(result){
    //         console.log(result);
    //         return res.status(200).json({
    //             status: "success",
    //             message: "Successfully filled the details!!",
    //             data: result,
    //         });
    //     }).catch(error => {
    //         console.log(error);
    //         return res.status(400).json({
    //             status: "failure",
    //             message: "Some error ocurred!",
    //             data: null,
    //         });
    //     });

    // }).catch(error=>{
    //     console.log(error);
    //     return res.status(400).json({
    //         status: "failure",
    //         message: "Some error ocurred!",
    //         data: null,
    //     });
    // })
    
    models.fpdetails.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg2p = function(req, res){
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    
    models.plantg.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg3p =  function(req, res){
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    models.valueadd.create(fpd)
      .then(function(result){
          console.log(result);
          return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg4p = function(req, res){
    
    if(typeof req.body.name_of_organic_farm_certifying_agency!="string" && req.body.name_of_organic_farm_certifying_agency){
        return res.status(400).json({
            status: "failure",
            message: "Name of organic farm must be alphabets",
        });
    }
    if(typeof req.body.registration_no!="number" && req.body.registration_no){
        return res.status(400).json({
            status: "failure",
            message: "Registration No must be number",
        });
    }
    if(typeof req.body.have_you_done_any_lab_test!="string" && req.body.have_you_done_any_lab_test){
        return res.status(400).json({
            status: "failure",
            message: "Lab test field must be string",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.organic.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg5p = function(req, res){
    
    if(typeof req.body.name_of_vendor!="string" && req.body.name_of_vendor){
        return res.status(400).json({
            status: "failure",
            message: "Name of Vendor must be alphabets",
        });
    }
    if((typeof req.body.mobile_number!="number" || (req.body.mobile_number).toString().length!=10) && req.body.mobile_number){
        return res.status(400).json({
            status: "failure",
            message: "Mobile No must be number & length must be 10",
        });
    }
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.farmbuyer.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg6p = function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.problem.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg7p = function(req, res){
    // console.log(req.body);
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.experiment.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg8p = function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.futureplant.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg9p = function(req, res){
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if(typeof req.body.pin_code_number!="number" && req.body.pin_code_number){
        return res.status(400).json({
            status: "failure",
            message: "Pincode must be number",
        });
    }
    if((typeof req.body.mobile!="number" || (req.body.mobile).toString().length!=10) && req.body.mobile){
        return res.status(400).json({
            status: "failure",
            message: "Mobile must be number & length must be 10",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.nearbyfarmer.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.reg10p = function(req, res){
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if((typeof req.body.mobile!="number" || (req.body.mobile).toString().length!=10) && req.body.mobile){
        return res.status(400).json({
            status: "failure",
            message: "Mobile must be number & length must be 10",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.dof.create(fpd)
    .then(function(result){
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully filled the details!!",
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

exports.memF = function(req, res){
    var memb = req.body;
    var pid = req.params.id;
    memb.userid = pid;
    models.membership.create(memb)
    .then(function(result){
        console.log(result);
        models.user.findByPk(pid).then(user=>{
            user.membership_id=result.ms_id;
            user.save();
            console.log(user);
        });
        return res.status(200).json({
            status: "success",
            message: "Successfully given the membership to farmer!!",
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
    // res.redirect('/');
}