const Board = require('./board');
const Player = require('./player');
const recommendationHash = require('./utils/recommendations-hash');
const { BOARD_INDEXES } = require('./utils/markup/constants');
const fs = require('fs');
const {
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
const mapJoin = (fn) => BOARD_INDEXES.map(fn).join('');

const markupBits = [

  // templates
  mapJoin(humanCheckbox),
  mapJoin(aiCheckbox),
  mapJoin(aiLabel),
  mapJoin(boardSquare),

  // styles
  '<style>',
  baseStyles.boardSquare.toString(),
  baseStyles.boardSquareClear.toString(),
  baseStyles.playerResult.toString(),
  mapJoin(computedStyles.humanResult),
  mapJoin(computedStyles.aiResult),
  '</style>',

];

fs.mkdir('./dist');
fs.writeFile('./dist/index.html', markupBits.join(''), console.log);
