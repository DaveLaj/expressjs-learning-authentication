const db = require('../../db');
const bcrypt = require('bcrypt');
const util = require('util');
db.query = util.promisify(db.query);




// ---------------------------------------------------------------------------------------------------------------------

exports.showBoard = function (req, res){
    res.render('board');
}