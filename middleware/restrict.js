const dbPool = require('../db');
const sql = require('mysql2/promise');

async function loggedIn (req, res, next) {
    try {
        if(req.session.user) {
            next();
            return;
        }
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
    }
}

async function isAdmin (req, res, next){
    try {
        if(req.session.user.user_type_id === 1) {
            next()
            return;
        }
        res.status(403).send({ message: 'Only Admins are allowed to view this page' })
    } catch (error) {
        console.error(error);
    }
}

async function isUser (req, res, next){
    try {
        if (typeof req.session.user.user_type_id != 'number') {
            res.status(400).send({ message: 'User type is not defined' });
            return;
        } 
        if(req.session.user.user_type_id === 2) {
            next();
            return;        
        };
        res.status(403).send({ message: 'Only Users are allowed to view this page' });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { loggedIn, isAdmin, isUser };