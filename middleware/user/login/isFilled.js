module.exports = function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    else next();
}