const punctBank = [";", "...", "."];
const articlesBank = ["the", "a"];
const helperBank = ["will", "did", "should", "could", "might"];

const formHelpers = {
  randomArticle() {
    return articlesBank.splice(
      [Math.floor(Math.random() * articlesBank.length)],
      1
    )[0];
  },

  randomHelper() {
    return helperBank.splice(
      [Math.floor(Math.random() * helperBank.length)],
      1
    )[0];
  },

  randomizer() {
    return Math.ceil(Math.random() * 2);
  },

  randomizer1() {
    return Math.floor(Math.random() * 2);
  },

  isVowel(c) {
    return ["a", "e", "i", "o", "u"].indexOf(c) !== -1;
  },

  isH(c) {
    return ["s", "h", "x", "z"].indexOf(c) !== -1;
  },

  randomPunct() {
    return punctBank.splice(
      [Math.floor(Math.random() * punctBank.length)],
      1
    )[0];
  },

  linesA(lines) {
    lines.find((line) => line["syllables"] >= 4);
  },
};

export default formHelpers;
