var express = require('express');
var router = express.Router();
const userController = require('../controllers/user/userController');

router.get('/', function (req, res){
    res.render('register')
});
router.post('/register', function (req, res){
    userController.register
});


// router.post('/login', userController.login);


module.exports = router;