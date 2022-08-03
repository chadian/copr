import Board from "../board.js";
import { memoizeBoardWithPlayers } from "./cache.js";
import winnerOfBoard from "./winner-of-board.js";

const memoizedBuild = memoizeBoardWithPlayers(buildMoveTree);

function buildMoveTree(board, previousPlayer, nextPlayer) {
  const node = { board };
  node.previousPlayer = previousPlayer;
  node.nextPlayer = nextPlayer;

  let children;
  if (winnerOfBoard(board)) {
    children = [];
  } else {
    children = board
      .spotsForSymbol(Board.EMPTY_SPOT_SYMBOL)
      .map(spot =>
        buildMoveTree(
          board.makeMove(spot, nextPlayer.symbol),
          nextPlayer,
          previousPlayer
        )
      );
  }

  node.children = children;

  return node;
}

export default memoizedBuild;
