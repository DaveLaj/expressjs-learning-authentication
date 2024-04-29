var express = require('express');
var auth = express.Router();
// Import the controller
const userController = require('../controllers/user/userController');



// middleware

// exclusive for login
const login_isFilled = require('../middleware/user/login/isFilled');


// exclusive for register
const register_isFilled = require('../middleware/user/register/isFilled');
const passwordValid = require('../middleware/user/register/passwordValid');
const matchPassword = require('../middleware/user/register/matchPassword');

// common middleware
const emailValid = require('../middleware/user/common/emailValid');

// show registration form
auth.get('/register',  userController.showRegistration);
// process registration form
auth.post('/register', register_isFilled, emailValid, passwordValid, matchPassword, function (req, res){
    req.body.user_type_id = "USER";
    userController.register(req, res)
});


// show login form
auth.get('/login', userController.showLogin)
// process login form
auth.post('/login', login_isFilled, function (req, res){
    userController.login(req, res)
});
// logout
auth.get('/logout', userController.logout)
module.exports = auth;