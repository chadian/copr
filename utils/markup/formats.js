const baseFormat = (parts) => parts.map(
  part => part.toString().toLowerCase()
).join('-');

const fullId = (prefix, type, pieceIndex) => baseFormat([prefix, type, pieceIndex]);

const classFormat = (type, prefix, pieceIndex) => {
  const classStrings = [];

  if (type) classStrings.push(baseFormat([type]));
  if (prefix && type) classStrings.push(baseFormat([prefix, type]));
  if (pieceIndex && type) classStrings.push(baseFormat([type, pieceIndex]));
  if (prefix && type && pieceIndex) classStrings.push(fullId(prefix, type, pieceIndex));

  return classStrings.join(' ');
};

module.exports = { baseFormat, fullId, classFormat };
