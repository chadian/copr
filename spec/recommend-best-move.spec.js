const proxyquire = require('proxyquire');

const Board = require('../src/board');
const Player = require('../src/player');
const recommendBestMove = require('../src/utils/recommend-best-move');
const { playerX, playerO, _ } = require('./stubs/player');
const position = require('./stubs/position');

const X = playerX.symbol;
const O = playerO.symbol;

describe('recommend-best-move', () => {
  describe('recommends winning moves', () => {
    it('will recommend a diagonal winning move', () => {
      const board = new Board([O, O, X, _, X, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.BOTTOM_LEFT
      );
    });

    it('will recommend a horizontal winning move', () => {
      const board = new Board([O, _, O, O, X, _, X, _, _]);

      expect(recommendBestMove(board, playerO, playerX)).toBe(
        position.TOP_MIDDLE
      );
    });

    it('will recommend a vertical winning move', () => {
      const board = new Board([O, _, O, _, X, _, X, _, _]);

      expect(recommendBestMove(board, playerO, playerX)).toBe(
        position.TOP_MIDDLE
      );
    });

    it('will recommend for the correct symbol in a tie-breaking winning move', () => {
      const board = new Board([O, _, X, O, X, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.BOTTOM_LEFT
      );
    });
  });

  describe('follows what I would think is common sense...', () => {
    it('will recommend the center square given an empty board', () => {
      const board = new Board([_, _, _, _, _, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.MIDDLE_MIDDLE
      );
    });

    it('will choose to block a player', () => {
      const board = new Board([O, _, _, X, X, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.MIDDLE_RIGHT
      );
    });
  });

  describe('handles example boards', () => {
    it('🐸', () => {
      const board = new Board([_, X, X, _, O, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.TOP_LEFT
      );
    });
  });

  describe('cache', () => {
    let spiedRecommendBestMove;
    let scoreBoardSpy;

    beforeEach(() => {
      const scoreBoard = require('../src/utils/score-board');
      // just re-hooking up the same module to itself but
      // attaching the `scoreBoardSpy` first
      const moduleStub = {
        './score-board': scoreBoard
      };

      scoreBoardSpy = spyOn(moduleStub, './score-board').and.callThrough();
      spiedRecommendBestMove = proxyquire(
        '../src/utils/recommend-best-move',
        moduleStub
      );
    });

    afterEach(() => {
      // safe guard, turning off proxyquire
      proxyquire.preserveCache();
    });

    it('pulls from cache on subsequent calls with the same args', () => {
      const board = new Board([X, O, _, _, _, _, _, _, _]);

      // call for move recommendation on spy
      const initialRecommendation = spiedRecommendBestMove(
        board,
        playerX,
        playerO
      );

      // given the board, each empty spot will be called once with
      // `scoreBoard` _within_ `recommend-best-move` once. Recursive
      // calls of `scoreBoard` on itself will not be captured by the spy
      // since the spy has only been applied via proxyquiring the
      // `recommend-best-move` module.
      expect(scoreBoardSpy.calls.count()).toBe(7);

      // make another call
      expect(spiedRecommendBestMove(board, playerX, playerO)).toBe(
        initialRecommendation
      );

      // relying on cache, no additional calls to scoreBoard should have been made
      expect(scoreBoardSpy.calls.count()).toBe(7);
    });

    it('pulls from cache a generic solution given the same board with different players', () => {
      const board = new Board([X, _, O, X, _, _, _, _, _]);

      const initialRecommenation = spiedRecommendBestMove(
        board,
        playerX,
        playerO
      );

      // each empty spot will be called once with
      // `scoreBoard` _within_ `recommend-best-move` once. Recursive
      // calls of `scoreBoard` on itself will not be captured by the spy
      // since the spy has only been applied via proxyquire within
      // `recommend-best-move`.
      // six empty spots on the board => 6 calls
      expect(scoreBoardSpy.calls.count()).toBe(6);

      const A = '😀';
      const B = '👾';
      const playerA = new Player(A);
      const playerB = new Player(B);
      const abBoardArray = board
        .toArray()
        .join(',')
        .replace(X, A)
        .replace(O, B)
        .split(',');

      const abBoard = new Board(abBoardArray);

      expect(spiedRecommendBestMove(abBoard, playerA, playerB)).toBe(
        initialRecommenation
      );

      // still only six calls were made, memoized on generic solution
      // regardless of players passed in
      expect(scoreBoardSpy.calls.count()).toBe(6);
    });
  });
});
