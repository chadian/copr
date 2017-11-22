const { Style, computedStyles } = require('../utils/markup/styles');

describe("styles", () => {
  describe("Style", () => {
    it("seralizes with a single selector to CSS with toString", () => {
      expect(new Style('.hello', {
        'background-color': 'red'
      }).toString()).toBe('.hello {background-color:red;}');
    });

    it("serializes with multiple selectors to CSS with toString", () => {
      expect(new Style(['.hello', '#goodbye'], {
        'background-color': 'red'
      }).toString()).toBe('.hello,#goodbye {background-color:red;}');
    })
  });
});
