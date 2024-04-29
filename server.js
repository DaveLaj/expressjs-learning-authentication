// Description: Main entry point for the application.
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// specify engine and view folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Deploy the middleware
// custom middleware

// built-in middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: process.env.NODE_ENV === 'development'} to solve why it cant work in development
    cookie: { secure: false }
}));
// use the router
app.use('/board', require('./routes/board'));
app.use('/auth', require('./routes/auth'));

// landing page
app.get('/', (req, res) => {
    res.render('index');
});

// specify the port
const port = 3000;
// listen to the port
app.listen(port, function(){console.log(`Server is running on port ${port}`)});

module.exports = app;