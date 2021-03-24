var models = require('../models');
var exports = module.exports = {}

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
    models.buyerpdetails.create(fpd)
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
    models.buyercdetails.create(fpd)
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

exports.reg3p = function(req, res){
    // console.log(req.body);
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.plantused.create(fpd)
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

exports.reg4p =  function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
      models.providetest.create(fpd)
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

exports.reg5p =  function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
      models.test.create(fpd)
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
    models.lab.create(fpd)
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
    models.routinesup.create(fpd)
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
    models.geoorigin.create(fpd)
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
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.buyproblem.create(fpd)
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
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.buyfutureplant.create(fpd)
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
    models.nearbybuyer.create(fpd)
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

exports.reg12p = function(req, res){
    var fpd = req.body;
    var pid = req.params.id;
    fpd.userid = pid;
    models.buyerdof.create(fpd)
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