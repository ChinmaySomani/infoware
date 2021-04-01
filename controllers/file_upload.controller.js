var models = require('../models');
var exports = module.exports = {}
var fileUpload = require('../services/multer.js');

exports.uploadFile = async function(req, res){
    let farmerId= req.params.farmer_id;
    const farmer= await models.user.findByPk(farmerId);
    if(!farmer){
        return res.status(404).json({
            status: "failure",
            message: "No such user exists",
            data: null,
        });
    }
    
    await fileUpload(req, res, (error) => {
        console.log("requestOkokok", req.file);
        if (error) {
          console.log("errors", error);
          res.status(400).json({
            status: "failure",
            message: "Some error occured!",
            data: null,
          });
        } else {
          // If File not found
          if (req.file === undefined) {
            console.log("Error: No File Selected!");
            res.status(400).json({
              status: "failure",
              message: "No file selected!!",
              data: null,
            });
          } else {
            // If Success
            imageName = req.file.key;
            imageLocation = req.file.location;
            console.log("Image location is " + imageLocation);
  
            }
        }
    })
}

