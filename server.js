// Description: Main entry point for the application.
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'Development' ? false : true },
}));

// routes
app.use('/board', require('./routes/board'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.render('index');
    _ = req
});

app.get('/_health', (req, res) => {
    res.status(200).send('ok')
    _ = req
})

app.listen(process.env.APP_PORT, function(){console.log(`Server is running on port http://localhost:${process.env.APP_PORT}`)});

module.exports = app;