const proxyquire = require('proxyquire');

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
  });

  describe("follows what I would think is common sense...", () => {
    it("will recommend the center square given an empty board", () => {
      const board = new Board([
        _ , _ , _ ,
        _ , _ , _ ,
        _ , _ , _ ,
      ]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(position.MIDDLE_MIDDLE);
    });
  });

  describe("cache", () => {
    let spiedRecommendBestMove;
    let scoreBoardSpy;

    beforeEach(() => {
      const scoreBoard = require('../utils/score-board');
      // just re-hooking up the same module to itself but
      // attaching the `scoreBoardSpy` first
      const moduleStub = {
        './score-board': scoreBoard
      };

      scoreBoardSpy = spyOn(moduleStub, './score-board').and.callThrough();
      spiedRecommendBestMove = proxyquire('../utils/recommend-best-move', moduleStub);
    });

    afterEach(() => {
      // safe guard, turning off proxyquire
      proxyquire.preserveCache();
    })

    it("pulls from cache on subsequent calls with the same args", () => {
      const board = new Board([
        _ , _ , _ ,
        _ , _ , _ ,
        _ , _ , _ ,
      ]);

      // call for move recommendation, result should be accurate
      expect(spiedRecommendBestMove(board, playerX, playerO)).toBe(position.MIDDLE_MIDDLE);

      // given an empty board, each spot will be called once with
      // `scoreBoard` _within_ `recommend-best-move` once. Recursive
      // calls of `scoreBoard` on itself will not be captured by the spy
      // since the spy has only been applied via proxyquire within
      // `recommend-best-move`.
      expect(scoreBoardSpy.calls.count()).toBe(9);

      // make another call, result should be accurate
      expect(spiedRecommendBestMove(board, playerX, playerO)).toBe(position.MIDDLE_MIDDLE);

      // relying on cache, no additional calls to scoreBoard should have been made
      expect(scoreBoardSpy.calls.count()).toBe(9);
    });
  });
});
