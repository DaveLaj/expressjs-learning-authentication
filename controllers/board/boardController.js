const db = require('../../db');
const util = require('util');
db.query = util.promisify(db.query);

// ---------------------------------------------------------------------------------------------------------------------

exports.showBoard = function (req, res){
    user = req.session.user;
    console.log(user , "showboard");
    console.log(process.env.NODE_ENV);
    res.render('board', { user: user });
}

