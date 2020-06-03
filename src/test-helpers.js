function makeEmptyPhrases() {
  let firstLine = {
    1: { arr: [], verb: false, art: false, plural: false },
    2: { arr: [], verb: false, art: false, plural: false },
    syllables: 5,
  };
  let secondLine = {
    1: { arr: [], verb: false, art: false, plural: false },
    2: { arr: [], verb: false, art: false, plural: false },
    syllables: 7,
  };
  let thirdLine = {
    1: { arr: [], verb: false, art: false, plural: false },
    2: { arr: [], verb: false, art: false, plural: false },
    syllables: 5,
  };
  let lines = [firstLine, secondLine, thirdLine];
  return lines;
}

function makeNouns() {
  let nouns = [
    { word: "alpaca", syllables: 3 },
    { word: "jungle", syllables: 2 },
    { word: "cow", syllables: 1 },
  ];
  return nouns;
}

function make4Adj() {
  let adjs = [
    { word: "cantankerous", syllables: 4 },
    { word: "blue", syllables: 2 },
    { word: "beautiful", syllables: 3 },
  ];
  return adjs;
}

module.exports = {
  makeEmptyPhrases,
  make4Adj,
  makeNouns,
};
