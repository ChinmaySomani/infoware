var models = require('../models');
var exports = module.exports = {}

exports.reg1p = function (req, res){
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
            gujrati_message: "નામ મૂળાક્ષરો હોવા જોઈએ"
        });
    }
    if(typeof req.body.surname!="string" && req.body.surname){
        return res.status(400)
        .json({
            status: "failure",
            message: "Surname must be alphabets",
            gujrati_message: "અટક શબ્દોમાં લખો"
        });
    }
    if(typeof req.body.father_or_husband_name!="string" && req.body.father_or_husband_name){
        return res.status(400).json({
            status: "failure",
            message: "Father/Husband Name must be alphabets",
            gujrati_message: "પિતા/પતિનું નામ શબ્દોમાં લખો"
        });
    }
    if((typeof req.body.phone!="number" || (req.body.phone).toString().length!=10) && req.body.phone){
        return res.status(400).json({
            status: "failure",
            message: "Phone must be number & length must be 10",
            gujrati_message: "10 અંકનો સાચો મોબાઈલ નંબર લખો"
        });
    }
    if((typeof req.body.mobile!="number" || (req.body.mobile).toString().length!=10) && req.body.mobile){
        return res.status(400).json({
            status: "failure",
            message: "Mobile must be number & length must be 10",
            gujrati_message: "10 અંકનો સાચો મોબાઈલ નંબર લખો"
        });
    }
    if((typeof req.body.whatsApp!="number" || (req.body.whatsApp).toString().length!=10) && req.body.whatsApp){
        return res.status(400).json({
            status: "failure",
            message: "Whatsapp must be number & length must be 10",
            gujrati_message: "વોટ્સએપ નંબર હોવો જોઈએ અને લંબાઈ 10 હોવી જ જોઇએ"
        });
    }
    if((typeof req.body.telegram!="number" || (req.body.telegram).toString().length!=10) && req.body.telegram){
        return res.status(400).json({
            status: "failure",
            message: "Telegram must be number & length must be 10",
            gujrati_message: "ટેલિગ્રામ નંબર હોવો આવશ્યક છે અને લંબાઈ 10 હોવી આવશ્યક છે"
        });
    }
    if(typeof req.body.aadharno!="number" && req.body.aadharno){
        return res.status(400).json({
            status: "failure",
            message: "Aadhar No must be number",
            gujrati_message: "આધાર નંબરમાં વચ્ચે જગ્યા આપ્યા વગર લખો"
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
    
    var array=[];
    models.fpdetails.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].farmerpID;
                models.fpdetails.update(fpd,{where:{"farmerpID": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.fpdetails.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })
    
}

exports.reg2p = function(req, res){
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    
    var array=[];
    models.plantg.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].plant_id;
                models.plantg.update(fpd,{where:{"plant_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.plantg.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

}

exports.reg3p =  function(req, res){
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.valueadd.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].valueadd_id;
                models.valueadd.update(fpd,{where:{"valueadd_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.valueadd.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

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

    var array=[];
    models.organic.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].organic_id;
                models.organic.update(fpd,{where:{"organic_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.organic.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

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

    var array=[];
    models.farmbuyer.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].farmbuyer_id;
                models.farmbuyer.update(fpd,{where:{"farmbuyer_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.farmbuyer.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

}

exports.reg6p = function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.problem.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].problem_id;
                models.problem.update(fpd,{where:{"problem_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.problem.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

}

exports.reg7p = function(req, res){
    // console.log(req.body);
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.experiment.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].exp_id;
                models.experiment.update(fpd,{where:{"exp_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.experiment.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

}

exports.reg8p = function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.futureplant.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].fc_id;
                models.futureplant.update(fpd,{where:{"fc_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.futureplant.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

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

    var array=[];
    models.nearbyfarmer.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].nf_id;
                models.nearbyfarmer.update(fpd,{where:{"nf_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.nearbyfarmer.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

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

    var array=[];
    models.dof.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            console.log(array[i].userid+"\n")
            const id=array[i].userid+"\n";
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].dof_id;
                models.dof.update(fpd,{where:{"dof_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.dof.create(fpd)
        .then(function(result){
            console.log("Created successfully");
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

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })
    
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