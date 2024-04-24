const db = require('../../db'); // adjust the path according to your project structure
var mysql = require('mysql');

// Use db to interact with the database
db.query('SELECT * FROM users', (error, results, fields) => {
  if (error) {
    console.error('An error occurred while executing the query: ' + error.stack);
    return;
  }
  console.log(results);
});


exports.register = function(req, res){
    
    // Establish connection to database
    var con=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "auth"
    })
    // Process to insert data into the database
    con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql="INSERT INTO users (email, name, password, user_type_id) VALUES ('"+req.body.email+"', '"+req.body.name+"', '"+req.body.password+"', '"+req.body.user_type_id+"')";
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log("1 record inserted");
        })
    })
};


















exports.register = async (req, res) => {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hasPassword,
        user_type_id: req.body.user_type_id
    })

    // Save User in the database
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            // create payload then Generate an access token
            let payload = { id: registeredUser._id, user_type_id: req.body.user_type_id || 0 };
            const token = jwt.sign(payload, config.TOKEN_SECRET);
            res.status(200).send({ token })
        }
    })
}


