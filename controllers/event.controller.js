var models = require('../models');
var exports = module.exports = {}

exports.createEvent = async function(req, res){
    var fpd = req.body;

    let today= Date();
    if(today>=fpd.start_date && today<=fpd.end_date){
        fpd.status="active";
    }
    else{
        fpd.status="inactive";
    }

    let total_users_registered_for_event=0;

    console.log(models);
    let array=fpd.models_used;
    for(var i=0;i<array.length;i++){
        let a= models[array[i]];
        let ans= await a.findAll({where:{}});
        console.log(ans.length);
        total_users_registered_for_event+=ans.length;
    }

    fpd.total_users_registered=total_users_registered_for_event;

    const ifFound= await models.events.findOne({where: {"event_name": req.body.event_name}});
    if(ifFound){
        models.events.update(fpd,{where: {"event_name": req.body.event_name}});
        console.log("Updated successfully");
        return res.status(200).json({
            status: "success",
            message: "Successfully updated the event!!",
        });        
    }

    models.events.create(fpd)
    .then(function(result){
        console.log("Created successfully");
        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Successfully created the event!!",
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