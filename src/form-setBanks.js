import logicParts from "./form-logic-parts";

function setBanks(lines, nouns, adjs, verbs) {
  const verb_a = verbs[0];

  //put one noun per line
  lines = logicParts.insertNouns(lines, nouns);

  //if more than 3 syllables, adjective pushes first.
  if (adjs[0].syllables > 3) {
    lines = logicParts.insertAdjIf3(lines, adjs);
  }

  //if more than 2 syllables, verb_a goes on line 1;
  //otherwise, find an empty space on other lines.
  lines = logicParts.insertVerbActive(lines, verb_a, verbs, nouns);

  // //make array of lines without verbs
  let linesNoV = logicParts.noVerbs(lines);

  console.log(linesNoV);
  //pick random verb
  const randomVP = verbs.splice([Math.floor(Math.random() * 2)], 1)[0];
  // find line in array that has room for verb's syllables
  let line = linesNoV.find((l) => l.syllables - randomVP.syllables >= 0);

  //find open array in line
  let openArr = logicParts.openArr(line, nouns);

  console.log(openArr);
  //push verb to line
  line = logicParts.pushVerb(openArr, line, linesNoV, randomVP);

  /////////add adjectives/////////

  lines.forEach((line) => logicParts.addAdj(line, adjs, nouns));

  lines.forEach((line) => console.log(Object.values(line)));

  ////////////add other verb if room//////////////
  if (lines.some((line) => verbs[0].syllables <= line.syllables)) {
    //find open array in line
    line = lines.find(
      (line) =>
        verbs[0].syllables <= line.syllables &&
        line[1]["verb"] === false &&
        line[2]["verb"] === false
    );

    openArr = logicParts.openArr(line, nouns);

    //push verb to line
    if (openArr) {
      line = logicParts.pushVerb(openArr, line, linesNoV, verbs[0]);
    }
  }
  console.log(lines);
  return lines;
}

export default setBanks;
