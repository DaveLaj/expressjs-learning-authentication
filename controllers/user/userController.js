const db = require('../../db');
const bcrypt = require('bcrypt');
var mysql = require('mysql');

// Use db to interact with the database
// db.query('SELECT * FROM users', (error, results, fields) => {
//   if (error) {
//     console.error('An error occurred while executing the query: ' + error.stack);
//     return;
//   }
//   console.log(results);
// });



exports.register = async(req, res) => {

    // check if all fields are filled
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.confirmPassword|| !req.body.user_type_id) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    

    // check if email is valid
    if (!/\S+@\S+\.\S+/.test(req.body.email)) {
        return res.status(400).send({ message: 'Invalid email address' });
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

    // Establish connection to database
    // var con=mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "auth"
    // })
    // Process to insert data into the database
    var sql="INSERT INTO users (email, name, password, user_type_id, created_at) VALUES ('"+req.body.email+"', '"+req.body.username+"', '"+hasPassword+"', '"+user_type_id+"', NOW())";
    
    db.query(sql, (error, results, fields) => {
        if (error) {
          console.error('An error occurred while executing the query: ' + error.stack);
          return;
        }
        console.log("1 record inserted");
    });
};

exports.showRegistration = function (req, res){
    res.render('register');
}

exports.showLogin = function (req, res){
    res.render('login');
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


