const session = require('express-session');
// Session Middleware
module.exports = function sessionMiddleware (app) {
    app.use(session({
        secret: 'your secret key',
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: process.env.NODE_ENV === 'development'} to solve why it cant work in development
        cookie: { secure: false }
    }));
};
    