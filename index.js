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

  `<h1>COPR</h1>`,
  `<h2>CSS Operation Plan Response</h2>`,
  `<p>Shall we play a game?</p>`,

  `<div class="board">`,
  // board and mechanics
  mapJoin(humanCheckbox),
  mapJoin(aiCheckbox),
  mapJoin(aiLabel),
  mapJoin(boardSquare),
  `<div class="clear-fix"></div>`,
  `</div>`,

  `<a class="button" href=".">Restart</a>`,

  // styles
  '<style>',
  baseStyles.base.toString(),
  baseStyles.window.toString(),
  baseStyles.boardSquare.toString(),
  baseStyles.boardSquareClear.toString(),
  baseStyles.horizontalGrid.toString(),
  baseStyles.verticalGrid.toString(),
  baseStyles.playerResult.toString(),
  baseStyles.hideAllCheckboxes.toString(),
  baseStyles.hideAiLabels.toString(),
  baseStyles.textGlow.toString(),
  baseStyles.headings.toString(),
  baseStyles.h1.toString(),
  baseStyles.h2.toString(),
  baseStyles.button.toString(),
  baseStyles.clearFix.toString(),
  baseStyles.verticalRhythmReset.toString(),
  baseStyles.verticalRhythm.toString(),
  mapJoin(computedStyles.humanResult),
  mapJoin(computedStyles.hiddenHumanLabel),
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
