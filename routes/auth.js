var express = require('express');
var auth = express.Router();

const userController = require('../controllers/user/userController');

// show registration form
auth.get('/registration', userController.showRegistration);
// process registration form
auth.post('/registration/register', function (req, res){
    req.body.user_type_id = "USER";
    userController.register(req, res)
});


// show login form
auth.get('/login', userController.showLogin)
// process login form
// router.post('/login', userController.login);

module.exports = auth;