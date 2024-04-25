// function to protect routes from unauthorized access
module.exports=function restrict (req, res, next) {
    if(req.session.user) next();
    else res.redirect('/auth/loginpage');
}