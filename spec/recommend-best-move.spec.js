import Board from "../src/board";
import Player from "../src/player";
import recommendBestMove, {
  rawRecommendBestMove
} from "../src/utils/recommend-best-move";
import { playerX, playerO, _ } from "./stubs/player";
import * as position from "./stubs/position";
import { clearCache, getCacheHits } from "../src/utils/cache";

const X = playerX.symbol;
const O = playerO.symbol;

describe("recommend-best-move", () => {
  describe("recommends winning moves", () => {
    it("will recommend a diagonal winning move", () => {
      const board = new Board([O, O, X, _, X, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.BOTTOM_LEFT
      );
    });

    it("will recommend a horizontal winning move", () => {
      const board = new Board([O, _, O, O, X, _, X, _, _]);

      expect(recommendBestMove(board, playerO, playerX)).toBe(
        position.TOP_MIDDLE
      );
    });

    it("will recommend a vertical winning move", () => {
      const board = new Board([O, _, O, _, X, _, X, _, _]);

      expect(recommendBestMove(board, playerO, playerX)).toBe(
        position.TOP_MIDDLE
      );
    });

    it("will recommend for the correct symbol in a tie-breaking winning move", () => {
      const board = new Board([O, _, X, O, X, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.BOTTOM_LEFT
      );
    });
  });

  describe("follows what I would think is common sense...", () => {
    it("will recommend the center square given an empty board", () => {
      const board = new Board([_, _, _, _, _, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.MIDDLE_MIDDLE
      );
    });

    it("will choose to block a player", () => {
      const board = new Board([O, _, _, X, X, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.MIDDLE_RIGHT
      );
    });
  });

  describe("handles example boards", () => {
    it("🐸", () => {
      const board = new Board([_, X, X, _, O, _, _, _, _]);

      expect(recommendBestMove(board, playerX, playerO)).toBe(
        position.TOP_LEFT
      );
    });
  });

  describe("cache", () => {
    beforeEach(() => {
      clearCache();
    });

    it("pulls from cache on subsequent calls with the same args", () => {
      const board = new Board([X, O, _, _, _, _, _, _, _]);

      const initialRecommendation = recommendBestMove(board, playerX, playerO);
      expect(getCacheHits(rawRecommendBestMove)).toBe(0);

      // make another call
      expect(recommendBestMove(board, playerX, playerO)).toBe(
        initialRecommendation
      );

      expect(getCacheHits(rawRecommendBestMove)).toBe(1);
    });

    it("pulls from cache a generic solution given the same board with different players", () => {
      const board = new Board([X, _, O, X, _, _, _, _, _]);

      const initialRecommenation = recommendBestMove(board, playerX, playerO);
      expect(getCacheHits(rawRecommendBestMove)).toBe(0);

      const A = "😀";
      const B = "👾";
      const playerA = new Player(A);
      const playerB = new Player(B);
      const abBoardArray = board
        .toArray()
        .join(",")
        .replace(X, A)
        .replace(O, B)
        .split(",");

      const abBoard = new Board(abBoardArray);

      expect(recommendBestMove(abBoard, playerA, playerB)).toBe(
        initialRecommenation
      );

      expect(getCacheHits(rawRecommendBestMove)).toBe(1);
    });
  });
});
