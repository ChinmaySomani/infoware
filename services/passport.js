var bCrypt = require('bcrypt-nodejs');
 
 
module.exports = function(passport, user) {
 
 
    var User = user;
 
    var LocalStrategy = require('passport-local').Strategy;
 
    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });

    passport.deserializeUser(function(id, done) {
 
        User.findByPk(id).then(function(user) {
     
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
     
        });
     
    });
 
    passport.use('local-signup', new LocalStrategy(
 
        {
 
            usernameField: 'mobile',
 
            passwordField: 'password',
 
            passReqToCallback: true // allows us to pass back the entire request to the callback
 
        },
 
 
 
        function(req,mobile, password, done) {
 
            var generateHash = function(password) {
 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
            };
 

            console.log(req.body.mobile+"@MedicinalBazaar.com");
            
            User.findOne({
                where: {
                    username: req.body.mobile+"@MedicinalBazaar.com"
                }
            }).then(function(user) {
 
                if (user)
 
                {
 
                    console.log("Username already exists. Can't create the user with same mobile number");
                    return done(null, false, {
                        message: "Username already exists. Can't create the user with same mobile number"
                    });
 
                } else
 
                {
 
                    var userPassword = generateHash(password);

                    // updating current date & time
                    const curr_date= new Date();
                    console.log(curr_date);
 
                    var data =
 
                        {
                            name: req.body.name,

                            mobile: req.body.mobile,

                            username: req.body.mobile+"@MedicinalBazaar.com",

                            email: req.body.email,
 
                            password: userPassword,
 
                            type: req.body.type,

                            last_login: curr_date
                        };
 
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
 
                            console.log("Can't able to create the new user. Some error occurred from database");
                            return done(null, false,{
                                message: "Can't able to create the new user. Some error occurred from database"
                            });
 
                        }
 
                        if (newUser) {
 
                            console.log("New user created successfully");
                            return done(null, newUser);
 
                        }
 
                    });
 
                }
 
            });
 
        }
 
    ));


    //LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(
 
    {
 
        // by default, local strategy uses username and password, we will override with email
 
        usernameField: 'mobile',
 
        passwordField: 'password',
 
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, mobile, password, done) {
 
        var User = user;
 
        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }
 
        User.findOne({
            where: {
                username: req.body.mobile+"@MedicinalBazaar.com"
            }
        }).then(function(user) {
 
            if (!user) {
 
                console.log("Username does not exists. Signup first with valid mobile no");
                return done(null, false, {
                    message: "Username does not exists. Signup first with valid mobile no"
                });
 
            }
 
            if (!isValidPassword(user.password, password)) {
 
                console.log("Incorrect Password. Enter correct password");
                return done(null, false, {
                    message: "Incorrect Password. Enter correct password"
                });

            }

            var userinfo = user.get();

            if(req.body.type!=userinfo.type){
                console.log("User type does not match!! Can't login");
                return done(null, false, {
                    message: "User type does not match!! Can't login"
                });
            }

            // updating current date & time
            const curr_date= new Date();
            console.log(curr_date);
            user.last_login=curr_date;
            user.save();
 
            console.log("You are successfully signed in");

            return done(null, userinfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            console.log("Some error occurred with your signin from database");
            return done(null, false, {
                message: "Some error occurred with your signin from database"
            });

        });
 
 
    }
 
));
 
}