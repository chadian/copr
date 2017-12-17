const Board = require('../board');
const recommendationHash = require('../utils/recommendations-hash');
const Player = require('../player');
const { playerX, playerO, _ } = require('./stubs/player');

const X = playerX.symbol;
const O = playerO.symbol;

let allMovesHash;

// the recommendations-hash represents a lot of duplication
// with recommend-best-move, but these tests provide reassurance
// for the serialization of recommendations to the hash

describe('recommendations-hash', () => {

  beforeEach(() => {
    allMovesHash = recommendationHash(Board.generateEmptyBoard(), playerO, playerX);
  });

  // this test ensures that the human player always gets the first move
  it("does not have a recommendation for an empty board", () => {
      const board = [
        _, _, _,
        _, _, _,
        _, _, _
      ]
      const recommendation = allMovesHash[new Board(board).toArray().toString()];
      expect(recommendation).toBe(undefined);
  });

  describe("blocking sample", () => {
    it("🐸", () => {
      const board = [
        _, X, X,
        _, _, _,
        _, O, _
      ];

      const recommendation = allMovesHash[new Board(board).toArray().toString()];
      expect(recommendation).toBe(0);
    });
  });

});
