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
  StyleSheet,
  baseStyles,
  computedStyles
} = require('./utils/markup/styles');

const hash = recommendationHash(Board.generateEmptyBoard(), new Player('X'), new Player('O'));
const boardMap = (fn) => BOARD_INDEXES.map(fn);
const recommendationStyles = hash => {
  const styles = Object.keys(hash)
    .filter(board => hash[board] !== null)
    .map(board => {
      board = board.split(',');
      const recommendation = hash[board];
      return computedStyles.aiChoice(board, recommendation);
    });

  return styles;
};

const logicalStyleSheet = new StyleSheet();
logicalStyleSheet.add(
  ...boardMap(computedStyles.humanResult),
  ...boardMap(computedStyles.hiddenHumanLabel),
  ...boardMap(computedStyles.aiResult),
  ...recommendationStyles(hash)
);

const criticalStyleSheet = new StyleSheet();
criticalStyleSheet.add(
  baseStyles.base,
  baseStyles.window,
  baseStyles.boardSquare,
  baseStyles.boardSquareClear,
  baseStyles.horizontalGrid,
  baseStyles.verticalGrid,
  baseStyles.playerResult,
  baseStyles.hideAllCheckboxes,
  baseStyles.hideAiLabels,
  baseStyles.textGlow,
  baseStyles.headings,
  baseStyles.h1,
  baseStyles.h2,
  baseStyles.button,
  baseStyles.clearFix,
  baseStyles.verticalRhythmReset,
  baseStyles.verticalRhythm
);

const markupBits = [
  CONTAINER_START,

  `<h1>COPR</h1>`,
  `<h2>CSS Operation Plan Response</h2>`,
  `<p>Shall we play a game?</p>`,

  `<div class="board">`,
  // board and mechanics
  boardMap(humanCheckbox).join(''),
  boardMap(aiCheckbox).join(''),
  boardMap(aiLabel).join(''),
  boardMap(boardSquare).join(''),
  `<div class="clear-fix"></div>`,
  `</div>`,

  `<a class="button" href=".">Restart</a>`,

  // styles
  '<style>',
  criticalStyleSheet.toString(),
  logicalStyleSheet.toString(),
  '</style>',

  CONTAINER_END
];

if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
fs.writeFile('./dist/index.html', markupBits.join(''));
