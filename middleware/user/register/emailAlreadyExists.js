const db = require('../../../db');
const util = require('util');
db.query = util.promisify(db.query);

class EmailAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailAlreadyExists';
        this.message = 'Email Already Exists';
        this.code = 'EMAIL_ALREADY_EXISTS';
    }
}


module.exports = function (req, res, next) {
    sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    db.query(sql, [req.body.email]).then(results => {
        results = results[0]['count'] > 0;
        if (results>0){
            console.log(new EmailAlreadyExists('Email already exists'));
            return res.status(400).send('Email already exists');
        }
        else next();
    }).catch(err => {
        console.error('An error occurred while executing the query: ' + err);  
        res.status(500).send('An error occurred while executing the query: ' + err);
    })
}