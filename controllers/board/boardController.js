const db = require('../../db');
const util = require('util');
db.query = util.promisify(db.query);

// ---------------------------------------------------------------------------------------------------------------------

exports.showBoard = function (req, res){
    user = req.session.user;
    console.log(user , "showboard");
    res.render('board', { user: user });
}

