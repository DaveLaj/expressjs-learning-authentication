module.exports = function (req, res, next) {
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.confirmPassword) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    else next();
}