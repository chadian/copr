import Board from "../src/board";
import { X, O, _ } from "./stubs/player";
import * as position from "./stubs/position";

describe("Board", () => {
  describe("constructor", () => {
    it("provides an array of empty spots if one is not given", () => {
      expect(new Board().toArray()).toEqual([
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,

        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,

        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL
      ]);
    });

    it("pads an array given with empty spots", () => {
      const board = new Board(["A", "B"]);
      expect(board.toArray()).toEqual([
        "A",
        "B",
        Board.EMPTY_SPOT_SYMBOL,

        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,

        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL
      ]);
    });
  });

  describe("#symbolAtSpot", () => {
    it("returns the correct symbol at a given spot", () => {
      const board = new Board([X, O, O, O, _, O, O, O, O]);

      expect(board.symbolAtSpot(position.TOP_LEFT)).toBe(X);
      expect(board.symbolAtSpot(position.MIDDLE_MIDDLE)).toBe(_);
    });

    it("returns null for out of bounds", () => {
      const board = new Board([X, O, O, O, _, O, O, O, O]);

      expect(board.symbolAtSpot(9)).toBe(null);
    });
  });
});
