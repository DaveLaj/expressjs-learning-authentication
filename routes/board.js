var express = require('express');
var board = express.Router();
const restrict = require('../middleware/restrict');
const boardController = require('../controllers/board/boardController');

board.get('/', restrict.isUser, restrict.loggedIn, boardController.showBoard);


module.exports = board;