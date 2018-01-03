const Board = require("../../board");
const Player = require("../../player");

const X = "X";
const O = "O";

exports._ = Board.EMPTY_SPOT_SYMBOL;
exports.X = X;
exports.O = "O";
exports.playerX = new Player(X);
exports.playerO = new Player(O);
