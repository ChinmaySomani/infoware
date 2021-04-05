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

            var fpd={
              "file_upload_link": imageLocation
            }
            fpd.userid = farmerId;

            var array=[];
            models.organic.findAll({
                where: {}
            }).then(result=>{
              array=result;
              console.log(array);
              let modelId;
              for(var i=0;i<array.length;i++){
                  if(array[i].userid==farmerId){
                      modelId=array[i].organic_id;
                      models.organic.update(fpd,{where:{"organic_id": modelId}});
                      console.log("Updated successfully");
                      return res.status(200).json({
                          status: "success",
                          message: "File uploaded successfully!!",
                      });
                  }
              }

            models.organic.create(fpd)
          .then(function(result){
              console.log("Created successfully");
              console.log(result);
              return res.status(200).json({
                  status: "success",
                  message: "File uploaded successfully!!",
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

            // models.organic.create(fpd);

            // res.status(200).json({
            //   status: "success",
            //   message: "File uploaded successfully!!",
            //   imageLocation: imageLocation,
            // });
            }
        }
    })
}

