module.exports = async (req, res, next) => {
    try{
        if (/\S+@\S+\.\S+/.test(req.body.email)) {
            next();
        }
        else return res.status(400).send({ message:'Invalid email' });
    } catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while validating email: ' + error });
    }
}
