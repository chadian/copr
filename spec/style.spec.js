const { Style, computedStyles } = require("../utils/markup/styles");

describe("styles", () => {
  describe("Style", () => {
    it("seralizes with a single selector to CSS with toString", () => {
      expect(
        new Style(".hello", {
          "background-color": "red"
        }).toString()
      ).toBe(".hello {background-color:red;}");
    });

    it("serializes with multiple selectors to CSS with toString", () => {
      expect(
        new Style([".hello", "#goodbye"], {
          "background-color": "red"
        }).toString()
      ).toBe(".hello,#goodbye {background-color:red;}");
    });
  });

  describe("computedStyles", () => {
    const { humanResult, aiResult, hiddenHumanLabel } = computedStyles;

    describe("humanResult", () => {
      it("has a selector with a matching human checkbox and human result", () => {
        expect(humanResult(6).toString()).toContain(
          "#human-checkbox-6:checked ~ .square #human-result-6"
        );
      });
    });

    describe("hiddenHumanLabel", () => {
      it("has a selector with a matching human checkbox and human label", () => {
        expect(hiddenHumanLabel(6).toString()).toContain(
          "#human-checkbox-6:checked ~ .square #human-label-6"
        );
      });
    });

    describe("aiResult", () => {
      it("has a selector with a matching ai checkbox and ai result", () => {
        expect(aiResult(6).toString()).toContain(
          "#ai-checkbox-6:checked ~ .square #ai-result-6"
        );
      });
    });
  });
});
