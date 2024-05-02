// function to protect routes from unauthorized access
function loggedIn (req, res, next) {
    if(req.session.user) next();
    else res.redirect('/auth/login');
}


function isAdmin (req, res, next){
    if(req.session.user.user_type_id === 1) next();
    else res.status(403).send({ message: 'Only Admins are allowed to view this page' });
}


function isUser (req, res, next){
    if (typeof req.session.user.user_type_id != 'number') {
        res.status(400).send({ message: 'User type is not defined' });
    } 
    if(req.session.user.user_type_id === 2) next();
    else res.status(403).send({ message: 'Only Users are allowed to view this page' });
}


module.exports = { loggedIn, isAdmin, isUser };