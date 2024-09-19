module.exports = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        else next();
    } catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while validating fields: ' + error });
    }
}