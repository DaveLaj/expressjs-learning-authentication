var express = require('express');
var board = express.Router();
const restrict = require('../middleware/restrict');
const boardController = require('../controllers/board/boardController');

board.get('/', restrict.loggedIn, restrict.isUser, boardController.showBoard);
board.get('/random', function(req, res){
    req.body.num = 100;
    boardController.showRandomPage(req, res);
});
module.exports = board;