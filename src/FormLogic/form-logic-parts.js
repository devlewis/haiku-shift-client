import formHelpers from "./form-helpers";

const logicParts = {
  insertNouns(lines, nouns) {
    let [firstLine, secondLine, thirdLine] = lines;

    let [animal1, place, animal2] = nouns;

    //animal1 has potential to be the longest, so goes into 7-syllable line; randomly place other nouns
    secondLine[formHelpers.randomizer()].arr.push(animal1.word);
    secondLine.syllables -= animal1.syllables;

    firstLine[formHelpers.randomizer()].arr.push(animal2.word);
    firstLine.syllables -= animal2.syllables;

    thirdLine[formHelpers.randomizer()].arr.push(place.word);
    thirdLine.syllables -= place.syllables;

    return [firstLine, secondLine, thirdLine];
  },

  insertAdjIf3(lines, adjs) {
    let linesA = formHelpers.linesA(lines);
    if (linesA) {
      let arr = Object.values(linesA).find(
        (obj) => Object.values(obj)[0].length === 1
      );
      arr["arr"].unshift(adjs[0].word);
      linesA["syllables"] = linesA["syllables"] -= adjs[0].syllables;
      adjs.splice(0, 1);
    }
    return lines;
  },

  insertVerbActive(lines, verbActive, verbs, nouns) {
    let [firstLine, secondLine, thirdLine] = lines;

    const findLine = (line, verbActive) => {
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
    };

    if (
      verbActive.syllables <= 2 &&
      secondLine.syllables >= verbActive.syllables + 1
    ) {
      secondLine = findLine(secondLine, verbActive);
    } else {
      let diff = firstLine.syllables - 1;
      ///if it fits, push verbActive to firstLine
      if (verbActive.syllables <= diff) {
        firstLine = findLine(firstLine, verbActive);
      } else {
        ////if it doesn't fit on firstLine, see if it will fit on thirdLine
        diff = thirdLine.syllables - 1;
        if (verbActive.syllables <= diff) {
          thirdLine = findLine(thirdLine, verbActive);
        }
      }
    }
    lines = [firstLine, secondLine, thirdLine];

    return lines;
  },

  noVerbs(lines) {
    return lines.filter((obj) => !Object.values(obj).find((a) => a["verb"]));
  },

  openArr(line, nouns) {
    return Object.values(line).find(
      (a) =>
        typeof a === "object" &&
        !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0) &&
        a["verb"] === false
    );
  },

  pushVerb(openArr, line, linesNoV, randomVP) {
    openArr["arr"].push(randomVP.word);
    openArr["verb"] = true;
    line.syllables -= randomVP.syllables;
    linesNoV.splice(linesNoV.indexOf(line), 1);

    return line;
  },

  addAdj(line, adjs, nouns) {
    const diffB = line.syllables - 1;
    const adjA = adjs.find((a) => a.syllables <= diffB);
    if (adjA) {
      Object.values(line)
        .find(
          (a) =>
            typeof a === "object" &&
            a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0) &&
            a["arr"].length > 0
        )
        ["arr"].unshift(adjA.word);
      line.syllables -= adjA.syllables;
      adjs.splice(adjs.indexOf(adjA), 1);
    }
    return line;
  },
};

export default logicParts;
