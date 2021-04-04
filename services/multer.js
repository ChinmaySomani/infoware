//Aws cloud Storage
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

// Aws constants
const s3 = new aws.S3({
    accessKeyId: "AKIATCO2IC2GFNKPCZMM",
    secretAccessKey: "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",
    Bucket: "infowarefarmerportal"
   });

const fileUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: "infowarefarmerportal",
     acl: 'private',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
}).single('uploadFile');

module.exports= fileUpload;