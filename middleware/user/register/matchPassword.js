module.exports = async (req, res, next) => {
    try {
        if (req.body.password === req.body.confirmPassword) {
            next();
            return;
        }
        return res.status(401).send('Passwords do not match');
    } catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while validating passwords: ' + error });
    }
}