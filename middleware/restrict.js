// function to protect routes from unauthorized access
const jwt = require('jsonwebtoken');
const db = require('../db');


//  async function to verify token
// function verifyToken(token) {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, 'secret', function(err, decoded){
//             if (err) {
//                 console.log(err);
//                 reject (err);
//             }
//             else {
//                 resolve(decoded);
//             }
//         });
//     })
// }
    // decoded = verifyToken(req.cookies.token).then((decoded) => {
    //     res.user= decoded;
    //     user_id = res.user.id;
        
    //     next();
    // }).catch((err) => {
    //     console.log('error in token verification', err);
    //     res.redirect('/auth/loginpage');
    // });

function verifyToken (token) {
    decoded = jwt.verify(token, 'secret');
    return decoded;
}

function loggedIn(req, res, next) {
    if (req.cookies.token) {
        req.user = verifyToken(req.cookies.token);
        next();
    }
    else {
        console.log('No token found');
        res.redirect('/auth/loginpage');
    }
}
// middleware to check if user is admin, redirect to login if not
// tofix - userquery function returning undefined
function isAdmin(req, res, next) {
    if (req.cookies.token) {
        req.user = verifyToken(req.cookies.token);
        if (req.user.user_type_id == 1){ // 1 corresponds to admin user type
            console.log('User is an admin');
            next();
        }
        else {
            console.log('User is not an admin');
            res.redirect('/auth/loginpage');
        }
    }
    else {
        console.log('No token found');
        res.redirect('/auth/loginpage');
    }
}


module.exports = { loggedIn, isAdmin };