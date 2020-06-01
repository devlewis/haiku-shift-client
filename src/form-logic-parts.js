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
};

export default logicParts;
