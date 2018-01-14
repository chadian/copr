const Board = require('../../src/board');
const Player = require('../../src/player');

const X = 'X';
const O = 'O';

exports._ = Board.EMPTY_SPOT_SYMBOL;
exports.X = X;
exports.O = 'O';
exports.playerX = new Player(X);
exports.playerO = new Player(O);
