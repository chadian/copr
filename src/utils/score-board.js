import winnerOfBoard from "./winner-of-board.js";
import buildMoveTree from "./build-move-tree.js";

const POINTS = {
  WIN: 1,
  DRAW: 0,
  LOSS: -1
};

function scoreBoard(board, favouredPlayer, previousPlayer, nextPlayer) {
  const moveTree = buildMoveTree(board, previousPlayer, nextPlayer);
  return recursiveScore(moveTree, favouredPlayer);
}

function recursiveScore(moveNode, favouredPlayer, depth = 1) {
  const { board, children, nextPlayer } = moveNode;

  const winner = winnerOfBoard(board);
  if (winner !== null) {
    const points = winner === favouredPlayer.symbol ? POINTS.WIN : POINTS.LOSS;

    // this takes the points awarded for a win or loss and diminished by depth
    const depthAdjustedScore = points / depth;
    return depthAdjustedScore;
  } else if (board.isFull()) {
    return POINTS.DRAW;
  }

  const childrenScores = children.map(node =>
    recursiveScore(node, favouredPlayer, depth + 1)
  );

  // maximize for favoured player's turn, minimize for opponent
  const limitingFunction = nextPlayer === favouredPlayer ? Math.max : Math.min;
  return limitingFunction(...childrenScores);
}

export default scoreBoard;
