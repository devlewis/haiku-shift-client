const punctBank = [";", "...", "."];
const articlesBank = ["the", "a"];
const helperBank = ["will", "did", "should", "could", "might"];

const formHelpers = {
  pushRandomAdjective(key, line, adjectivesArr, adjOneS) {
    if (
      line["syllables"] > 0 &&
      line[key]["verb"] === false &&
      line[key]["arr"].length > 0 &&
      this.randomizer() === 1
    ) {
      let adjs = adjectivesArr.map((a) => a.word);
      if (
        adjs.includes(line[key]["arr"][0]) ||
        adjs.includes(line[key]["arr"][1]) ||
        adjs.includes(line[key]["arr"][2])
      ) {
        let adjs = adjectivesArr.filter(
          (a) => a.syllables <= line["syllables"]
        );
        let randomAdj = adjs.splice(
          [Math.floor(Math.random() * adjOneS.length)],
          1
        )[0];
        line[key]["arr"].unshift(randomAdj.word + ",");

        line["syllables"] = line["syllables"] -= randomAdj.syllables;
      } else {
        let adjs = adjectivesArr.filter(
          (a) => a.syllables <= line["syllables"]
        );
        let randomAdj = adjs.splice(
          [Math.floor(Math.random() * adjOneS.length)],
          1
        )[0];

        line[key]["arr"].unshift(randomAdj.word);

        line["syllables"] = line["syllables"] -= randomAdj.syllables;
      }
    }
  },

  pushArticle(key, line) {
    if (
      key === ["1"] &&
      line["syllables"] > 0 &&
      line[key]["arr"].length > 0 &&
      line[key]["verb"] === false &&
      line[key]["art"] === false
    ) {
      let art = this.randomArticle();
      if (
        art === "a" &&
        line["syllables"] > 1 &&
        line["2"]["verb"] === true &&
        line["2"]["arr"].length === 1
      ) {
        let help = this.randomHelper();
        line[key]["arr"].unshift(art);
        line[key]["art"] = art;
        line["2"]["arr"].unshift(help);
        line["syllables"] = line["syllables"] -= 2;
      } else {
        line[key]["arr"].unshift("the");
        line[key]["art"] = "the";
        line["syllables"] = line["syllables"] -= 1;
      }
    }
  },

  pushRandomHelper(key, line) {
    if (
      key === "1" &&
      line["2"]["verb"] === true &&
      line["2"]["art"] === false &&
      line["syllables"] > 0
    ) {
      let help = this.randomHelper();
      line["2"]["arr"].unshift(help);
      line["syllables"] = line["syllables"] -= 1;
    }
  },
  pushRandomPassiveVerb(key, randomverbPassive1, line) {
    if (
      key === "1" &&
      line[key]["arr"].length === 0 &&
      line["2"]["verb"] === false &&
      line["syllables"] > 0 &&
      this.randomizer() === 1
    ) {
      let verb = randomverbPassive1();
      line[key]["arr"].push(verb.word);
      line[key]["verb"] = true;
      line["syllables"] = line["syllables"] -= verb.syllables;
    } else if (
      key === "1" &&
      line["2"]["arr"].length === 0 &&
      line[key]["verb"] === false &&
      line["syllables"] > 0 &&
      this.randomizer() === 1
    ) {
      let verb = randomverbPassive1();
      line["2"]["arr"].push(verb.word);
      line["2"]["verb"] = true;
      line["syllables"] = line["syllables"] -= verb.syllables;
    }
  },

  findLine(line, verbActive, verbs, nouns) {
    let lineA = Object.values(line).find(
      (a) =>
        typeof a === "object" &&
        !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
    );
    if (lineA) {
      let art = this.randomArticle();
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
      if (this.randomizer() === 1) {
        linesFinal[i] = line + this.randomPunct();
      }
      if (this.randomizer() === 1) {
        linesFinal[i] = line[0].toUpperCase() + line.slice(1);
      }
    });
    return linesFinal;
  },

  linesRandomizer(linesFinal) {
    const sevenSylLines = linesFinal.splice(1, 1)[0];

    const randomLine = linesFinal.splice([this.randomizer1()], 1)[0];

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
