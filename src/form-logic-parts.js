import formHelpers from "./form-helpers";

const logicParts = {
  insertNouns(lines, nouns) {
    let firstLine = lines[0];
    let secondLine = lines[1];
    let thirdLine = lines[2];

    let animal1 = nouns[0];
    let place = nouns[1];
    let animal2 = nouns[2];

    //noun4 goes into 7-syllable line; randomly place other nouns
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

  insertVerbActive(lines, verb_a, verbs, nouns) {
    let firstLine = lines[0];
    let secondLine = lines[1];
    let thirdLine = lines[2];

    const findLine = (line, verb_a) => {
      console.log(verb_a);
      console.log(verbs);
      let lineA = Object.values(line).find(
        (a) =>
          typeof a === "object" &&
          !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
      );
      if (lineA) {
        let art = formHelpers.randomArticle();
        lineA["arr"].push(verb_a.word, art);
        lineA["verb"] = true;
        lineA["art"] = art;
        verbs.splice(0, 1);
        line.syllables -= verb_a.syllables;
        line.syllables -= 1;
      }
      return line;
    };

    if (verb_a.syllables <= 2 && secondLine.syllables >= verb_a.syllables + 1) {
      console.log("inside if!");
      secondLine = findLine(secondLine, verb_a);
      console.log(secondLine);
    } else {
      console.log("inside if!");
      let diff = firstLine.syllables - 1;
      ///if it fits, push verb_a to firstLine
      if (verb_a.syllables <= diff) {
        firstLine = findLine(firstLine, verb_a);
      } else {
        console.log("inside if!");
        ////if it doesn't fit on firstLine, see if it will fit on thirdLine
        diff = thirdLine.syllables - 1;
        if (verb_a.syllables <= diff) {
          thirdLine = findLine(thirdLine, verb_a);
        }
      }
    }
    lines = [firstLine, secondLine, thirdLine];

    return lines;
  },
};

export default logicParts;
