const session = require('express-session');
// Session Middleware
module.exports = function sessionMiddleware (app) {
    app.use(session({
        secret: 'your secret key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
};
    