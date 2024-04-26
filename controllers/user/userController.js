const db = require('../../db');
const bcrypt = require('bcrypt');
const util = require('util');
db.query = util.promisify(db.query);
const jwt = require('jsonwebtoken');


// ---------------------------------------------------------------------------------------------------------------------

exports.register = async(req, res) => {

    // check if all fields are filled
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.confirmPassword|| !req.body.user_type_id) {
        return res.status(400).send({ message: 'All fields are required' });
    }


    // check if email is valid
    if (!(await emailValid(req.body.email))) {
        return res.status(400).send({ message: 'Email is not valid.' });
    } else {
        console.log('Email is valid');
    }

    // check if email exists
    try {
        const exists = await emailExists(req.body.email);
        if (exists) {
            return res.status(400).send({ message: 'Email Already Exists' });
        } else {
            console.log('Email does not exist');
        }
    } catch (error) {
        console.error('An error occurred: ' + error.stack);
    }
    // confirm if passwords match
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({ message: 'Passwords do not match' });
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);
    


    // Define user roles and assign user_type_id into INT
    const roles = Object.freeze({
        "ADMIN": 1,
        "USER": 2
    })
    user_type_id = roles[req.body.user_type_id]

    // Process to insert data into the database
    var sql="INSERT INTO users (email, name, password, user_type_id, created_at) VALUES ('"+req.body.email+"', '"+req.body.username+"', '"+hasPassword+"', '"+user_type_id+"', NOW())";
    
    db.query(sql, (error, results, fields) => {
        if (error) {
          console.error('An error occurred while inserting into database: ' + error.stack);
          return;
        }
        console.log('Successfully Registered')
        res.redirect('/auth/loginpage')
    });
};

exports.login = async(req, res) => {
    
    // check if all fields are filled
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    // check if email is valid
    try {
        const valid = await emailValid(req.body.email);
        if (!valid) {
            return res.status(400).send({ message: 'Email is not valid.' });
        } else {
            console.log('Email is valid');
        }
    }
    catch (error) {
        console.error('An error occurred: ' + error.stack);
    }
    // check if email exists
    try {
        const exists = await emailExists(req.body.email);
        if (!exists) {
            return res.status(400).send({ message: 'Email does not exist' });
        } else {
            console.log('Email exists');
        }
    }
    catch (error) {
        console.error('An error occurred: ' + error.stack);
    }

    // get user details
    var sql = "SELECT * FROM users WHERE email = '"+req.body.email+"' LIMIT 1";
    const user = await db.query(sql);
    
    // confirm if passwords match
    var isMatch = await bcrypt.compare(req.body.password, user[0].password);
    if (!isMatch){
        return res.status(400).send({ message: 'Invalid password'});
    }
    else {
        // create payload
        let payload = { id: user[0].id };
        // Generate an access token
        const testtoken = jwt.sign(payload, "secret", { expiresIn: '1h' });
        // store token in cookie
        res.cookie('token', testtoken, { httpOnly: true });
        res.redirect('/board/page');
    }
}

exports.logout = function (req, res){
    res.clearCookie('token');
    console.log('Logged out');
    res.redirect('/auth/loginpage');
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


// check if email exists
emailExists = async function(email) {
    try {
        // place await to wait for the query to finish executing
        const results = await db.query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
        return results[0]['count'] > 0;
    } catch (error) {
        console.error('An error occurred while executing the query: ' + error.stack);
        throw error; // re-throw the error so it can be caught and handled by the caller
    }
}

// checks if email is valid
emailValid = async function(email) {
    try{
        if (!/\S+@\S+\.\S+/.test(email)) {
            return false;
        }
        else return true;
    } catch (error) {
        console.error('An error occurred while verifying the email: ' + error.stack);
        throw error; // re-throw the error so it can be caught and handled by the caller
    }
}















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


