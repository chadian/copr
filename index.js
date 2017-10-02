const Board = require('./board');
const Player = require('./player');
const recommendBestMove = require('./utils/recommend-best-move');

const X = 'X';
const O = 'O';
const _ = Board.EMPTY_SPOT_SYMBOL;
const boardArray = [
  X , _ , _ ,
  O , X , _ ,
  O , _ , _ ,
];
const board = new Board(boardArray);
const david = new Player(X);
const copr = new Player(O);

console.log('Starting with:');
console.log(board.toString());

const bestMoveForDavid = recommendBestMove(board, david);
console.log('best move for david', bestMoveForDavid);
