import Board from "./board.js";
import Player from "./player.js";
import recommendationHash from "./utils/recommendations-hash.js";
import { BOARD_INDEXES } from "./utils/markup/constants.js";
import { saveToFile, processCss } from "./utils/compile.js";

import {
  containerStart,
  containerEnd,
  humanCheckbox,
  aiCheckbox,
  aiLabel,
  boardSquare,
  starOnGithub,
  playAgain
} from "./utils/markup/templates.js";

import {
  StyleSheet,
  baseStyles,
  computedStyles,
  mediaQueryAboveMobileStyles
} from "./utils/markup/styles.js";

const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const shouldCompressStyles = isProduction && process.env.LOGICAL_CSS_URL_PATH;
const logicalCssUrlPath =
  isProduction && process.env.LOGICAL_CSS_URL_PATH
    ? process.env.LOGICAL_CSS_URL_PATH
    : "./";

const hash = recommendationHash(
  Board.generateEmptyBoard(),
  new Player("O"),
  new Player("X")
);
const boardMap = fn => BOARD_INDEXES.map(fn);
const resultStyles = hash => {
  const styles = Object.keys(hash)
    .filter(board => hash[board] !== null)
    .map(board => {
      board = board.split(",");
      const result = hash[board];

      switch (true) {
        case typeof result === "number":
          return computedStyles.aiChoice(board, result);
        case result === "WIN":
          return computedStyles.aiWin(board);
        case result === "DRAW":
          return computedStyles.aiDraw(board);
      }
    });

  return styles;
};

const logicalStyleSheet = new StyleSheet();
logicalStyleSheet.add(
  ...boardMap(computedStyles.humanResult),
  ...boardMap(computedStyles.hiddenHumanLabel),
  ...boardMap(computedStyles.aiResult),
  ...resultStyles(hash),
  baseStyles.finishedLoading
);

const criticalStyleSheet = new StyleSheet();
criticalStyleSheet.add(
  baseStyles.loading,
  baseStyles.base,
  baseStyles.window,
  baseStyles.board,
  baseStyles.boardSquare,
  baseStyles.boardSquareClear,
  baseStyles.horizontalGrid,
  baseStyles.verticalGrid,
  baseStyles.playerResult,
  baseStyles.hideAllCheckboxes,
  baseStyles.humanChoice,
  baseStyles.aiChoice,
  baseStyles.aiWin,
  baseStyles.aiDraw,
  baseStyles.textGlow,
  baseStyles.headings,
  baseStyles.h1,
  baseStyles.h2,
  baseStyles.button,
  baseStyles.clearFix,
  baseStyles.verticalRhythmReset,
  baseStyles.verticalRhythm,
  mediaQueryAboveMobileStyles
);

const markup = [
  containerStart({ head: `<style>${criticalStyleSheet.toString()}</style>` }),

  "<h1>COPR</h1>",
  "<h2>CSS Operation Plan Response</h2>",
  "<p>Shall we play a game?</p>",
  "<form>",
  '<div class="board">',
  // board and mechanics
  boardMap(humanCheckbox).join(""),
  boardMap(aiCheckbox).join(""),
  boardMap(aiLabel).join(""),
  boardMap(boardSquare).join(""),
  `<div id="aiWin"><div>COPR wins. The only winning move is not to play.</div>${playAgain}${starOnGithub}</div>`,
  `<div id="aiDraw"><div>Stalemate.</div>${playAgain}${starOnGithub}</div>`,
  '<div class="clear-fix"></div>',
  "</div>",
  '<button type="reset" class="button">Restart</button>',
  "</form>",
  `<link rel="stylesheet" type="text/css" href="${logicalCssUrlPath}logical.css" />`,
  `<div class="top-sticky">${starOnGithub}</div>`,

  containerEnd()
];

saveToFile(markup.join(""), "./dist/index.html", false);
processCss(logicalStyleSheet.toString(), shouldCompressStyles).then(({ css }) =>
  saveToFile(css, "./dist/logical.css", shouldCompressStyles)
);
