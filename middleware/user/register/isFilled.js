module.exports = async (req, res, next) => { 
    try { 
        if (!req.body.email || !req.body.username || !req.body.password || !req.body.confirmPassword) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        next();
    } catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while validating fields: ' + error });
    }
}