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
};

export default logicParts;
