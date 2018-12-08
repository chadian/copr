import Board from "../src/board";
import winnerOfBoard from "../src/utils/winner-of-board";
import { X, O, _ } from "./stubs/player";

describe("winner-of-board", () => {
  describe("returns the winning character of a board", () => {
    it("handles the X character", () => {
      const board = new Board([X, _, _, O, X, _, O, _, X]);

      expect(winnerOfBoard(board)).toBe(X);
    });

    it("it handles the Y character", () => {
      const board = new Board([O, _, X, O, X, _, O, _, _]);

      expect(winnerOfBoard(board)).toBe(O);
    });
  });

  it("returns null if there is no winning character", () => {
    const board = new Board([O, _, X, O, X, _, _, _, _]);

    expect(winnerOfBoard(board)).toBe(null);
  });

  describe("handles various patterns of winning characters", () => {
    it("handles a diagonal winner", () => {
      const board = new Board([O, _, X, O, X, _, X, _, _]);

      expect(winnerOfBoard(board)).toBe("X");
    });

    it("it handles a vertical winner", () => {
      const board = new Board([O, O, O, _, X, _, _, _, X]);

      expect(winnerOfBoard(board)).toBe("O");
    });

    it("handles a horizontal winner", () => {
      const board = new Board([O, _, _, O, X, _, O, _, X]);

      expect(winnerOfBoard(board)).toBe("O");
    });
  });
});
