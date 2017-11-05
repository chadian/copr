const Board = require('./board');
const Player = require('./player');
const recommendBestMove = require('./utils/recommend-best-move');
const buildMoveTree = require('./utils/build-move-tree');
const winnerOfBoard = require('./utils/winner-of-board');

function recommendationHash() {
  const hash = {};
  const X = 'X';
  const O = 'O';
  const playerX = new Player(X);
  const playerO = new Player(O);
  const emptyBoard = new Board(Array(8).fill(Board.EMPTY_SPOT_SYMBOL));
  const moveTree = buildMoveTree(null, emptyBoard, playerO, playerX);

  const moveForNode = (node) => {
    const board = node.board;
    const hashString = board.toArray().toString();

    if (hash[hashString]) return;

    let bestMove;
    try {
      bestMove = recommendBestMove(board, playerX, playerO);
      hash[hashString] = bestMove;
    } catch (exception) {}

    node.children.forEach(node => moveForNode(node));
  }

  moveForNode(moveTree);

  return hash;
}


const hash = recommendationHash();

///

const fs = require('fs');

const count = [0,1,2,3,4,5,6,7,8];
const AI_PREFIX = 'ai';
const HUMAN_PREFIX = 'human';

const idFormat = (prefix, count) => `${prefix}-checkbox-${count}`;
const classFormat = (prefix, count, type) => `${prefix}-${type} ${prefix}-${type}-${count} ${type}`;

const checkbox = (prefix, count) => {
  return `<input
    id="${idFormat(prefix, count)}"
    class="${classFormat(prefix, count, 'checkbox')}"
    type="checkbox">`;
}

const label = (prefix, count) => {
  return `<label
    for="${idFormat(prefix, count)}"
    class="${classFormat(prefix, count, 'label')}"
    type="checkbox">
  </label>`;
}

const aiCheckbox = count => checkbox(AI_PREFIX, count);
const aiLabel = count => label(AI_PREFIX, count);
const humanCheckbox = count => checkbox(HUMAN_PREFIX, count);
const humanLabel = count => label(HUMAN_PREFIX, count);

const aiCheckboxes = count.map(num => aiCheckbox(num));
const aiLabels = count.map(num => aiLabel(num));
const humanCheckboxes = count.map(num => humanCheckbox(num));

const setupMarkup = [].concat(humanCheckboxes, aiCheckboxes, aiLabels).join('');

const boardPiece = num => {
  return `<div class="box box-${num}">
    <div class="ai-result ai-result-${num}"></div>
    ${humanLabel(num)}
  </div>`;
};

const boardPieces = count.map(num => boardPiece(num));
const boardMarkup = boardPieces.join('');

const HUMAN = 'X';
const AI = 'O';

const stylesForBoard = (board, recommendation) => {
  const styles = [];

  const checkboxSelector = checkboxType => (spot,i) => {
    const checkedPrefix = checkboxType === HUMAN ? HUMAN_PREFIX : AI_PREFIX;
    const conditionalCheckedSuffix = spot === checkboxType ? ':checked' : ':not(:checked)';
    return `#${idFormat(checkedPrefix, i)}${conditionalCheckedSuffix}`;;
  }

  humanCheckedSelectors = board.map(checkboxSelector(HUMAN));
  aiCheckedSelectors = board.map(checkboxSelector(AI));

  const boardStateSelector = [].concat(humanCheckedSelectors, aiCheckedSelectors).join(' ~ ');
  const recommendedAiSelector = `label[for="${idFormat(AI_PREFIX, recommendation)}"]`;
  const recommendedAiStyle = `${boardStateSelector} ~ ${recommendedAiSelector} { display: block; width: 20px; height: 20px; background: green; }`

  return recommendedAiStyle;
}

const accumulatedStyles = [];

// recommended styles
for (let board in hash) {
  board = board.split(',');
  const recommendedMove = hash[board];
  const styles = stylesForBoard(board, recommendedMove);
  accumulatedStyles.push(styles);
}

// box styles
accumulatedStyles.push(`
  .box {
    float: left;
    width: 25px;
    height: 25px;
    border: 1px solid red;
    position: relative;
  }

  .box:nth-child(3n + 1) {
    clear: both;
  }
`);


// human labels and ai results
accumulatedStyles.push(`
  .human-label, .ai-result {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border: 1px solid blue;
  }
`);


count.forEach(i => {
  accumulatedStyles.push(`
    #${idFormat(HUMAN_PREFIX, i)}:checked ~ .box .${HUMAN_PREFIX}-label-${i} {
      background-color: blue;
    }

    #${idFormat(AI_PREFIX, i)}:checked ~ .box .${AI_PREFIX}-result-${i} {
      background-color: black;
    }
  `);
});

const styleMarkUp = `<style>${accumulatedStyles.join('')}</style>`

const markup = setupMarkup + boardMarkup + styleMarkUp;

fs.writeFile('index.html', markup, console.log);
