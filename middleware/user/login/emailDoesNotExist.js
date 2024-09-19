const dbPool = require('../../../db');

class EmailDoesNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailAlreadyExists';
        this.message = 'Email Already Exists';
        this.code = 'EMAIL_ALREADY_EXISTS';
    }
}

module.exports = async function (req, res, next) {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        const results = await dbPool.execute(sql, [req.body.email])
        const row = results[0]['count'] > 0; 
        if (row){
            console.log(new EmailDoesNotExist('Email does not exist'));
            return res.status(400).send('Email does not exist');
        }
        else next();
    } catch (err) {
        console.error('An error occurred: ' + err);
        return res.status(500).send({ message: 'An error occurred while checking email: ' + err });
    }
}