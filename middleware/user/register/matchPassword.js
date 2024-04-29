module.exports = function (req, res, next) {
    if (req.body.password === req.body.confirmPassword) {
        next();
    } else {
        return res.status(400).send('Passwords do not match');
    }
}