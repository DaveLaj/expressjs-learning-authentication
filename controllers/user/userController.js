const db = require('../../db');
const bcrypt = require('bcrypt');
const util = require('util');
db.query = util.promisify(db.query);



// ---------------------------------------------------------------------------------------------------------------------

exports.register = async(req, res) => {
    // Hash password
    try {
        const salt = await bcrypt.genSalt(10);
        hasPassword = await bcrypt.hash(req.body.password, salt);
    }
    catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while hashing password: ' + error });
    }
    // Define user roles and assign user_type_id into INT
    const roles = Object.freeze({
        "ADMIN": 1,
        "USER": 2
    })
    user_type_id = roles[req.body.user_type_id]

    // Process to insert data into the database
    var sql="INSERT INTO users (email, name, password, user_type_id, created_at) VALUES ('"+req.body.email+"', '"+req.body.username+"', '"+hasPassword+"', '"+user_type_id+"', NOW())";
    try {
        insert = await db.query(sql);
        console.log('User registered successfully');
        return res.redirect('/auth/login');
    }
    catch (error) {
        console.error('An error occurred: ' + error);
        return res.status(500).send({ message: 'An error occurred while inserting values to table: ' + error });
    }
};

exports.login = async(req, res) => {

    // get user details
    var sql = "SELECT * FROM users WHERE email = '"+req.body.email+"' LIMIT 1";
    try {
        user = await db.query(sql);
    } catch(err) {
        console.error('An error occurred: ' + err);
        return res.status(500).send({ message: 'An error occurred while fetching user details: ' + err });
    }
    
    // confirm if passwords match
    try {
        var isMatch = await bcrypt.compare(req.body.password, user[0].password);
        if (!isMatch){
            return res.status(400).send({ message: 'Invalid password'});
        }
        else {
            // create session if authenticated
            req.session.user = user[0];
            req.session.save();
            res.redirect('/board/');
        }
    } catch(err) {
        console.error('An error occurred while comparing password hashes: ' + err);
        return res.status(500).send({ message: 'An error occurred while comparing password hashes: ' + err });
    }
}

exports.logout = function (req, res){
    req.session.destroy();
    res.redirect('/auth/login');
}

exports.showRegistration = function (req, res){
    res.render('register');
}

exports.showLogin = function (req, res){
    res.render('login');
}

// ---------------------------------------------------------------------------------------------------------------------
// Support functions
// ---------------------------------------------------------------------------------------------------------------------

















// exports.register = async (req, res) => {
//     //Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hasPassword = await bcrypt.hash(req.body.password, salt);

//     // Create an user object
    // let user = new User({
    //     email: req.body.email,
    //     name: req.body.name,
    //     password: hasPassword,
    //     user_type_id: req.body.user_type_id
    // })

//     // Save User in the database
//     user.save((err, registeredUser) => {
//         if (err) {
//             console.log(err)
//         } else {
//             // create payload then Generate an access token
//             let payload = { id: registeredUser._id, user_type_id: req.body.user_type_id || 0 };
//             const token = jwt.sign(payload, config.TOKEN_SECRET);
//             res.status(200).send({ token })
//         }
//     })
// }


