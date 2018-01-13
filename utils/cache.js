const { memoizeWith } = require('ramda');

const cacheKeyGenerator = (board, playerSymbol, opponentSymbol) => {
  const PLAYER_CACHE_CHAR = 'X';
  const OPPONENT_CACHE_CHAR = 'O';
  const cacheKey = board
    .toArray()
    .map(symbol => {
      if (symbol === playerSymbol) return PLAYER_CACHE_CHAR;
      if (symbol === opponentSymbol) return OPPONENT_CACHE_CHAR;
      else return symbol;
    })
    .join(',');

  return cacheKey;
};

const memoizeBoardWithPlayers = fn =>
  memoizeWith(
    (board, playerA, playerB) =>
      cacheKeyGenerator(board, playerA.symbol, playerB.symbol),
    fn
  );

module.exports = {
  cacheKeyGenerator,
  memoizeBoardWithPlayers
};
