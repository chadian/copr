const Board = require('../board');

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
        Board.EMPTY_SPOT_SYMBOL,
      ]);
    });

    it("pads an array given with empty spots", () => {
      const board = new Board(['A', 'B']);
      expect(board.toArray()).toEqual([
        'A',
        'B',
        Board.EMPTY_SPOT_SYMBOL,

        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,

        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
        Board.EMPTY_SPOT_SYMBOL,
      ]);
    });
  });
});
