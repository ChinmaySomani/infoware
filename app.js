require("dotenv").config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const {Sequelize} = require("sequelize");
var methodOverride = require('method-override');
var passport = require('passport')
var session = require('express-session')
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


var models = require("./models");



// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./services/passport.js')(passport, models.user);


const rout = require('./routers/index.router.js');
const farmreg = require('./routers/farmreg.router.js');
const buyreg = require('./routers/buyreg.router.js');
const admin = require('./routers/admin.router.js');
const post_requirement = require('./routers/post_requirement.router.js');
const importRoute = require('./routers/import.js');
const locationRoute = require('./routers/location.router.js');
const fileUploadRoute = require('./routers/file_upload.router.js');
const webinarRoute = require('./routers/webinar.router.js');
const eventRoute = require('./routers/event.router.js');

app.use('/', rout);
app.use('/', farmreg);
app.use('/', buyreg);
app.use('/', admin);
app.use('/',post_requirement);
app.use('/',importRoute);
app.use('/',locationRoute);
app.use('/',fileUploadRoute);
app.use('/',webinarRoute);
app.use('/',eventRoute);

// app.get('/yip', function(req, res){
//     models.user.findAll()
//     .then(data => {
//         res.send(data);
//     });
// });
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

app.get('/', (req,res)=>{
    return res.status(200).json({
        status: "success",
        message: "Welcome to the home page !!",
    });
});

app.listen(process.env.PORT || 3000, process.env.IP, function(err, result){
    console.log('Server is running!');
});