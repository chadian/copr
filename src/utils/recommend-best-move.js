import Board from "../board.js";
import scoreBoard from "./score-board.js";
import { memoizeBoardWithPlayers } from "./cache.js";

function recommendBestMove(board, previousPlayer, nextPlayer) {
  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);

  // with an empty board, choose the middle
  if (emptySpots.length === board.toArray().length) {
    return 4;
  }

  // find the best move based on scores of available spots
  const bestMove = emptySpots.reduce(
    (bestMove, emptySpot) => {
      const score = scoreBoard(
        board.makeMove(emptySpot, nextPlayer.symbol),
        nextPlayer,
        nextPlayer,
        previousPlayer
      );

      const move = {
        spot: emptySpot,
        score
      };

      return bestMove.score > move.score ? bestMove : move;
    },
    {
      // set score to ultimately low number so any any
      // comparison score is greater
      score: Number.NEGATIVE_INFINITY
    }
  );

  // should have a move with a numbered spot index on the board
  if (typeof bestMove.spot !== "number") {
    throw new Error("Unable to determine a recommended best move for board");
  }

  return bestMove.spot;
}

export default memoizeBoardWithPlayers(recommendBestMove);
