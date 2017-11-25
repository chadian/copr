const Board = require('./board');
const Player = require('./player');
const recommendationHash = require('./utils/recommendations-hash');
const { BOARD_INDEXES } = require('./utils/markup/constants');
const fs = require('fs');
const {
  CONTAINER_START,
  CONTAINER_END,
  humanCheckbox,
  aiCheckbox,
  aiLabel,
  boardSquare
} = require('./utils/markup/templates');
const {
  baseStyles,
  computedStyles
} = require('./utils/markup/styles');

const hash = recommendationHash(Board.generateEmptyBoard(), new Player('X'), new Player('O'));

const mapJoin = (fn, arr = BOARD_INDEXES) => arr.map(fn).join('');

const markupBits = [
  CONTAINER_START,

  // templates
  mapJoin(humanCheckbox),
  mapJoin(aiCheckbox),
  mapJoin(aiLabel),
  mapJoin(boardSquare),

  // styles
  '<style>',
  baseStyles.boardSquare.toString(),
  baseStyles.boardSquareClear.toString(),
  baseStyles.horizontalGrid.toString(),
  baseStyles.verticalGrid.toString(),
  baseStyles.playerResult.toString(),
  baseStyles.hideAllCheckboxes.toString(),
  mapJoin(computedStyles.humanResult),
  mapJoin(computedStyles.aiResult),
  mapJoin(
    ([board, recommendation]) => computedStyles.aiChoice(board, recommendation),
    Object.keys(hash)
      .map(board => [board.split(','), hash[board]])
      .filter(([_, recommendation]) => !!recommendation)
  ),
  '</style>',

  CONTAINER_END
];

if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
fs.writeFile('./dist/index.html', markupBits.join(''));
