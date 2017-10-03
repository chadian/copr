const Board = require('../board');
const scoreBoard = require('../utils/score-board');
const { playerX, playerO, _ } = require('./stubs/player');
const position = require('./stubs/position');

const X = playerX.symbol;
const O = playerO.symbol;

describe("score-board", () => {
  it("scores a board resulting in a win", () => {
    const board = new Board([
      X , _ , _ ,
      O , X , _ ,
      O , _ , X ,
    ]);

    expect(scoreBoard(board, playerX, playerO)).toBe(1);
  });

  it("scores a board resulting in a draw", () => {
    const board = new Board([
      X , O , X ,
      O , X , O ,
      O , X , O ,
    ]);

    expect(scoreBoard(board, playerX, playerO)).toBe(0);
  });
});
