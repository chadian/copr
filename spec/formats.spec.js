import { baseFormat, classFormat, fullId } from "../src/utils/markup/formats";

describe("formats", () => {
  describe("baseFormat", () => {
    it("lowercases segments passed in", () => {
      expect(baseFormat(["HeLlo"])).toBe("hello");
    });

    it("splits multiple segments with a dash", () => {
      expect(baseFormat(["meow", "6"])).toBe("meow-6");
    });
  });

  describe("fullId", () => {
    it("generates a full id", () => {
      expect(fullId("HUMAN", "box", 8)).toBe("human-box-8");
    });
  });

  describe("classFormat", () => {
    it("handles type only classes", () => {
      expect(classFormat(null, "box")).toBe("box");
    });

    it("handles type and piece index classes", () => {
      expect(classFormat(null, "box", 8)).toBe("box box-8");
    });

    it("handles type and piece index classes with index of 0", () => {
      expect(classFormat(null, "box", 0)).toBe("box box-0");
    });

    it("handles type and prefix classes", () => {
      expect(classFormat("HUMAN", "box")).toBe("box human-box");
    });

    it("handles the full type, prefix and piece index classes", () => {
      expect(classFormat("HUMAN", "box", "8")).toBe(
        "box human-box box-8 human-box-8"
      );
    });

    it("handles the full type, prefix and piece index classes with index of 0", () => {
      expect(classFormat("HUMAN", "box", 0)).toBe(
        "box human-box box-0 human-box-0"
      );
    });
  });
});
