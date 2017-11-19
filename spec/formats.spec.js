const { baseFormat, classFormat, fullId } = require('../utils/markup/formats');

describe('formats', () => {
  describe('baseFormat', () => {
    it('lowercases segments passed in', () => {
      expect(baseFormat(['HeLlo'])).toBe('hello');
    });

    it('splits multiple segments with a dash', () => {
      expect(baseFormat(['meow', '6'])).toBe('meow-6');
    });
  });

  describe('fullId', () => {
    it('generates a full id', () => {
      expect(fullId('HUMAN', 'box', 8)).toBe('human-box-8');
    });
  });

  describe('classFormat', () => {
    it('handles type only classes', () => {
      expect(classFormat('box')).toBe('box');
    });

    it('handles type and piece index classes', () => {
      expect(classFormat('box', null, 8)).toBe('box box-8');
    });

    it('handles type and prefix classes', () => {
      expect(classFormat('box', 'HUMAN')).toBe('box human-box');
    });

    it('handles the full type, prefix and piece index classes', () => {
      expect(classFormat('box', 'HUMAN', '8')).toBe(
        'box human-box box-8 human-box-8'
      );
    });
  });
});
