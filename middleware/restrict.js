// function to protect routes from unauthorized access
const jwt = require('jsonwebtoken');
// rework to add multiple middleware functions in one file
function loggedIn(req, res, next) {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, 'secret', function(err, decoded){
            if (err) {
                console.log(err);
                res.redirect('/auth/loginpage');
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
    else {
        console.log('Restricted access')
        res.redirect('/auth/loginpage');
    }
}






module.exports = { loggedIn };