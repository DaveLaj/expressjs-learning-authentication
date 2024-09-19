const dbPool = require('../../db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

exports.register = async(req, res) => {
    req.body.user_type_id = "USER";

    try {
        const salt = await bcrypt.genSalt(10);
        hasPassword = await bcrypt.hash(req.body.password, salt);
    }
    catch (error) {
        console.error('An error occurred: ' + error);
        if (process.env.NODE_ENV === 'Development') {
            return res.status(500).send({ message: 'An error occurred while hashing password: ' + error });
        }
        return res.status(500).send({ message: 'An error occurred while hashing password: '});
    }
    // Define user roles and assign user_type_id into INT
    const roles = Object.freeze({
        "ADMIN": 1,
        "USER": 2
    })
    const user_type_id = roles[req.body.user_type_id]

    // Process to insert data into the database
    // Define SQL query with method to avoid injection
    let sql = "INSERT INTO users (email, name, password, user_type_id, created_at) VALUES (?, ?, ?, ?, NOW())";
    const inserts = [req.body.email, req.body.username, hasPassword, user_type_id];
    sql = mysql.format(sql, inserts);    
    try {
        await dbPool.execute(sql).catch(err => { console.log(err) }); // FIX ME!!!
        console.log('User registered successfully');
        return res.redirect('/auth/login');
    }
    catch (error) {
        console.error('An error occurred: ' + error);
        if (process.env.NODE_ENV === 'Development') {
            return res.status(500).send({ message: 'An error occurred while inserting values to table: ' + error });
        }
        return res.status(500).send({ message: 'An error occurred while inserting values to table: ' + error });
    }
};

exports.login = async(req, res) => {
    // get user details
    const sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
    const sqlFormat = mysql.format(sql, [req.body.email]);

    try {
        const user = await dbPool.execute(sqlFormat)

        const isMatch = await bcrypt.compare(req.body.password, user[0].password);
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
        console.error('An error occurred during login: ' + err);
        if (process.env.NODE_ENV === 'Development') {
            return res.status(500).send({ message: 'An error occurred during login: ' + err });
        }
        return res.status(500).send({ message: 'An error occurred during login' });
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


