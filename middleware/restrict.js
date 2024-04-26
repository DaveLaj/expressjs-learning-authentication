// function to protect routes from unauthorized access
const jwt = require('jsonwebtoken');
const db = require('../db');
// function to query user data from the database

function userquery(user_id) {
    var sql = "SELECT * FROM users WHERE id = '"+user_id+"' LIMIT 1";
    results = db.query(sql);
    results = results[0];
    return results;
}

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
        results = userquery(req.user.id);
        if (results.user_type_id == 1){ // 2 corresponds to admin user type
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