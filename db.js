const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth'
});

connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the DB: ' + error.stack);
    return;
    }
console.log('Connected to the DB with id ' + connection.threadId);
});


module.exports = connection;