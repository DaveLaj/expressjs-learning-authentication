const db = require('../../db');
const util = require('util');
db.query = util.promisify(db.query);

// ---------------------------------------------------------------------------------------------------------------------

exports.showBoard = async function(req, res){
    user_id = req.user.id;
    var sql = "SELECT * FROM users WHERE id = '"+user_id+"' LIMIT 1";
    results = await db.query(sql);
    res.render('board', { user: results[0] });
}

