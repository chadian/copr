const baseFormat = parts =>
  parts.map(part => part.toString().toLowerCase()).join("-");

const fullId = (prefix, type, pieceIndex) =>
  baseFormat([prefix, type, pieceIndex]);

const classFormat = (prefix, type, pieceIndex) => {
  const classStrings = [];

  // use for pieceIndex so a value of '0' is still used
  const isDefined = value => typeof value !== "undefined";

  if (type) classStrings.push(baseFormat([type]));
  if (prefix && type) classStrings.push(baseFormat([prefix, type]));
  if (isDefined(pieceIndex) && type)
    classStrings.push(baseFormat([type, pieceIndex]));
  if (prefix && type && isDefined(pieceIndex))
    classStrings.push(fullId(prefix, type, pieceIndex));

  return classStrings.join(" ");
};

module.exports = { baseFormat, fullId, classFormat };
