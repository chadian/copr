const cacheKeyGenerator = (board, playerSymbol, opponentSymbol) => {
  const PLAYER_CACHE_CHAR = "X";
  const OPPONENT_CACHE_CHAR = "O";
  const cacheKey = board
    .toArray()
    .map(symbol => {
      if (symbol === playerSymbol) return PLAYER_CACHE_CHAR;
      if (symbol === opponentSymbol) return OPPONENT_CACHE_CHAR;
      else return symbol;
    })
    .join(",");

  return cacheKey;
};

const caches = new Map();
const cacheHits = new Map();

const memoizeBoardWithPlayers = fn => {
  let cache = caches.get(fn);

  if (!cache) {
    cache = {};
    caches.set(fn, cache);
  }

  return (board, playerA, playerB) => {
    const cacheKey = cacheKeyGenerator(board, playerA.symbol, playerB.symbol);

    if (cache[cacheKey]) {
      let previousHits = cacheHits.get(cacheHits) ?? 0;
      cacheHits.set(fn, ++previousHits);
      return cache[cacheKey];
    }

    const result = fn(board, playerA, playerB);
    cache[cacheKey] = result;
    return result;
  };
};

function clearCache() {
  caches.clear();
  cacheHits.clear();
}

function getCacheHits(fn) {
  return cacheHits.get(fn) ?? 0;
}

export { cacheKeyGenerator, memoizeBoardWithPlayers, clearCache, getCacheHits };
