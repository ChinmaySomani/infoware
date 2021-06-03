var models = require('../models');
var exports = module.exports = {}
var bCrypt = require('bcrypt-nodejs');
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const aws = require( 'aws-sdk' );
const { send } = require('process');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
    signatureVersion: 'v4',
    region:'ap-south-1'
});

exports.activeUsers = function(req, res){
    models.user.findAll({
        where: {}
    })
    .then(async function(result){
        // console.log(result);
        
        let sendArray = [];
        let count=0;
        for(var i=0;i<result.length;i++){
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": result[i].id}});
            if(checkUserStatus.status=='Active'){
                ++count;
                sendArray.push(result[i]);
            }
        }

        return res.status(200).json({
            status: "success",
            message: "Details of all active users!!",
            data: sendArray,
            totalActiveUsers: count
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

exports.inactiveUsers = function(req, res){
    models.user.findAll({
        where: {}
    })
    .then(async function(result){
        // console.log(result);
        
        let sendArray = [];
        let count=0;
        for(var i=0;i<result.length;i++){
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": result[i].id}});
            if(checkUserStatus.status=='Inactive'){
                ++count;
                sendArray.push(result[i]);
            }
        }

        return res.status(200).json({
            status: "success",
            message: "Details of all inactive users!!",
            data: sendArray,
            totalInactiveUsers: count
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

exports.removeUsers = function(req, res){
    models.user.findAll({
        where: {}
    })
    .then(async function(result){
        // console.log(result);
        
        let sendArray = [];
        let count=0;
        for(var i=0;i<result.length;i++){
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": result[i].id}});
            if(checkUserStatus.status=='Remove'){
                ++count;
                sendArray.push(result[i]);
            }
        }

        return res.status(200).json({
            status: "success",
            message: "Details of all remove users!!",
            data: sendArray,
            totalRemoveUsers: count
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

exports.createUserStatus = async function(req, res){
    try{
        models.user.findAll({
            where: {}
        })
        .then(async function(result){
            
            let count=0;
            for(var i=0;i<result.length;i++){
                let checkUserStatus= await models.userStatus.findOne({where:{"userid": result[i].id}});
                if(!checkUserStatus){
                    console.log("new user status created");
                    ++count;
                    let createUserStatus= await models.userStatus.create({"userid": result[i].id});
                }
            }
    
            let userStatusCreated= await models.userStatus.findAll({where:{}});
    
            return res.status(200).json({
                status: "success",
                message: "User status created for all!!",
                totalUsers: result.length,
                totalUserStatusCreated: userStatusCreated.length,
                newCreatedUsers: count
            });
        }).catch(error => {
            console.log(error);
            return res.status(400).json({
                status: "failure",
                message: "Some error ocurred!",
                data: null,
            });
        });

    }catch(err){
        console.log(err);
            res.status(400).json({
            status: "failure",
            message: "Some error occurred!!",
            data: null,
        });
    }
}

exports.changeUserStatus= async function(req,res){
    try{
        let user= await models.userStatus.findOne({where:{"userid": req.params.user_id}});
        if(!user){
            return res.status(400).json({
                status: "failure",
                message: "user does not exists!!",
                data: null,
            });
        }
        user.status= req.body.status;
        user.save();
        return res.status(200).json({
            status: "success",
            message: "User status updated successfully!!",
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
        status: "failure",
        message: "Some error occurred!!",
        data: null,
        });
    }
}

exports.exportWebinarData = async function(req, res){
try {
    
    const event= await models.events.findOne({where: {"event_id": req.params.eventId}});

    const workbook = new ExcelJS.Workbook();
    const worksheet1 = workbook.addWorksheet("Farmer_Webinar_Data-1");
    const worksheet2 = workbook.addWorksheet("Buyer_Webinar_Data");
    const worksheet3 = workbook.addWorksheet("Farmer_Webinar_Data-2");
    const worksheet4 = workbook.addWorksheet("Farmer_Webinar_Data-3");

    worksheet1.columns = [
        { header: "EVENT NAME", key: "event_name", width: 30 },
        { header: "EVENT START DATE", key: "event_start_date", width: 30 },
        { header: "EVENT END DATE", key: "event_end_date", width: 30 },
        { header: "EVENT TYPE", key: "event_type", width: 30 },
        { header: "NAME", key: "name", width: 30 },
        { header: "EMAIL", key: "email", width: 30 },
        { header: "MOBILE", key: "mobile", width: 30 },
        { header: "ADDRESS", key: "address", width: 30 },
        { header: "STATE", key: "state", width: 30 },
        { header: "DISTRICT", key: "district", width: 30 },
        { header: "TALUKA", key: "taluka", width: 30 },
        { header: "VILLAGE", key: "village_name", width: 30 },
        { header: "PINCODE", key: "pin_code", width: 30 },
        { header: "WHATSAPP NO", key: "whatsApp", width: 30 },
        { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
      ];
    
    let farmer_array= await models.fpdetails.findAll({where:{}});
    let farmer_records=[];

    for(var i=0;i<farmer_array.length;i++){
        let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
        
        let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
        if(checkUserStatus.status=='Remove'){
            continue;
        }

        let obj={
            "event_name": event.event_name,
            "event_start_date": event.start_date,
            "event_end_date": event.end_date,
            "event_type": event.event_type,
            "name": farmer.name,
            "email": farmer.email,
            "mobile": farmer.mobile,
            "address": farmer_array[i].address,
            "state": farmer_array[i].village1,
            "district": farmer_array[i].district1,
            "taluka": farmer_array[i].taluka1,
            "village_name": farmer_array[i].village_name,
            "pin_code": farmer_array[i].pin_code,
            "whatsApp": farmer_array[i].whatsApp,
            "regs_date": farmer_array[i].createdAt,
        }
        farmer_records.push(obj);
    }

    for(var i=0;i<farmer_records.length;i++){
        worksheet1.addRow(farmer_records[i]);
    }

    worksheet2.columns = [
        { header: "EVENT NAME", key: "event_name", width: 30 },
        { header: "EVENT START DATE", key: "event_start_date", width: 30 },
        { header: "EVENT END DATE", key: "event_end_date", width: 30 },
        { header: "EVENT TYPE", key: "event_type", width: 30 },
        { header: "NAME", key: "name", width: 30 },
        { header: "EMAIL", key: "email", width: 30 },
        { header: "MOBILE", key: "mobile", width: 30 },
        { header: "ADDRESS", key: "address", width: 30 },
        { header: "STATE", key: "state", width: 30 },
        { header: "DISTRICT", key: "district", width: 30 },
        { header: "TALUKA", key: "taluka", width: 30 },
        { header: "VILLAGE", key: "village_name", width: 30 },
        { header: "PINCODE", key: "pin_code", width: 30 },
        { header: "WHATSAPP NO", key: "whatsApp", width: 30 },
        { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
      ];

    let buyer_array= await models.buyer_webinar_form.findAll({where:{}});
    let buyer_records=[];

    for(var i=0;i<buyer_array.length;i++){
        let buyer= await models.user.findOne({where:{"id": buyer_array[i].userid}});
        
        let checkUserStatus= await models.userStatus.findOne({where:{"userid": buyer_array[i].userid}});
        if(checkUserStatus.status=='Remove'){
            continue;
        }

        let obj={
            "event_name": event.event_name,
            "event_start_date": event.start_date,
            "event_end_date": event.end_date,
            "event_type": event.event_type,
            "name": buyer.name,
            "email": buyer.email,
            "mobile": buyer.mobile,
            "address": buyer_array[i].address,
            "state": buyer_array[i].state,
            "district": buyer_array[i].district,
            "taluka": buyer_array[i].taluka,
            "village_name": buyer_array[i].village_name,
            "pin_code": buyer_array[i].pin_code,
            "whatsApp": buyer_array[i].whatsApp,
            "regs_date": buyer_array[i].createdAt,
        }
        buyer_records.push(obj);
    }

    for(var i=0;i<buyer_records.length;i++){
        worksheet2.addRow(buyer_records[i]);
    }

    worksheet3.columns = [
        { header: "EVENT NAME", key: "event_name", width: 30 },
        { header: "EVENT START DATE", key: "event_start_date", width: 30 },
        { header: "EVENT END DATE", key: "event_end_date", width: 30 },
        { header: "EVENT TYPE", key: "event_type", width: 30 },
        { header: "NAME", key: "name", width: 30 },
        { header: "EMAIL", key: "email", width: 30 },
        { header: "MOBILE", key: "mobile", width: 30 },
        { header: "Medicinal_Crop", key: "medicinal_crop", width: 30 },
        { header: "Useful_part", key: "useful_part", width: 30 },
        { header: "Estimated_production", key: "estimated_production", width: 30 },
        { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
      ];

      let farmer_array2= await models.plantg.findAll({where:{}});
      let farmer_records2=[];
  
      for(var i=0;i<farmer_array2.length;i++){
          let farmer= await models.user.findOne({where:{"id": farmer_array2[i].userid}});
          
        let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array2[i].userid}});
        if(checkUserStatus.status=='Remove'){
            continue;
        }

          let allRecords=farmer_array2[i].list_of_all_records_entered_by_farmer;
          for(var j=0;j<allRecords.length;j++){
            let medicinal_crop_array=allRecords[j].Medicinal_Crop;
            let useful_part_array=allRecords[j].Useful_part;
            let obj={
                "event_name": event.event_name,
                "event_start_date": event.start_date,
                "event_end_date": event.end_date,
                "event_type": event.event_type,
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "medicinal_crop": medicinal_crop_array.join(','),
                "useful_part": useful_part_array.join(','),
                "estimated_production": allRecords[j].Estimated_production,
                "regs_date": farmer_array2[i].createdAt,
            }
            farmer_records2.push(obj);
        }
    }
    
    for(var i=0;i<farmer_records2.length;i++){
        worksheet3.addRow(farmer_records2[i]);
    }


    worksheet4.columns = [
        { header: "EVENT NAME", key: "event_name", width: 30 },
        { header: "EVENT START DATE", key: "event_start_date", width: 30 },
        { header: "EVENT END DATE", key: "event_end_date", width: 30 },
        { header: "EVENT TYPE", key: "event_type", width: 30 },
        { header: "NAME", key: "name", width: 30 },
        { header: "EMAIL", key: "email", width: 30 },
        { header: "MOBILE", key: "mobile", width: 30 },
        { header: "Crop_Name", key: "crop_name", width: 30 },
        { header: "Drying", key: "drying", width: 30 },
        { header: "Grading", key: "grading", width: 30 },
        { header: "Cleaning", key: "cleaning", width: 30 },
        { header: "Crushed_powder", key: "crushed_powder", width: 30 },
        { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
      ];

      let farmer_array3= await models.valueadd.findAll({where:{}});
      let farmer_records3=[];
  
      for(var i=0;i<farmer_array3.length;i++){
        let farmer= await models.user.findOne({where:{"id": farmer_array3[i].userid}});
          
        let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array3[i].userid}});
        if(checkUserStatus.status=='Remove'){
            continue;
        }

          let allRecords=farmer_array3[i].list_of_all_records_entered_by_farmer;
          for(var j=0;j<allRecords.length;j++){
            let crop_array=allRecords[j].Crop_Name;
            let obj={
                "event_name": event.event_name,
                "event_start_date": event.start_date,
                "event_end_date": event.end_date,
                "event_type": event.event_type,
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "crop_name": crop_array.join(','),
                "drying": allRecords[j].Drying ? "Filled": "Not Filled",
                "grading": allRecords[j].Grading ? "Filled": "Not Filled",
                "cleaning": allRecords[j].Cleaning ? "Filled": "Not Filled",
                "crushed_powder": allRecords[j].Crushed_powder ? "Filled": "Not Filled",
                "regs_date": farmer_array3[i].createdAt,
            }
            farmer_records3.push(obj);
        }
    }
    
    for(var i=0;i<farmer_records3.length;i++){
        worksheet4.addRow(farmer_records3[i]);
    }


    worksheet1.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });

    worksheet2.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    worksheet3.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });

    worksheet4.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });

    // let today = Date();
    // res.setHeader(
    //     "Content-Type",
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // );
    // res.setHeader(
    //     "Content-Disposition",
    //     "attachment; filename=" + `${today}.xlsx`
    // );
    // await workbook.xlsx.write(res)
    // res.status(200).end()
    // console.log("File downloaded successfully!!");

    const data = await workbook.xlsx.writeFile(`Exported Webinar Data.xlsx`);

    fs.readFile(path.join(__dirname,`../Exported Webinar Data.xlsx`), async (err, data) => {
        if (err) {
          console.error(err)
          res.status(400).json({
            status: "failure",
            message: "Some error occurred in reading file from locally!!",
            error: err
          });
        }

        let today = Date();
        const params = {
             ACL: 'private',
              Bucket: process.env.AWS_BUCKET_NAME ,
              Key: `${today}.xlsx`, // File name you want to save as in S3
              Body: data,
              ContentType:'application/vnd.ms-excel'
          };
  
      // Uploading files to the bucket
      s3.upload(params, function(err, data) {
          if (err) {
            console.error(err)
            res.status(400).json({
              status: "failure",
              message: "Some error occurred while uploading file to s3!!",
              error: err
            });
          }
          console.log(`File uploaded successfully. ${data.Location}`);
          var obj = { 
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${today}.xlsx`,
            // Expires: 60*5
          };
          s3.getSignedUrl('getObject',obj,(err,url)=>{
            if (err) {
                console.error(err)
                res.status(400).json({
                  status: "failure",
                  message: "Some error occurred in getting signed url!!",
                  error: err
                });
            }
            res.status(200).json({
                status: "success",
                message: "Successfully exported data!!",
                data: `${url}`
              });
            });

          });
      
      })

  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failure",
      message: "Some error occurred!!",
      data: null,
    });
  }
}


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
    if(formNo==4) data_array=await models.ayurvedic_product.findAll({where:{}});
    if(formNo==5) data_array=await models.organic.findAll({where:{}});
    if(formNo==6) data_array=await models.farmbuyer.findAll({where:{}});
    if(formNo==7) data_array=await models.problem.findAll({where:{}});
    if(formNo==8) data_array=await models.experiment.findAll({where:{}});
    if(formNo==9) data_array=await models.futureplant.findAll({where:{}});
    if(formNo==10) data_array=await models.nearbyfarmer.findAll({where:{}});
    if(formNo==11) data_array=await models.dof.findAll({where:{}});
    
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

exports.getWebBData = async function(req, res){
    let buyerId= req.params.buyer_id;

    let found=0;
    let ans;

    let data_array=await models.buyer_webinar_form.findAll({where:{}});
    
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
    .then(async function(result){
        // console.log(result);

        let sendArray = [];
        let count=0;
        for(var i=0;i<result.length;i++){
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": result[i].id}});
            if(checkUserStatus.status!='Remove'){
                sendArray.push(result[i]);
            }
            else{
                ++count;
            }
        }

        return res.status(200).json({
            status: "success",
            message: "Details of all registered buyers!!",
            data: sendArray,
            usersNotShowingInAdminPanel: count
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
    .then(async function(result){
        // console.log(result);
        
        let sendArray = [];
        let count=0;
        for(var i=0;i<result.length;i++){
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": result[i].id}});
            if(checkUserStatus.status!='Remove'){
                sendArray.push(result[i]);
            }
            else{
                ++count;
            }
        }

        return res.status(200).json({
            status: "success",
            message: "Details of all registered farmers!!",
            data: sendArray,
            usersNotShowingInAdminPanel: count
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