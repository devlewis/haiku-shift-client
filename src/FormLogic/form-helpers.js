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

  random3() {
    return [0, 2][Math.floor(Math.random() * 2)];
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
    return lines.find((line) => line["syllables"] >= 4);
  },

  randomizeH(haikuStore) {
    const randomHaikuG = () =>
      haikuStore[Math.floor(Math.random() * haikuStore.length)];

    let randomHaiku = randomHaikuG();

    let phrase1 = [randomHaiku["haiku"][this.random3()], randomHaiku["id"]];

    randomHaiku = randomHaikuG();
    let phrase2 = [randomHaiku["haiku"][1], randomHaiku["id"]];

    randomHaiku = randomHaikuG();
    if (randomHaiku["haiku"].includes(phrase1[0])) {
      randomHaiku = randomHaikuG();
    }

    let phrase3 = [randomHaiku["haiku"][this.random3()], randomHaiku["id"]];

    let haikuHere = [phrase1[0], phrase2[0], phrase3[0]];

    let randomIds = [phrase1[1], phrase2[1], phrase3[1]];

    return [haikuHere, randomIds];
  },

  newCount(word) {
    word = word.toLowerCase(); //word.downcase!

    if (word.length <= 3) {
      return 1;
    } //return 1 if word.length <= 3
    let count = 0;

    if (
      word.slice(word.length - 2, word.length) === "ed" &&
      word[word.length - 3].match(/[td]/)
    ) {
      count = 1;
    }

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ""); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')

    word = word.replace(/^y/, ""); //word.sub!(/^y/, '')

    return word.match(/[aeiouy]{1,2}/g).length + count;
  },

  finalizeLines(lines) {
    return lines.map((line) => {
      let keyArr = Object.keys(line);

      keyArr.forEach((key) => {
        if (key !== "syllables") {
          line[key]["arr"] = line[key]["arr"].join(" ");
        }
      });

      return line["1"]["arr"] + " " + line["2"]["arr"];
    });
  },
};

export default formHelpers;
