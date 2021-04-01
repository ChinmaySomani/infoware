//Aws cloud Storage
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

// Aws constants
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME
   });

const fileUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: process.env.AWS_BUCKET_NAME,
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
}).single('uploadFile');

module.exports= fileUpload;