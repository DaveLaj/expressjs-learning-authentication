const passwordValidator = require('password-validator');
var schema = new passwordValidator();


module.exports = async (req, res, next) => {
    try {
        schema.is().min(8) // Minimum length 8
        .is().max(100) // Maximum length 100
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits(1) // Must have at least 1 digit
        .has().not().spaces() // Should not have spaces
        .has().symbols(1) // Must have at least 1 symbol
        .is().not().oneOf(
            ['Passw0rd', 'Password123', '12345678', 'qwerty', 'abc123',
            'letmein', 'trustno1', 'admin', 'welcome', 'football', 'iloveyou', 
            'monkey', '123123', '1234', '12345', '123456', '1234567', '12345678', 
            '123456789', '1234567890', 'password', 'password1', 'password12',
            'password123', 'password1234', 'password12345', 'password'
        ]); // Blacklist these values

        if (schema.validate(req.body.password)) {
            next();
            return;
        };

        res.status(400).send({ message: 'Password does not meet the requirements' });
    } catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while validating password: ' + error });
    }
}
