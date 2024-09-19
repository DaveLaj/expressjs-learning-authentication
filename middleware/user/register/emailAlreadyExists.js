const dbPool = require('../../../db');

class EmailAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailAlreadyExists';
        this.message = 'Email Already Exists';
        this.code = 'EMAIL_ALREADY_EXISTS';
    }
}


module.exports = async (req, res, next) => {
    try {
        sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        const results = await dbPool.execute(sql, [req.body.email])

        const rowCount = results[0]['count'] > 0;
        if (rowCount > 0){
            console.log(new EmailAlreadyExists('Email already exists'));
            return res.status(400).send('Email already exists');
        }

        else next();
    } catch (err) {
        console.error('An error occurred while executing the query: ' + err);  
        res.status(500).send('An error occurred while executing the query: ' + err);
    }
}