var express = require('express');
var auth = express.Router();

const userController = require('../controllers/user/userController');

// show registration form
auth.get('/register', userController.showRegistration);
// process registration form
auth.post('/register', function (req, res){
    req.body.user_type_id = "USER";
    userController.register(req, res)
});


// show login form
auth.get('/login', userController.showLogin)
// process login form
auth.post('/login', function (req, res){
    userController.login(req, res)
});
// logout
auth.get('/logout', userController.logout)
module.exports = auth;