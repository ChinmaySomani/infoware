var models = require('../models');
var exports = module.exports = {}

exports.webinarF = async function(req, res){
    
    let pid = req.params.farmer_id;
    console.log(pid);
    let found1=0,found2=0,found3=0;
    let array1=[];
    let array2=[];
    let array3=[];

    await models.fpdetails.findAll({
        where: {}
    }).then(result=>{
        array1=result;
        for(var i=0;i<array1.length;i++){
            console.log(array1[i].userid==pid);
            if(array1[i].userid==pid){
                found1=1;
                break;
            }
        }

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })
    
    await models.plantg.findAll({
        where: {}
    }).then(result=>{
        array2=result;
        for(var i=0;i<array2.length;i++){
            console.log(array2[i].userid==pid);
            if(array2[i].userid==pid){
                found2=1;
                break;
            }
        }

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

    await models.valueadd.findAll({
        where: {}
    }).then(result=>{
        array3=result;
        for(var i=0;i<array3.length;i++){
            console.log(array3[i].userid==pid);
            if(array3[i].userid==pid){
                found3=1;
                break;
            }
        }

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

    let ans_array=[];
    if(found1==0) ans_array.push(1);
    if(found2==0) ans_array.push(2);
    if(found3==0) ans_array.push(3);

    console.log(found1);
    console.log(found2);
    console.log(found3);


    console.log(ans_array);

    const obj={
        form1: "Preliminary information of farmers, cultivating medicinal plants.",
        form2: "Information about medicinal crops grown in the field",
        form3: "If you have done any value addition (processed) to the medicinal plant, state the details"
    }


    return res.status(200).json({
        status: "success",
        message: "Status of unfilled forms (Out of 3) of webinar (Farmer)!",
        How_forms_divided: obj,
        Total_webinar_forms_farmer: 3,
        Unfilled_Forms_Number: ans_array,
    });

}



exports.webinarB = async function(req, res){
    
    let pid = req.params.buyer_id;
    console.log(pid);

    let found=0;
    let array=[];

    
    await models.buyerpdetails.findAll({
        where: {}
    }).then(result=>{
        array=result;
        for(var i=0;i<array.length;i++){
            console.log(array[i].userid==pid);
            if(array[i].userid==pid){
                found=1;
                break;
            }
        }

    }).catch(error=>{
        console.log(error);
        return res.status(400).json({
            status: "failure",
            message: "Some error ocurred!",
            data: null,
        });
    })

    let ans_array=[];
    if(found==0) ans_array.push(1);

    console.log(found);


    console.log(ans_array);

    return res.status(200).json({
        status: "success",
        message: "Status of unfilled forms (Out of 1) of webinar (Buyer)!",
        Total_webinar_forms_buyer: 1,
        Unfilled_Forms_Number: ans_array,
    });

}