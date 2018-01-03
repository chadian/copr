const Board = require("../board");
const scoreBoard = require("../utils/score-board");
const { playerX, playerO, _ } = require("./stubs/player");
const position = require("./stubs/position");

const X = playerX.symbol;
const O = playerO.symbol;

describe("score-board", () => {
  it("scores a board resulting in a win", () => {
    const board = new Board([X, _, _, O, X, _, O, _, X]);

    expect(scoreBoard(board, playerX, playerO, playerX)).toBe(1);
  });

  it("scores a board resulting in a loss", () => {
    const board = new Board([X, _, _, O, X, _, O, _, X]);

    expect(scoreBoard(board, playerO, playerO, playerX)).toBe(-1);
  });

  it("scores a board resulting in a draw", () => {
    const board = new Board([X, O, X, O, X, O, O, X, O]);

    expect(scoreBoard(board, playerO, playerX, playerO)).toBe(0);
  });

  describe("scores mirrored boards with the same score", () => {
    it("is the same for + cross moves", () => {
      const top = new Board([_, X, _, _, _, _, _, _, _]);

      const left = new Board([_, _, _, X, _, _, _, _, _]);

      const right = new Board([_, _, _, _, _, X, _, _, _]);

      const bottom = new Board([_, _, _, _, _, _, _, X, _]);

      expect(scoreBoard(top, playerX, playerX, playerO)).toBe(
        scoreBoard(right, playerX, playerX, playerO)
      );

      expect(scoreBoard(right, playerX, playerX, playerO)).toBe(
        scoreBoard(bottom, playerX, playerX, playerO)
      );

      expect(scoreBoard(bottom, playerX, playerX, playerO)).toBe(
        scoreBoard(left, playerX, playerX, playerO)
      );
    });

    it("is the same for corner moves", () => {
      const topLeftBoard = new Board([X, _, _, _, _, _, _, _, _]);

      const topRightBoard = new Board([_, _, X, _, _, _, _, _, _]);

      const bottomLeftBoard = new Board([_, _, _, _, _, _, X, _, _]);

      const bottomRightBoard = new Board([_, _, _, _, _, _, _, _, X]);

      expect(scoreBoard(topLeftBoard, playerX, playerX, playerO)).toBe(
        scoreBoard(topRightBoard, playerX, playerX, playerO)
      );

      expect(scoreBoard(topRightBoard, playerX, playerX, playerO)).toBe(
        scoreBoard(bottomLeftBoard, playerX, playerX, playerO)
      );

      expect(scoreBoard(bottomLeftBoard, playerX, playerX, playerO)).toBe(
        scoreBoard(bottomRightBoard, playerX, playerX, playerO)
      );
    });
  });
});
