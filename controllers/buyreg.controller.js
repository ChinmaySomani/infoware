var models = require('../models');
var exports = module.exports = {}

exports.bWebp = function (req, res){
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if(typeof req.body.surname!="string" && req.body.surname){
        return res.status(400)
        .json({
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
    
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    
    var array=[];
    models.buyer_webinar_form.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].buyerWebinarFormID;
                models.buyer_webinar_form.update(fpd,{where:{"buyerWebinarFormID": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.buyer_webinar_form.create(fpd)
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


exports.reg1p = function(req, res){
    
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
    if(typeof req.body.aadhar_no!="number" && req.body.aadhar_no){
        return res.status(400).json({
            status: "failure",
            message: "Aadhar No must be number",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.buyerpdetails.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].buyerpID;
                models.buyerpdetails.update(fpd,{where:{"buyerpID": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.buyerpdetails.create(fpd)
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
    
    if(typeof req.body.name_of_the_company_organization!="string" && req.body.name_of_the_company_organization){
        return res.status(400).json({
            status: "failure",
            message: "Name of company must be alphabets",
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
    if((typeof req.body.gstin_no!="number") && req.body.gstin_no){
        return res.status(400).json({
            status: "failure",
            message: "GST no must be number",
        });
    }
    if((typeof req.body.cin_no!="number") && req.body.cin_no){
        return res.status(400).json({
            status: "failure",
            message: "CIN no must be number",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.buyercdetails.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].buyercID;
                models.buyercdetails.update(fpd,{where:{"buyercID": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.buyercdetails.create(fpd)
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

exports.reg3p = function(req, res){
    // console.log(req.body);
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.plantused.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].plant_id;
                models.plantused.update(fpd,{where:{"plant_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.plantused.create(fpd)
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

exports.reg4p =  function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.providetest.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].ptest_id;
                models.providetest.update(fpd,{where:{"ptest_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.providetest.create(fpd)
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

exports.reg5p =  function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.test.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].test_id;
                models.test.update(fpd,{where:{"test_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.test.create(fpd)
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
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if((typeof req.body.contact_no!="number" || (req.body.contact_no).toString().length!=10) && req.body.contact_no){
        return res.status(400).json({
            status: "failure",
            message: "Contact No must be number & length must be 10",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.lab.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].lab_id;
                models.lab.update(fpd,{where:{"lab_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.lab.create(fpd)
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
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if((typeof req.body.contact_no!="number" || (req.body.contact_no).toString().length!=10) && req.body.contact_no){
        return res.status(400).json({
            status: "failure",
            message: "Contact No must be number & length must be 10",
        });
    }

    console.log(req.body);
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.routinesup.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].rs_id;
                models.routinesup.update(fpd,{where:{"rs_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.routinesup.create(fpd)
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
    models.geoorigin.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].geo_id;
                models.geoorigin.update(fpd,{where:{"geo_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.geoorigin.create(fpd)
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
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.buyproblem.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].problem_id;
                models.buyproblem.update(fpd,{where:{"problem_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.buyproblem.create(fpd)
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
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.buyfutureplant.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].bfp_id;
                models.buyfutureplant.update(fpd,{where:{"bfp_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.buyfutureplant.create(fpd)
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

exports.reg11p = function(req, res){
    
    if(typeof req.body.name!="string" && req.body.name){
        return res.status(400).json({
            status: "failure",
            message: "Name must be alphabets",
        });
    }
    if(typeof req.body.pin_code_number!="number" && req.body.pin_code_number){
        return res.status(400).json({
            status: "failure",
            message: "Pincode No must be number",
        });
    }
    if((typeof req.body.mobile!="number" || (req.body.mobile).toString().length!=10) && req.body.mobile){
        return res.status(400).json({
            status: "failure",
            message: "Mobile No must be number & length must be 10",
        });
    }

    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.nearbybuyer.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].nb_id;
                models.nearbybuyer.update(fpd,{where:{"nb_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.nearbybuyer.create(fpd)
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

exports.reg12p = function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;

    var array=[];
    models.buyerdof.findAll({
        where: {}
    }).then(result=>{
        array=result;
        console.log(array);
        let modelId;
        for(var i=0;i<array.length;i++){
            console.log(pid);
            if((array[i].userid==pid) || ((array[i].userid+"\n")==pid)){
                modelId=array[i].bdof_id;
                models.buyerdof.update(fpd,{where:{"bdof_id": modelId}});
                console.log("Updated successfully");
                return res.status(200).json({
                    status: "success",
                    message: "Successfully filled the details!!",
                });
            }
        }

        models.buyerdof.create(fpd)
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

exports.memB = function(req, res){
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
            message: "Successfully given the membership to buyer!!",
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