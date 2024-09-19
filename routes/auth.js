var express = require('express');
var auth = express.Router();
const userController = require('../controllers/user/userController');
const login_isFilled = require('../middleware/user/login/isFilled');
const register_isFilled = require('../middleware/user/register/isFilled');
const passwordValid = require('../middleware/user/register/passwordValid');
const matchPassword = require('../middleware/user/register/matchPassword');

// commons
const emailValid = require('../middleware/user/common/emailValid');
const emailAlreadyExists = require('../middleware/user/register/emailAlreadyExists');
const emailDoesNotExist = require('../middleware/user/login/emailDoesNotExist');

auth.get('/register',  userController.showRegistration);
auth.post('/register', register_isFilled, emailValid, emailAlreadyExists, passwordValid, matchPassword, userController.register);

auth.get('/login', userController.showLogin)
auth.post('/login', login_isFilled, emailDoesNotExist, userController.login);
auth.get('/logout', userController.logout)

module.exports = auth;