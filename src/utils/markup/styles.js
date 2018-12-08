import { BOARD_ELEMENT, PLAYER } from "./constants";
import { fullId } from "./formats";

class Style {
  constructor(selectors, style) {
    if (typeof selectors === "string") selectors = [selectors];
    this.selectors = selectors;
    this.style = style;
  }

  toString() {
    const selectors = this.selectors.join(",");
    const styles = Object.keys(this.style)
      .map(prop => `${prop}:${this.style[prop]};`)
      .join("");
    return `${selectors} {${styles}}`;
  }
}

class StyleSheet {
  constructor() {
    this.styles = [];
  }

  add(...styles) {
    styles.forEach(style => {
      if (!(style instanceof Style || style instanceof MediaQuery))
        throw new TypeError(
          `Can only add styles of instance Style, not ${typeof style}`
        );
    });
    this.styles = this.styles.concat(styles);

    return this;
  }

  toString() {
    return this.styles.map(style => style.toString()).join("");
  }
}

class MediaQuery {
  constructor(mediaQuery) {
    this.query = mediaQuery;
    this.styles = [];
  }

  add(...styles) {
    styles.forEach(style => {
      if (!(style instanceof Style))
        throw new TypeError(
          `Can only add styles of instance Style, not ${typeof style}`
        );
    });
    this.styles = this.styles.concat(styles);

    return this;
  }

  toString() {
    return `${this.query} { ${this.styles
      .map(style => style.toString())
      .join("")} }`;
  }
}

const mediaQueryAboveMobileStyles = new MediaQuery(
  "@media screen and (min-width: 550px)"
);

const style = {};

style.base = new Style(["html", "body"], {
  "background-color": "#101721",
  "font-family": "VT323, Helvetica Neue, Helvetica, Arial, sans-serif",
  "font-size": "30px",
  color: "#94b7ed",
  padding: "0",
  margin: "0",
  position: "relative",
  height: "100%"
});

style.boardSquare = new Style(`.${BOARD_ELEMENT.SQUARE}`, {
  float: "left",
  width: "75px",
  height: "75px",
  position: "relative",
  "max-width": "30%"
});

style.tabletBoardSquare = new Style(`.${BOARD_ELEMENT.SQUARE}`, {
  width: "125px",
  height: "125px"
});

mediaQueryAboveMobileStyles.add(style.tabletBoardSquare);

style.horizontalGrid = new Style(
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(1),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(2),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(3),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(4),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(5),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(6)`,
  {
    "border-bottom": "5px solid #94b7ed"
  }
);

style.verticalGrid = new Style(
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(1),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(2),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(4),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(5),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(7),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(8)`,
  {
    "border-right": "5px solid #94b7ed"
  }
);

style.tabletHorizontalGrid = new Style(
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(1),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(2),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(3),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(4),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(5),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(6)`,
  {
    "border-bottom": "10px solid #94b7ed"
  }
);
mediaQueryAboveMobileStyles.add(style.tabletHorizontalGrid);

style.tabletVerticalGrid = new Style(
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(1),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(2),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(4),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(5),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(7),` +
    `.${BOARD_ELEMENT.SQUARE}:nth-of-type(8)`,
  {
    "border-right": "10px solid #94b7ed"
  }
);
mediaQueryAboveMobileStyles.add(style.tabletVerticalGrid);

style.boardSquareClear = new Style(
  // clear float for every third piece
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(3n+1)`,
  { clear: "left" }
);

// reflect either the human label or the resulting ai-choice
// within the square, to take up the full width of the square
style.playerResult = new Style(
  [
    `.${BOARD_ELEMENT.SQUARE} .${PLAYER.HUMAN_STRING}-${BOARD_ELEMENT.LABEL}`,
    `.${BOARD_ELEMENT.SQUARE} .${PLAYER.AI_STRING}-${BOARD_ELEMENT.RESULT}`
  ],
  {
    position: "absolute",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0"
  }
);

style.hideAllCheckboxes = new Style("input[type=checkbox]", {
  display: "none"
});

style.humanChoice = new Style(
  `.${PLAYER.HUMAN_STRING}-${BOARD_ELEMENT.LABEL}`,
  {
    cursor: "pointer",
    "z-index": 1
  }
);

style.aiChoice = new Style(`.${PLAYER.AI_STRING}-${BOARD_ELEMENT.LABEL}`, {
  // ai choice is hidden by default
  opacity: "0",
  display: "none",

  "padding-top": "calc(50% - 1em)",
  "box-sizing": "border-box",
  "padding-left": "1em",
  position: "fixed",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.97)",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "0",
  cursor: "pointer",
  // z-index to appear relative board squares
  "z-index": "2"
});

style.tabletAiChoice = new Style(
  `.${PLAYER.AI_STRING}-${BOARD_ELEMENT.LABEL}`,
  {
    // confined to the boundaries of the board
    // by its relative position
    position: "absolute"
  }
);
mediaQueryAboveMobileStyles.add(style.tabletAiChoice);

style.aiWin = new Style("#aiWin", {
  // hidden by default
  display: "none",

  "font-size": "1.5rem",
  padding: "1em",
  "box-sizing": "border-box",
  position: "fixed",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.85)",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "0",
  cursor: "pointer",

  // z-index to appear relative board squares
  "z-index": "2"
});

style.tabletAiWin = new Style("#aiWin", {
  position: "absolute"
});

style.aiDraw = new Style("#aiDraw", {
  // hidden by default
  display: "none",

  "font-size": "1.5rem",
  padding: "1em",
  "box-sizing": "border-box",
  position: "fixed",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.85)",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "0",
  cursor: "pointer",
  // z-index to appear relative board squares
  "z-index": "2"
});

style.tabletAiDraw = new Style("#aiDraw", {
  position: "absolute"
});
mediaQueryAboveMobileStyles.add(style.aiDraw);

style.window = new Style(".window", {
  border: "0.25rem solid #fff",
  "max-width": "100%",
  "box-sizing": "border-box",
  padding: "15px"
});

style.centeredWindow = new Style(".window", {
  padding: "25px",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "650px",
  transform: "translate(-50%, -50%)"
});
mediaQueryAboveMobileStyles.add(style.centeredWindow);

style.textGlow = new Style("*", {
  "text-shadow": "0px 0px 13px rgba(255, 255, 255, 0.5)"
});

style.h1 = new Style("h1", {
  "font-size": "1rem",
  "letter-spacing": "1.5rem",
  "margin-top": "0"
});

style.h2 = new Style("h2", {
  "font-size": "1.25rem"
});

style.headings = new Style(["h1", "h2", "h3"], {
  "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif",
  color: "#fff"
});

style.button = new Style(".button", {
  display: "inline-block",
  color: "#fff",
  "text-decoration": "none",
  border: "1px solid white",
  padding: "0.25rem 0.75rem",
  "font-size": "0.75rem",
  "font-family": "inherit",
  background: "transparent",
  cursor: "pointer"
});

style.clearFix = new Style(".clear-fix", {
  clear: "both",
  height: "0",
  margin: "0"
});

style.board = new Style(".board", {
  padding: "1em 0"
});

style.loading = new Style(".board > .square", {
  display: "none"
});

style.finishedLoading = new Style(".board > .square", {
  display: "block"
});

style.verticalRhythmReset = new Style(
  ["*", `.${BOARD_ELEMENT.SQUARE}`, `.${BOARD_ELEMENT.SQUARE} > *`],
  {
    "margin-top": "0",
    "margin-bottom": "0",
    "padding-top": "0",
    "padding-bottom": "0"
  }
);

style.verticalRhythm = new Style("* + *", {
  "margin-top": "0.5em"
});

style.topSticky = new Style(".top-sticky", {
  position: "fixed",
  top: "25px",
  right: "25px",
  "margin-top": "0"
});

mediaQueryAboveMobileStyles.add(style.topSticky);

const mapBoardToSelector = (board, forSymbol, prefix) => {
  const selector = i => `#${fullId(prefix, BOARD_ELEMENT.CHECKBOX, i)}`;

  return board
    .map((boardSymbol, i) => {
      const pseudo = boardSymbol === forSymbol ? ":checked" : ":not(:checked)";
      return selector(i) + pseudo;
    })
    .join(" ~ ");
};

const computedStyles = {
  humanResult(index) {
    const selector =
      `#${fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked` +
      ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(
        PLAYER.HUMAN_STRING,
        BOARD_ELEMENT.RESULT,
        index
      )}`;

    const svg =
      '<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"><title>x</title><path d="M5 5l100 100m0-100L5 105" stroke="#94B7ED" stroke-width="15" fill="none" /></svg>';
    return new Style(selector, {
      width: "100%",
      height: "100%",
      "background-image": `url("data:image/svg+xml;base64,${Buffer(
        svg
      ).toString("base64")}")`,
      "background-size": "85%",
      "background-position": "center",
      "background-repeat": "no-repeat"
    });
  },

  hiddenHumanLabel(index) {
    const humanSelected =
      `#${fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked` +
      ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(
        PLAYER.HUMAN_STRING,
        BOARD_ELEMENT.LABEL,
        index
      )}`;

    const aiSelected =
      `#${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked` +
      ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(
        PLAYER.HUMAN_STRING,
        BOARD_ELEMENT.LABEL,
        index
      )}`;

    return new Style([humanSelected, aiSelected], { display: "none" });
  },

  aiResult(index) {
    const selector =
      `#${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked` +
      ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(
        PLAYER.AI_STRING,
        BOARD_ELEMENT.RESULT,
        index
      )}`;

    const svg =
      '<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"><title>Oval</title><circle cx="55.25" cy="55.25" r="47.25" stroke-width="15" stroke="#94B7ED" fill="none" fill-rule="evenodd"/></svg>';
    return new Style(selector, {
      "background-image": `url("data:image/svg+xml;base64,${Buffer(
        svg
      ).toString("base64")}")`,
      "background-size": "85%",
      "background-position": "center",
      "background-repeat": "no-repeat"
    });
  },

  aiChoice(board, recommendationIndex) {
    if (typeof recommendationIndex !== "number") return "";

    // given the board:
    //  create a selector for the human state of checkboxes,
    //  the ai state of checkboxes
    //  and choice (represented by a label) the ai should take
    const selector =
      mapBoardToSelector(board, PLAYER.HUMAN_SYMBOL, PLAYER.HUMAN_STRING) +
      " ~ " +
      mapBoardToSelector(board, PLAYER.AI_SYMBOL, PLAYER.AI_STRING) +
      " ~ " +
      "#" +
      fullId(PLAYER.AI_STRING, BOARD_ELEMENT.LABEL, recommendationIndex);

    return new Style(selector, {
      opacity: "1",
      display: "block"
    });
  },

  aiWin(board) {
    // given the board:
    //  create a selector for the human state of checkboxes,
    //  the ai state of checkboxes
    //  and the aiWin container
    const selector =
      mapBoardToSelector(board, PLAYER.HUMAN_SYMBOL, PLAYER.HUMAN_STRING) +
      " ~ " +
      mapBoardToSelector(board, PLAYER.AI_SYMBOL, PLAYER.AI_STRING) +
      " ~ " +
      "#aiWin";

    return new Style(selector, {
      display: "block"
    });
  },

  aiDraw(board) {
    // given the board:
    //  create a selector for the human state of checkboxes,
    //  the ai state of checkboxes
    //  and the aiDraw container
    const selector =
      mapBoardToSelector(board, PLAYER.HUMAN_SYMBOL, PLAYER.HUMAN_STRING) +
      " ~ " +
      mapBoardToSelector(board, PLAYER.AI_SYMBOL, PLAYER.AI_STRING) +
      " ~ " +
      "#aiDraw";

    return new Style(selector, {
      display: "block"
    });
  }
};

export {
  Style,
  StyleSheet,
  style as baseStyles,
  computedStyles,
  mediaQueryAboveMobileStyles
};
