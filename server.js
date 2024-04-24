// Description: Main entry point for the application.
const express = require('express');
const app = express();
const path = require('path');
var router = require('./routes/index');



// specify engine and view folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the router
app.use('/', router);  

// specify the port
const port = 3000;
// listen to the port
app.listen(port, function(){console.log(`Server is running on port ${port}`)});

module.exports = app;