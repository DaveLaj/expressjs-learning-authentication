module.exports = function (req, res, next) {
    if (/\S+@\S+\.\S+/.test(req.body.email)) {
        next();
    }
    else return res.status(400).send({ message:'Invalid email' });
}
