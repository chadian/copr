const Board = require('../src/board');
const { X, O, _ } = require('./stubs/player');
const postion = require('./stubs/position');

describe('Board', () => {
  describe('constructor', () => {
    it('provides an array of empty spots if one is not given', () => {
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

    it('pads an array given with empty spots', () => {
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
        Board.EMPTY_SPOT_SYMBOL
      ]);
    });
  });

  describe('#symbolAtSpot', () => {
    it('returns the correct symbol at a given spot', () => {
      const board = new Board([X, O, O, O, _, O, O, O, O]);

      expect(board.symbolAtSpot(postion.TOP_LEFT)).toBe(X);
      expect(board.symbolAtSpot(postion.MIDDLE_MIDDLE)).toBe(_);
    });

    it('returns null for out of bounds', () => {
      const board = new Board([X, O, O, O, _, O, O, O, O]);

      expect(board.symbolAtSpot(9)).toBe(null);
    });
  });
});
