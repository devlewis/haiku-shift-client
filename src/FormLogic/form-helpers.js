const punctBank = [";", "...", "."];
const articlesBank = ["the", "a"];
const helperBank = ["will", "did", "should", "could", "might"];

const formHelpers = {
  findLine(line, verbActive, verbs, nouns) {
    let lineA = Object.values(line).find(
      (a) =>
        typeof a === "object" &&
        !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
    );
    if (lineA) {
      let art = formHelpers.randomArticle();
      lineA["arr"].push(verbActive.word, art);
      lineA["verb"] = true;
      lineA["art"] = art;
      verbs.splice(0, 1);
      line.syllables -= verbActive.syllables;
      line.syllables -= 1;
    }
    return line;
  },

  linesPunctCaps(linesFinal) {
    linesFinal.forEach((line, i) => {
      line = line.trim();
      if (formHelpers.randomizer() === 1) {
        linesFinal[i] = line + formHelpers.randomPunct();
      }
      if (formHelpers.randomizer() === 1) {
        linesFinal[i] = line[0].toUpperCase() + line.slice(1);
      }
    });
    return linesFinal;
  },

  linesRandomizer(linesFinal) {
    const sevenSylLines = linesFinal.splice(1, 1)[0];

    const randomLine = linesFinal.splice([formHelpers.randomizer1()], 1)[0];

    const otherLine = linesFinal[0];

    return [randomLine, sevenSylLines, otherLine];
  },

  linesConstructor() {
    return [this.haikuTemplate(), this.haikuTemplate(), this.haikuTemplate()];
  },

  haikuTemplate() {
    return {
      1: { arr: [], verb: false, art: false, plural: false },
      2: { arr: [], verb: false, art: false, plural: false },
      syllables: 5,
    };
  },

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

  isPlur(w) {
    return ["deer", "moose", "trout", "cod"].indexOf(w) !== -1;
  },

  randomPunct() {
    return punctBank.splice(
      [Math.floor(Math.random() * punctBank.length)],
      1
    )[0];
  },

  linesAvailability(lines) {
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
