var models = require('../models');
var exports = module.exports = {}
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const aws = require( 'aws-sdk' );

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
    signatureVersion: 'v4',
    region:'ap-south-1'
});

exports.exportFarmerFormData1 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-1_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "SURNAME", key: "surname", width: 30 },
            { header: "FATHER/HUSBAND'S NAME", key: "father_or_husband_name", width: 30 },
            { header: "ADDRESS", key: "address", width: 30 },
            { header: "STATE", key: "state", width: 30 },
            { header: "DISTRICT", key: "district", width: 30 },
            { header: "TALUKA", key: "taluka", width: 30 },
            { header: "VILLAGE", key: "village_name", width: 30 },
            { header: "PINCODE", key: "pin_code", width: 30 },
            { header: "WHATSAPP NO", key: "whatsApp", width: 30 },
            { header: "TELEGRAM NO", key: "telegram", width: 30 },
            { header: "AADHAR CARD NO", key: "aadharno", width: 30 },
            { header: "LAND REVENUE RECORD NO", key: "land_revenue_record_no", width: 30 },
            { header: "STATE", key: "state2", width: 30 },
            { header: "DISTRICT", key: "district2", width: 30 },
            { header: "TALUKA", key: "taluka2", width: 30 },
            { header: "SURVEY NO", key: "survey_number_sub_survey_number", width: 30 },
            { header: "ACRE/HECTARE/GOONTHA", key: "acre_hectare_goontha", width: 30 },
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
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "surname": farmer_array[i].surname,
                "father_or_husband_name": farmer_array[i].father_or_husband_name,
                "address": farmer_array[i].address,
                "state": farmer_array[i].village1,
                "district": farmer_array[i].district1,
                "taluka": farmer_array[i].taluka1,
                "village_name": farmer_array[i].village_name,
                "pin_code": farmer_array[i].pin_code,
                "whatsApp": farmer_array[i].whatsApp,
                "telegram": farmer_array[i].telegram,
                "aadharno": farmer_array[i].aadharno,
                "land_revenue_record_no": farmer_array[i].land_revenue_record_no,
                "state2": farmer_array[i].village2,
                "district2": farmer_array[i].district2,
                "taluka2": farmer_array[i].taluka2,
                "survey_number_sub_survey_number": farmer_array[i].survey_number_sub_survey_number,
                "acre_hectare_goontha": farmer_array[i].acre_hectare_goontha,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData2 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-2_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Medicinal_Crop", key: "medicinal_crop", width: 30 },
            { header: "Medicinal_Crop_Variety", key: "medicinal_crop_variety", width: 30 },
            { header: "Plantation", key: "plantation", width: 30 },
            { header: "When_Planted", key: "when_planted", width: 30 },
            { header: "Useful_part", key: "useful_part", width: 30 },
            { header: "The_Time_Of_Harvest", key: "the_time_of_harvest", width: 30 },
            { header: "Estimated_production", key: "estimated_production", width: 30 },
            { header: "Expected_Price", key: "expected_price", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.plantg.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let allRecords=farmer_array[i].list_of_all_records_entered_by_farmer || [];
            for(var j=0;j<allRecords.length;j++){
                let medicinal_crop_array=allRecords[j].Medicinal_Crop || [];
                let useful_part_array=allRecords[j].Useful_part || [];
                let obj={
                    "name": farmer.name,
                    "email": farmer.email,
                    "mobile": farmer.mobile,
                    "medicinal_crop": medicinal_crop_array.join(','),
                    "medicinal_crop_variety": allRecords[j].Medicinal_crop_variety,
                    "plantation": allRecords[j].Plantation,
                    "when_planted": allRecords[j].When_planted,
                    "useful_part": useful_part_array.join(','),
                    "the_time_of_harvest": allRecords[j].The_time_of_harvest,
                    "estimated_production": allRecords[j].Estimated_production,
                    "expected_price": allRecords[j].Expected_Price,
                    "regs_date": farmer_array[i].createdAt,
                }
                farmer_records.push(obj);
            }
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData3 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-3_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Crop_Name", key: "crop_name", width: 30 },
            { header: "Drying", key: "drying", width: 30 },
            { header: "Grading", key: "grading", width: 30 },
            { header: "Cleaning", key: "cleaning", width: 30 },
            { header: "Crushed_powder", key: "crushed_powder", width: 30 },
            { header: "Juice_Extraction", key: "Juice_Extraction", width: 30 },
            { header: "Oil_Extract", key: "Oil_Extract", width: 30 },
            { header: "Packaging", key: "Packaging", width: 30 },
            { header: "Storage", key: "Storage", width: 30 },
            { header: "others", key: "others", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.valueadd.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let allRecords=farmer_array[i].list_of_all_records_entered_by_farmer || [];
            for(var j=0;j<allRecords.length;j++){
                let crop_array=allRecords[j].Crop_Name || [];
                let obj={
                    "name": farmer.name,
                    "email": farmer.email,
                    "mobile": farmer.mobile,
                    "crop_name": crop_array.join(','),
                    "drying": allRecords[j].Drying ? "Filled": "Not Filled",
                    "grading": allRecords[j].Grading ? "Filled": "Not Filled",
                    "cleaning": allRecords[j].Cleaning ? "Filled": "Not Filled",
                    "crushed_powder": allRecords[j].Crushed_powder ? "Filled": "Not Filled",
                    "Juice_Extraction": allRecords[j].Juice_Extraction ? "Filled": "Not Filled",
                    "Oil_Extract": allRecords[j].Oil_Extract ? "Filled": "Not Filled",
                    "Packaging": allRecords[j].Packaging ? "Filled": "Not Filled",
                    "Storage": allRecords[j].Storage ? "Filled": "Not Filled",
                    "others": allRecords[j].others,
                    "regs_date": farmer_array[i].createdAt,
                }
                farmer_records.push(obj);
            }
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData4 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-4_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Yes/No", key: "yes_or_no", width: 30 },
            { header: "Ayurvedic Product Info", key: "ayurvedic_product_info", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.ayurvedic_product.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let obj={
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "yes_or_no": farmer_array[i].yes_or_no,
                "ayurvedic_product_info": farmer_array[i].ayurvedic_product_info,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData5 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-5_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Yes/No", key: "yes_or_no", width: 30 },
            { header: "Name of organic agency", key: "name_of_organic_farm_certifying_agency", width: 30 },
            { header: "Date/year of Registration", key: "date_and_year_of_registration", width: 30 },
            { header: "Registration_no", key: "registration_no", width: 30 },
            { header: "Any Lab Test", key: "have_you_done_any_lab_test", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.organic.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let obj={
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "yes_or_no": farmer_array[i].yes_or_no,
                "name_of_organic_farm_certifying_agency": farmer_array[i].name_of_organic_farm_certifying_agency,
                "date_and_year_of_registration": farmer_array[i].date_and_year_of_registration,
                "registration_no": farmer_array[i].registration_no,
                "have_you_done_any_lab_test": farmer_array[i].have_you_done_any_lab_test,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData6 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-6_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Yes/No", key: "yes_or_no", width: 30 },
            { header: "Name of Vendor", key: "name_of_vendor", width: 30 },
            { header: "Address", key: "address", width: 30 },
            { header: "Mobile Number", key: "mobile_number", width: 30 },
            { header: "Email_Id", key: "email_id", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.farmbuyer.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let obj={
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "yes_or_no": farmer_array[i].yes_or_no,
                "name_of_vendor": farmer_array[i].name_of_vendor,
                "address": farmer_array[i].address,
                "mobile_number": farmer_array[i].mobile_number,
                "email_id": farmer_array[i].email_id,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData7 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-7_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Name_of_medicinal_crop", key: "Name_of_medicinal_crop", width: 30 },
            { header: "Problem_experienced_briefly", key: "Problem_experienced_briefly", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.problem.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let allRecords=farmer_array[i].list_of_all_records_entered_by_farmer || [];
            for(var j=0;j<allRecords.length;j++){
                let medicinal_crop_array=allRecords[j].Name_of_medicinal_crop || [];
                let obj={
                    "name": farmer.name,
                    "email": farmer.email,
                    "mobile": farmer.mobile,
                    "Name_of_medicinal_crop": medicinal_crop_array.join(','),
                    "Problem_experienced_briefly": allRecords[j].Problem_experienced_briefly,
                    "regs_date": farmer_array[i].createdAt,
                }
                farmer_records.push(obj);
            }
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData8 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-8_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Yes/No", key: "yes_or_no", width: 30 },
            { header: "Experiment", key: "experiment", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.experiment.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let obj={
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "yes_or_no": farmer_array[i].yes_or_no,
                "experiment": farmer_array[i].experiment,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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



exports.exportFarmerFormData9 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-9_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Yes/No", key: "yes_or_no", width: 30 },
            { header: "Name_of_medicinal_crop", key: "Name_of_medicinal_crop", width: 30 },
            { header: "Area_in _Acre", key: "Area_in_Acre", width: 30 },
            { header: "Provide_the_address", key: "Provide_the_address", width: 30 },
            { header: "Buyers_if_you_know_already", key: "Buyers_if_you_know_already", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.futureplant.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let allRecords=farmer_array[i].list_of_all_records_entered_by_farmer || [];
            for(var j=0;j<allRecords.length;j++){
                let medicinal_crop_array=allRecords[j].Name_of_medicinal_crop || [];
                let obj={
                    "name": farmer.name,
                    "email": farmer.email,
                    "mobile": farmer.mobile,
                    "yes_or_no": farmer_array[i].yes_or_no,
                    "Name_of_medicinal_crop": medicinal_crop_array.join(','),
                    "Area_in_Acre": allRecords[j].Area_in_Acre,
                    "Provide_the_address": allRecords[j].Provide_the_address,
                    "Buyers_if_you_know_already": allRecords[j].Buyers_if_you_know_already,
                    "regs_date": farmer_array[i].createdAt,
                }
                farmer_records.push(obj);
            }
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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


exports.exportFarmerFormData10 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-10_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Yes/No", key: "yes_or_no", width: 30 },
            { header: "Name of Nearby Farmer", key: "name", width: 30 },
            { header: "Address", key: "address", width: 30 },
            { header: "Pin Code", key: "pin_code_number", width: 30 },
            { header: "Mobile", key: "mobile", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.nearbyfarmer.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }

            let obj={
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "yes_or_no": farmer_array[i].yes_or_no,
                "name": farmer_array[i].name,
                "address": farmer_array[i].address,
                "pin_code_number": farmer_array[i].pin_code_number,
                "mobile": farmer_array[i].mobile,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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



exports.exportFarmerFormData11 = async function(req, res){
    try {
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Farmer_Form-11_Data");
    
        worksheet.columns = [
            { header: "NAME", key: "name", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "MOBILE", key: "mobile", width: 30 },
            { header: "Date_of_filling", key: "date_of_filling", width: 30 },
            { header: "REGISTRATION DATE", key: "regs_date", width: 30 },
          ];
        
        let farmer_array= await models.dof.findAll({where:{}});
        let farmer_records=[];
    
        for(var i=0;i<farmer_array.length;i++){
            let farmer= await models.user.findOne({where:{"id": farmer_array[i].userid}});
            
            let checkUserStatus= await models.userStatus.findOne({where:{"userid": farmer_array[i].userid}});
            if(checkUserStatus.status=='Remove'){
                continue;
            }
            
            let obj={
                "name": farmer.name,
                "email": farmer.email,
                "mobile": farmer.mobile,
                "date_of_filling": farmer_array[i].date_of_filling,
                "regs_date": farmer_array[i].createdAt,
            }
            farmer_records.push(obj);
        }
    
        for(var i=0;i<farmer_records.length;i++){
            worksheet.addRow(farmer_records[i]);
        }
    
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
    
        const data = await workbook.xlsx.writeFile(`Exported Farmer Form Data.xlsx`);
    
        fs.readFile(path.join(__dirname,`../Exported Farmer Form Data.xlsx`), async (err, data) => {
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





