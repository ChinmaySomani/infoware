var models = require('../models');
var exports = module.exports = {}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        return res.status(200).json({
            status: "success",
            message: "Successfully logout!!",
            data: null,
        });
 
    });
 
}

