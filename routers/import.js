var router = require('express').Router();
var models = require('../models');
const excelToJson = require('convert-excel-to-json');


router.get("/importUsefulPartOfPlantsFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'List of useful part of plant.xlsx'
    });
    // console.log(result.Location);
    const array = result.Sheet1;
    for(var i=0;i<array.length;i++){
        const useful_part= await models.useful_part_of_plants.findOne({where:{"english_name":array[i].B}});
        if(useful_part){
            console.log("Useful part of plant already present in database");
            // break;
        }
        else{
            const obj={
                "english_name": array[i].B,
                "gujrati_name": array[i].A
            }
            const new_useful_part= await models.useful_part_of_plants.create(obj);
            new_useful_part.save();
            console.log("Successfully filled the details!!");
            // break;
        }
    }
    console.log("All entries of Useful Part of Plants in excel sheet have been added to database");
});


router.get("/importMedicinalCropsFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'medicinal_crops-ok.xlsx'
    });
    // console.log(result.Location);
    const array = result.s;
    for(var i=0;i<array.length;i++){
        const medicinal_crop= await models.medicinal_crop.findOne({where:{"english_name":array[i].B}});
        if(medicinal_crop){
            console.log("Medicinal Crop already present in database");
            // break;
        }
        else{
            const obj={
                "english_name": array[i].B,
                "gujrati_name": array[i].A
            }
            const new_medicinal_crop= await models.medicinal_crop.create(obj);
            new_medicinal_crop.save();
            console.log("Successfully filled the details!!");
            // break;
        }
    }
    console.log("All entries of Medicinal Crops in excel sheet have been added to database");
});

router.get("/importCountryFromExcel",async (req,res)=>{
    const obj={
        country_name: "India",
    }
    models.country.create(obj)
    .then(function(result){
        console.log("Successfully added the details!!");
    }).catch(error => {
        console.log("Error!! Details not added");
    });
});


router.get("/importStateFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'Sample Village Data For Farmer portal.xlsx'
    });
    // console.log(result.Location);
    const array = result.Sheet1;
    for(var i=0;i<array.length;i++){
        const state= await models.state.findOne({where:{"state_name":array[i].A}});
        if(state){
            console.log("State already present in database");
            // break;
        }
        else{
            const obj={
                "state_name": array[i].A,
                "countryId": 1
            }
            const new_state= await models.state.create(obj);
            new_state.save();
            console.log("Successfully filled the details!!");
            // break;
        }
    }
    console.log("All entries in excel sheet has been added to database");
    // return res.status(200).json({
    //     "status": "Success",
    //     "message": "All entries in excel sheet has been added to database"
    // });
});

router.get("/importDistrictFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'sample.xlsx'
    });
    // console.log(result.Location);
    const array = result.s;
    for(var i=0;i<array.length;i++){
        const district= await models.district.findOne({where:{"district_name":array[i].D}});
        if(district){
            const district_array= await models.district.findAll({where:{"district_name":array[i].D}});
            const state= await models.state.findOne({where:{"state_name":array[i].E}});
            var ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==state.state_id){
                    ifFound=1;
                    break;
                }
            }
            if(ifFound==1){
                console.log("District already present in database");
            }
            else{
                const obj={
                    "district_name": array[i].D,
                    "stateId": state.state_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                console.log("New district added with same name!!");
            }
        }
        else{
            const state= await models.state.findOne({where:{"state_name":array[i].E}});
            const obj={
                "district_name": array[i].D,
                "stateId": state.state_id,
                "countryId": 1
            }
            const new_district= await models.district.create(obj);
            new_district.save();
            console.log("Successfully filled the details!!");
            // break;
        }
    }
    console.log("All entries in excel sheet has been added to database");
    // return res.status(200).json({
    //     "status": "Success",
    //     "message": "All entries in excel sheet has been added to database"
    // });
});

router.get("/importTalukaFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'sample.xlsx'
    });
    // console.log(result.Location);
    const array = result.s;
    for(var i=0;i<array.length;i++){
        const taluka= await models.taluka.findOne({where:{"taluka_name":array[i].C}});
        if(taluka){
            const district_array= await models.district.findAll({where:{"district_name":array[i].D}});
            const state= await models.state.findOne({where:{"state_name":array[i].E}});
            let real_d_id;
            let real_s_id=state.state_id;
            let ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==real_s_id){
                    ifFound=1;
                    real_d_id=district_array[j].district_id;
                    break;
                }
            }
            if(ifFound==0){
                const obj={
                    "district_name": array[i].D,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                console.log("New taluka added with same name!!");
            }
            else{
                const taluka_array= await models.taluka.findAll({where:{"taluka_name":array[i].C}});
                let ifFound2=0;
                for(var j=0;j<taluka_array.length;j++){
                    if(taluka_array[j].districtId==real_d_id && taluka_array[j].stateId==real_s_id){
                        ifFound2=1;
                        break;
                    }
                }
                if(ifFound2==0){
                    const obj2={
                        "taluka_name": array[i].C,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_taluka= await models.taluka.create(obj2);
                    new_taluka.save();
                    console.log("Successfully filled the details!!");
                }
                else{
                    console.log("Taluka already present in database");
                }
            }
        }
        else{
            const district_array= await models.district.findAll({where:{"district_name":array[i].D}});
            const state= await models.state.findOne({where:{"state_name":array[i].E}});
            let real_d_id;
            let real_s_id=state.state_id;
            let ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==real_s_id){
                    ifFound=1;
                    real_d_id=district_array[j].district_id;
                    break;
                }
            }
            if(ifFound==0){
                const obj={
                    "district_name": array[i].D,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                console.log("Successfully filled the details!!");
            }
            else{
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": real_d_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                console.log("Successfully filled the details!!");
            }
        }
    }
    console.log("All entries in excel sheet has been added to database");
    // return res.status(200).json({
    //     "status": "Success",
    //     "message": "All entries in excel sheet has been added to database"
    // });
});


router.get("/importAreaFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'sample.xlsx'
    });
    // console.log(result.Location);
    const array = result.s;
    for(var i=0;i<array.length;i++){
        const area= await models.area.findOne({where:{"area_name":array[i].A}});
        if(area){
            const district_array= await models.district.findAll({where:{"district_name":array[i].D}});
            const state= await models.state.findOne({where:{"state_name":array[i].E}});
            let real_d_id;
            let real_s_id=state.state_id;
            let real_t_id;
            let ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==real_s_id){
                    ifFound=1;
                    real_d_id=district_array[j].district_id;
                    break;
                }
            }
            if(ifFound==0){
                const obj={
                    "district_name": array[i].D,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                const obj3={
                    "area_name": array[i].A,
                    "pincode": array[i].B,
                    "talukaId": new_taluka.taluka_id,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_area= await models.area.create(obj3);
                new_area.save();
                console.log("New area added with same name!!");
            }
            else{
                const taluka_array= await models.taluka.findAll({where:{"taluka_name":array[i].C}});
                let ifFound2=0;
                for(var j=0;j<taluka_array.length;j++){
                    if(taluka_array[j].districtId==real_d_id && taluka_array[j].stateId==real_s_id){
                        ifFound2=1;
                        real_t_id=taluka_array[j].taluka_id;
                        break;
                    }
                }
                if(ifFound2==0){
                    const obj2={
                        "taluka_name": array[i].C,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_taluka= await models.taluka.create(obj2);
                    new_taluka.save();
                    const obj3={
                        "area_name": array[i].A,
                        "pincode": array[i].B,
                        "talukaId": new_taluka.taluka_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_area= await models.area.create(obj3);
                    new_area.save();
                    console.log("New area added with same name!!");
                }
                else{
                    const area_array= await models.area.findAll({where:{"area_name":array[i].A}});
                    let ifFound3=0;
                    for(var j=0;j<area_array.length;j++){
                        if(area_array[j].talukaId==real_t_id && area_array[j].districtId==real_d_id && area_array[j].stateId==real_s_id){
                            ifFound3=1;
                            break;
                        }
                    }
                    if(ifFound3==0){
                        const obj3={
                            "area_name": array[i].A,
                            "pincode": array[i].B,
                            "talukaId": real_t_id,
                            "districtId": real_d_id,
                            "stateId": real_s_id,
                            "countryId": 1
                        }
                        const new_area= await models.area.create(obj3);
                        new_area.save();
                        console.log("New area added with same name!!");  
                    }
                    else{
                        console.log("Area already present in database");
                    }
                }
            }
        }
        else{
            const district_array= await models.district.findAll({where:{"district_name":array[i].D}});
            const state= await models.state.findOne({where:{"state_name":array[i].E}});
            let real_d_id;
            let real_s_id=state.state_id;
            let real_t_id;
            let ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==real_s_id){
                    ifFound=1;
                    real_d_id=district_array[j].district_id;
                    break;
                }
            }
            if(ifFound==0){
                const obj={
                    "district_name": array[i].D,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                const obj3={
                    "area_name": array[i].A,
                    "pincode": array[i].B,
                    "talukaId": new_taluka.taluka_id,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_area= await models.area.create(obj3);
                new_area.save();
                console.log("New area added with same name!!");
            }
            else{
                const taluka_array= await models.taluka.findAll({where:{"taluka_name":array[i].C}});
                let ifFound2=0;
                for(var j=0;j<taluka_array.length;j++){
                    if(taluka_array[j].districtId==real_d_id && taluka_array[j].stateId==real_s_id){
                        ifFound2=1;
                        real_t_id=taluka_array[j].taluka_id;
                        break;
                    }
                }
                if(ifFound2==0){
                    const obj2={
                        "taluka_name": array[i].C,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_taluka= await models.taluka.create(obj2);
                    new_taluka.save();
                    const obj3={
                        "area_name": array[i].A,
                        "pincode": array[i].B,
                        "talukaId": new_taluka.taluka_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_area= await models.area.create(obj3);
                    new_area.save();
                    console.log("New area added with same name!!");
                }
                else{
                    const obj3={
                        "area_name": array[i].A,
                        "pincode": array[i].B,
                        "talukaId": real_t_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_area= await models.area.create(obj3);
                    new_area.save();
                    console.log("Successfully filled the details!!");
                }
            }
        }
    }
    console.log("All entries in excel sheet has been added to database");
});


router.get("/importPinCodeFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'Sample Village Data For Farmer portal with area & pincode.xlsx'
    });
    // console.log(result.Location);
    const array = result.Sheet2;
    for(var i=0;i<array.length;i++){
            const district_array= await models.district.findAll({where:{"district_name":array[i].B}});
            const state= await models.state.findOne({where:{"state_name":array[i].A}});
            let real_d_id;
            let real_s_id=state.state_id;
            let real_t_id;
            let real_a_id;
            let ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==real_s_id){
                    ifFound=1;
                    real_d_id=district_array[j].district_id;
                    break;
                }
            }
            if(ifFound==0){
                const obj={
                    "district_name": array[i].B,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                const obj3={
                    "area_name": array[i].D,
                    "pincode": array[i].E,
                    "talukaId": new_taluka.taluka_id,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_area= await models.area.create(obj3);
                new_area.save();
                const obj4={
                    "pincode_no": array[i].E,
                    "areaId": new_area.area_id,
                    "talukaId": new_taluka.taluka_id,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_pincode= await models.pincode.create(obj4);
                new_pincode.save();
                console.log("New pincode added!!");
            }
            else{
                const taluka_array= await models.taluka.findAll({where:{"taluka_name":array[i].C}});
                let ifFound2=0;
                for(var j=0;j<taluka_array.length;j++){
                    if(taluka_array[j].districtId==real_d_id && taluka_array[j].stateId==real_s_id){
                        ifFound2=1;
                        real_t_id=taluka_array[j].taluka_id;
                        break;
                    }
                }
                if(ifFound2==0){
                    const obj2={
                        "taluka_name": array[i].C,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_taluka= await models.taluka.create(obj2);
                    new_taluka.save();
                    const obj3={
                        "area_name": array[i].D,
                        "pincode": array[i].E,
                        "talukaId": new_taluka.taluka_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_area= await models.area.create(obj3);
                    new_area.save();
                    const obj4={
                        "pincode_no": array[i].E,
                        "areaId": new_area.area_id,
                        "talukaId": new_taluka.taluka_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_pincode= await models.pincode.create(obj4);
                    new_pincode.save();
                    console.log("New PinCode added!!");
                }
                else{
                    const area_array= await models.area.findAll({where:{"area_name":array[i].D}});
                    let ifFound3=0;
                    for(var j=0;j<area_array.length;j++){
                        if(area_array[j].talukaId==real_t_id && area_array[j].districtId==real_d_id && area_array[j].stateId==real_s_id){
                            ifFound3=1;
                            real_a_id=area_array[j].area_id;
                            break;
                        }
                    }
                    if(ifFound3==0){
                        const obj3={
                            "area_name": array[i].D,
                            "pincode": array[i].E,
                            "talukaId": real_t_id,
                            "districtId": real_d_id,
                            "stateId": real_s_id,
                            "countryId": 1
                        }
                        const new_area= await models.area.create(obj3);
                        new_area.save();
                        const obj4={
                            "pincode_no": array[i].E,
                            "areaId": new_area.area_id,
                            "talukaId": real_t_id,
                            "districtId": real_d_id,
                            "stateId": real_s_id,
                            "countryId": 1
                        }
                        const new_pincode= await models.pincode.create(obj4);
                        new_pincode.save();
                        console.log("New PinCode added!!");  
                    }
                    else{
                        const pincode_array= await models.pincode.findAll({where:{"pincode_no":array[i].E}});
                        let ifFound4=0;
                        for(var j=0;j<pincode_array.length;j++){
                            if(pincode_array[j].areaId==real_a_id && pincode_array[j].talukaId==real_t_id && pincode_array[j].districtId==real_d_id && pincode_array[j].stateId==real_s_id){
                                ifFound4=1;
                                break;
                            }
                        }
                        if(ifFound4==0){
                            const obj4={
                                "pincode_no": array[i].E,
                                "areaId": real_a_id,
                                "talukaId": real_t_id,
                                "districtId": real_d_id,
                                "stateId": real_s_id,
                                "countryId": 1
                            }
                            const new_pincode= await models.pincode.create(obj4);
                            new_pincode.save();
                            console.log("New PinCode added!!");
                        }
                        else{
                            console.log("PinCode already exists!!");
                        }
                    }
            }
        }
    }
    console.log("All entries in excel sheet has been added to database");
});


router.get("/importVillageCodeFromExcel",async (req,res)=>{
    const result = excelToJson({
        sourceFile: 'Sample Village Data For Farmer portal.xlsx'
    });
    // console.log(result.Location);
    const array = result.Sheet1;
    for(var i=0;i<array.length;i++){
            const district_array= await models.district.findAll({where:{"district_name":array[i].B}});
            const state= await models.state.findOne({where:{"state_name":array[i].A}});
            let real_d_id;
            let real_s_id=state.state_id;
            let real_t_id;
            let real_a_id;
            let ifFound=0;
            for(var j=0;j<district_array.length;j++){
                if(district_array[j].stateId==real_s_id){
                    ifFound=1;
                    real_d_id=district_array[j].district_id;
                    break;
                }
            }
            if(ifFound==0){
                const obj={
                    "district_name": array[i].B,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_district= await models.district.create(obj);
                new_district.save();
                const obj2={
                    "taluka_name": array[i].C,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_taluka= await models.taluka.create(obj2);
                new_taluka.save();
                const obj3={
                    "village_name": array[i].D,
                    "village_code": array[i].E,
                    "talukaId": new_taluka.taluka_id,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_village= await models.village.create(obj3);
                new_village.save();
                const obj4={
                    "village_code": array[i].E,
                    "villageId": new_village.village_id,
                    "talukaId": new_taluka.taluka_id,
                    "districtId": new_district.district_id,
                    "stateId": real_s_id,
                    "countryId": 1
                }
                const new_village_code= await models.village_code.create(obj4);
                new_village_code.save();
                console.log("New Village Code added!!");
            }
            else{
                const taluka_array= await models.taluka.findAll({where:{"taluka_name":array[i].C}});
                let ifFound2=0;
                for(var j=0;j<taluka_array.length;j++){
                    if(taluka_array[j].districtId==real_d_id && taluka_array[j].stateId==real_s_id){
                        ifFound2=1;
                        real_t_id=taluka_array[j].taluka_id;
                        break;
                    }
                }
                if(ifFound2==0){
                    const obj2={
                        "taluka_name": array[i].C,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_taluka= await models.taluka.create(obj2);
                    new_taluka.save();
                    const obj3={
                        "village_name": array[i].D,
                        "village_code": array[i].E,
                        "talukaId": new_taluka.taluka_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_village= await models.village.create(obj3);
                    new_village.save();
                    const obj4={
                        "village_code": array[i].E,
                        "villageId": new_village.village_id,
                        "talukaId": new_taluka.taluka_id,
                        "districtId": real_d_id,
                        "stateId": real_s_id,
                        "countryId": 1
                    }
                    const new_village_code= await models.village_code.create(obj4);
                    new_village_code.save();
                    console.log("New Village Code added!!");
                }
                else{
                    const village_array= await models.village.findAll({where:{"village_name":array[i].D}});
                    let ifFound3=0;
                    for(var j=0;j<village_array.length;j++){
                        if(village_array[j].talukaId==real_t_id && village_array[j].districtId==real_d_id && village_array[j].stateId==real_s_id){
                            ifFound3=1;
                            real_a_id=village_array[j].village_id;
                            break;
                        }
                    }
                    if(ifFound3==0){
                        const obj3={
                            "village_name": array[i].D,
                            "village_code": array[i].E,
                            "talukaId": real_t_id,
                            "districtId": real_d_id,
                            "stateId": real_s_id,
                            "countryId": 1
                        }
                        const new_village= await models.village.create(obj3);
                        new_village.save();
                        const obj4={
                            "village_code": array[i].E,
                            "villageId": new_village.village_id,
                            "talukaId": real_t_id,
                            "districtId": real_d_id,
                            "stateId": real_s_id,
                            "countryId": 1
                        }
                        const new_village_code= await models.village_code.create(obj4);
                        new_village_code.save();
                        console.log("New Village Code added!!");  
                    }
                    else{
                        const village_code_array= await models.village_code.findAll({where:{"village_code":array[i].E}});
                        let ifFound4=0;
                        for(var j=0;j<village_code_array.length;j++){
                            if(village_code_array[j].villageId==real_a_id && village_code_array[j].talukaId==real_t_id && village_code_array[j].districtId==real_d_id && village_code_array[j].stateId==real_s_id){
                                ifFound4=1;
                                break;
                            }
                        }
                        if(ifFound4==0){
                            const obj4={
                                "village_code": array[i].E,
                                "villageId": real_a_id,
                                "talukaId": real_t_id,
                                "districtId": real_d_id,
                                "stateId": real_s_id,
                                "countryId": 1
                            }
                            const new_village_code= await models.village_code.create(obj4);
                            new_village_code.save();
                            console.log("New Village Code added!!");
                        }
                        else{
                            console.log("Village Code already exists!!");
                        }
                    }
            }
        }
    }
    console.log("All entries in excel sheet has been added to database");
});

module.exports = router;