const Board = require('../board');
const recommendBestMove = require('../utils/recommend-best-move');
const { playerX, playerO, _ } = require('./stubs/player');
const position = require('./stubs/position');

const X = playerX.symbol;
const O = playerO.symbol;

describe("recommend-best-move", () => {
  describe("recommends winning moves", () => {
    it("will recommend a diagonal winning move", () => {
      const board = new Board([
        O , O , X ,
        _ , X , _ ,
        _ , _ , _ ,
      ]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(position.BOTTOM_LEFT);
    });

    it("will recommend a horizontal winning move", () => {
      const board = new Board([
        O , _ , O ,
        O , X , _ ,
        X , _ , _ ,
      ]);

      expect(recommendBestMove(board, playerO, playerX)).toBe(position.TOP_MIDDLE);
    });

    it("will recommend a vertical winning move", () => {
      const board = new Board([
        O , _ , O ,
        _ , X , _ ,
        X , _ , _ ,
      ]);

      expect(recommendBestMove(board, playerO, playerX)).toBe(position.TOP_MIDDLE);
    });

    it("will recommend for the correct symbol in a tie-breaking winning move", () => {
      const board = new Board([
        O , _ , X ,
        O , X , _ ,
        _ , _ , _ ,
      ]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(position.BOTTOM_LEFT);
    });

    it("will recommend the center square given an empty board", () => {
      const board = new Board([
        _ , _ , _ ,
        _ , _ , _ ,
        _ , _ , _ ,
      ]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(position.MIDDLE_MIDDLE);
    });
  });
});
