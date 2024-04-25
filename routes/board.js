var express = require('express');
var board = express.Router();
const boardController = require('../controllers/board/boardController');

board.get('/page', boardController.showBoard);

module.exports = board;