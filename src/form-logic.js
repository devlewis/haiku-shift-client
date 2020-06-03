import formHelpers from "./form-helpers";
import logicParts from "./form-logic-parts";

const formLogic = (
  animal1,
  animal2,
  place,
  adjective,
  adjective2,
  verb_a,
  verb_p1,
  verb_p2,
  verb_pOneS,
  adjOneS,
  adjs2,
  adjectivesArr,
  verbs_pArr
) => {
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

  const nouns = [animal1, place, animal2];
  const adjs = [adjective, adjective2];
  const verbs = [verb_a, verb_p1, verb_p2];

  const randomVerb_p1 = () =>
    verb_pOneS.splice([Math.floor(Math.random() * verb_pOneS.length)], 1)[0]
      .present;

  //put one noun per line
  lines = logicParts.insertNouns(lines, nouns);

  //if more than 3 syllables, adjective pushes first.
  if (adjs[0].syllables > 3) {
    lines = logicParts.insertAdjIf3(lines, adjs);
  }

  //if more than 2 syllables, verb_a goes on line 1
  if (verb_a.syllables <= 2 && secondLine.syllables >= verb_a.syllables + 1) {
    //pushing verb_a to secondLine
    let line = Object.values(secondLine).find(
      (a) =>
        typeof a === "object" &&
        !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
    );
    if (line) {
      let art = formHelpers.randomArticle();
      line["arr"].push(verb_a.word, art);
      line["verb"] = true;
      line["art"] = art;
      verbs.splice(0, 1);
      secondLine.syllables -= verb_a.syllables;
      secondLine.syllables -= 1;
    }
  } else {
    let diff = firstLine.syllables - 1;
    ///if it fits, push verb_a to firstLine
    if (verb_a.syllables <= diff) {
      let line = Object.values(firstLine).find(
        (a) =>
          typeof a === "object" &&
          !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
      );
      let art = formHelpers.randomArticle();
      if (line) {
        line["arr"].push(verb_a.word, art);
        line["verb"] = true;
        line["art"] = art;
        verbs.splice(0, 1);
        firstLine.syllables -= verb_a.syllables;
        firstLine.syllables -= 1;
      }
    } else {
      ////if it doesn't fit on firstLine, see if it will fit on thirdLine
      diff = thirdLine.syllables - 1;
      if (verb_a.syllables <= diff) {
        let line = Object.values(thirdLine).find(
          (a) =>
            typeof a === "object" &&
            !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
        );
        let art = formHelpers.randomArticle();
        if (line) {
          line["arr"].push(verb_a.word, art);
          line["verb"] = true;
          line["art"] = art;
          verbs.splice(0, 1);
          thirdLine.syllables -= verb_a.syllables;
          thirdLine.syllables -= 1;
        }
      }
    }
  }

  //////////////// logic for animal names < 4 goes here ///////////////////

  // // ////// FIRST LINE WORK ///////////
  // //make array of lines without verbs
  let linesNoV = [firstLine, secondLine, thirdLine].filter(
    (obj) => !Object.values(obj).find((a) => a["verb"])
  );

  //pick random verb
  const randomVP = verbs.splice([Math.floor(Math.random() * 2)], 1)[0];
  // find line in array that has room for verb's syllables
  let line = linesNoV.find((l) => l.syllables - randomVP.syllables >= 0);

  //find open array in line
  let openArr = Object.values(line).find(
    (a) =>
      typeof a === "object" &&
      !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
  );

  //push verb to line
  openArr["arr"].push(randomVP.word);
  openArr["verb"] = true;
  line.syllables = line.syllables -= randomVP.syllables;
  linesNoV.splice(linesNoV.indexOf(line), 1);

  /////////add adjective//////////
  if (formHelpers.randomizer() === 1) {
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
      line.syllables = line.syllables -= adjA.syllables;

      adjs.splice(adjs.indexOf(adjA), 1);
    }
  }

  /////////////SECOND LINE WORK//////////////

  line = linesNoV[0];
  let diffA = line.syllables - 1;

  if (adjs[0] && adjs[0].syllables <= diffA) {
    Object.values(line)
      .find(
        (a) =>
          typeof a === "object" &&
          a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0) &&
          a["arr"].length > 0
      )
      ["arr"].unshift(adjs[0].word);

    line.syllables = line.syllables -= adjs[0].syllables;
  }

  ////////////random: add verb to this line IF THERE'S ROOM/////////////
  if (formHelpers.randomizer() === 1 && verbs[0].syllables <= line.syllables) {
    //find open array in line

    openArr = Object.values(line).find(
      (a) =>
        typeof a === "object" &&
        !a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0)
    );

    //push verb to line
    openArr["arr"].push(verbs[0].word);
    openArr["verb"] = true;
    line.syllables -= verbs[0].syllables;
  }

  ///////// test no.2

  lines = [firstLine, secondLine, thirdLine];

  lines.forEach((line, i) => {
    let lineArr = Object.keys(line);
    lineArr.forEach((key) => {
      if (key === "1" || key === "2") {
        /////////if either array is empty, push a 1-syllable verb/////////
        if (
          key === "1" &&
          lines[i][key]["arr"].length === 0 &&
          lines[i]["2"]["verb"] === false &&
          lines[i]["syllables"] > 0 &&
          formHelpers.randomizer() === 1
        ) {
          let verb = randomVerb_p1();
          lines[i][key]["arr"].push(verb.word);
          lines[i][key]["verb"] = true;
          lines[i]["syllables"] = lines[i]["syllables"] -= verb.syllables;
        }

        /////////////if either array is empty, randomly push a 1-syllable verb////////
        else if (
          key === "1" &&
          lines[i]["2"]["arr"].length === 0 &&
          lines[i][key]["verb"] === false &&
          lines[i]["syllables"] > 0 &&
          formHelpers.randomizer() === 1
        ) {
          let verb = randomVerb_p1();
          lines[i]["2"]["arr"].push(verb.word);
          lines[i]["2"]["verb"] = true;
          lines[i]["syllables"] = lines[i]["syllables"] -= verb.syllables;
        }
        //////////////push a helper////////////
        if (
          key === "1" &&
          lines[i]["2"]["verb"] === true &&
          lines[i]["2"]["art"] === false &&
          lines[i]["syllables"] > 0
        ) {
          let help = formHelpers.randomHelper();
          lines[i]["2"]["arr"].unshift(help);
          lines[i]["syllables"] = lines[i]["syllables"] -= 1;
        }
        //////////push an article///////////
        if (
          key === ["1"] &&
          lines[i]["syllables"] > 0 &&
          lines[i][key]["arr"].length > 0 &&
          lines[i][key]["verb"] === false &&
          lines[i][key]["art"] === false
        ) {
          let art = formHelpers.randomArticle();
          if (
            art === "a" &&
            lines[i]["syllables"] > 1 &&
            lines[i]["2"]["verb"] === true &&
            lines[i]["2"]["arr"].length === 1
          ) {
            let help = formHelpers.randomHelper();
            lines[i][key]["arr"].unshift(art);
            lines[i][key]["art"] = art;
            lines[i]["2"]["arr"].unshift(help);
            lines[i]["syllables"] = lines[i]["syllables"] -= 2;
          } else {
            lines[i][key]["arr"].unshift("the");
            lines[i][key]["art"] = "the";
            lines[i]["syllables"] = lines[i]["syllables"] -= 1;
          }
        }
        /////////// randomly push an adj ////////////
        if (
          lines[i]["syllables"] > 0 &&
          lines[i][key]["verb"] === false &&
          lines[i][key]["arr"].length > 0 &&
          formHelpers.randomizer() === 1
        ) {
          let adjs = adjectivesArr.map((a) => a.word);
          if (
            adjs.includes(lines[i][key]["arr"][0]) ||
            adjs.includes(lines[i][key]["arr"][1]) ||
            adjs.includes(lines[i][key]["arr"][2])
          ) {
            let adjs = adjectivesArr.filter(
              (a) => a.syllables <= lines[i]["syllables"]
            );
            let randomAdj = adjs.splice(
              [Math.floor(Math.random() * adjOneS.length)],
              1
            )[0];
            lines[i][key]["arr"].unshift(randomAdj.word + ",");

            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          } else {
            let adjs = adjectivesArr.filter(
              (a) => a.syllables <= lines[i]["syllables"]
            );
            let randomAdj = adjs.splice(
              [Math.floor(Math.random() * adjOneS.length)],
              1
            )[0];

            lines[i][key]["arr"].unshift(randomAdj.word);

            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          }
        }

        ////////////randomly push an adjective/////////////
        if (
          lines[i][key]["verb"] === false &&
          lines[i]["syllables"] > 0 &&
          lines[i][key]["arr"].length > 0 &&
          formHelpers.randomizer() === 1
        ) {
          let adjs = adjectivesArr.map((a) => a.word);
          let randomAdj = adjOneS.splice(
            [Math.floor(Math.random() * adjOneS.length)],
            1
          )[0];
          if (
            adjs.includes(lines[i][key]["arr"][0]) ||
            adjs.includes(lines[i][key]["arr"][1]) ||
            adjs.includes(lines[i][key]["arr"][2]) ||
            adjs.includes(lines[i][key]["arr"][3])
          ) {
            lines[i][key]["arr"].unshift(randomAdj.word.concat(","));

            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          } else if (
            lines[i]["syllables"] > 0 &&
            formHelpers.randomizer() === 1
          ) {
            let randomAdj = adjOneS.splice(
              [Math.floor(Math.random() * adjOneS.length)],
              1
            )[0];

            lines[i][key]["arr"].unshift(randomAdj.word);

            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          }
        }
      }
    });
  });

  /////////fill up rest of lines./////////

  lines.forEach((line, i) => {
    while (line["syllables"] > 0) {
      let lineArr = Object.keys(line);
      lineArr.forEach((key) => {
        if (key === "1" || key || "2") {
          if (
            lines[i][key]["verb"] === false &&
            lines[i][key]["arr"].length > 0 &&
            (adjs2.includes(lines[i][key]["arr"][0]) ||
              adjs2.includes(lines[i][key]["arr"][1]) ||
              adjs2.includes(lines[i][key]["arr"][2]) ||
              adjs2.includes(lines[i][key]["arr"][3]))
          ) {
            let adj = adjectivesArr
              .filter((adj) => adj.syllables <= lines[i]["syllables"])
              .splice([Math.floor(Math.random() * adjectivesArr.length)], 1)[0];

            if (adj) {
              lines[i][key]["arr"].unshift(adj.word.concat(","));

              lines[i]["syllables"] = lines[i]["syllables"] -= adj.syllables;
            }
          } else if (
            lines[i][key]["verb"] === false &&
            lines[i]["syllables"] > 0 &&
            lines[i][key]["arr"].length > 0
          ) {
            let adjectives = adjectivesArr.filter(
              (a) => a.syllables <= lines[i]["syllables"]
            );
            let adj = adjectives.splice(
              [Math.floor(Math.random() * adjectives.length)],
              1
            )[0];

            lines[i][key]["arr"].unshift(adj.word);

            lines[i]["syllables"] = lines[i]["syllables"] -= adj.syllables;
          }
          if (
            key === "1" &&
            lines[i]["art"] === false &&
            lines[i][key]["arr"].length > 0
          ) {
            let art = formHelpers.randomArticle();

            lines[i][key]["arr"].unshift(art);
            lines[i][key]["art"] = art;

            lines[i]["syllables"] = lines[i]["syllables"] -= 1;
          }
        }
      });
    }
  });

  lines.forEach((line, i) => {
    let lineArr = Object.keys(line);
    lineArr.forEach((key) => {
      if (key === "1" || key === "2") {
        /////  [arr] with [art] (verb_a) push to ["1"]. ////
        if (lines[i]["2"]["art"] === "a" || lines[i]["2"]["art"] === "the") {
          [lines[i]["1"], lines[i]["2"]] = [lines[i]["2"], lines[i]["1"]];
        }
        ///// add "s" to singular nouns followed by verbs /////////
        if (
          key === "1" &&
          lines[i][key]["verb"] === false &&
          lines[i][key]["arr"].length > 0 &&
          // lines[i][key]["art"] === false || lines[i][key][]
          lines[i]["2"]["verb"] === true &&
          lines[i]["2"]["art"] === false &&
          lines[i][key]["arr"][lines[i][key]["arr"].length - 1] !== "deer" &&
          lines[i][key]["arr"][lines[i][key]["arr"].length - 1] !== "moose" &&
          lines[i][key]["arr"][lines[i][key]["arr"].length - 1] !== "trout" &&
          lines[i][key]["arr"][lines[i][key]["arr"].length - 1] !== "cod"
        ) {
          let word = lines[i][key]["arr"][lines[i][key]["arr"].length - 1];

          if (
            formHelpers.isH(word.split("")[word.length - 1]) === true &&
            word !== "cheetah"
          ) {
            word = word.concat("es");
          }

          if (word.slice(word.length - 2, word.length) === "se") {
            word = word.concat("s");
          }

          if (
            (formHelpers.isH(word.split("")[word.length - 1]) === true &&
              word !== "cheetah") ||
            word.slice(word.length - 2, word.length) === "se"
          ) {
            if (lines[i]["2"]["arr"].length > 1) {
              lines[i]["2"]["arr"] =
                lines[i]["2"]["arr"][lines[i]["2"]["arr"].length - 1];
            } else {
              let lastWord =
                lines[i]["2"]["arr"][lines[i]["2"]["arr"].length - 1];
              let lastWordObj = verbs_pArr.find(
                (v) => v.present.word === lastWord
              );

              let verbsShorter = verbs_pArr.filter(
                (v) => v.present.syllables === lastWordObj.present.syllables - 1
              );

              let shorterVerb =
                verbsShorter[Math.floor(Math.random() * verbsShorter.length)]
                  .present.word;

              lines[i]["2"]["arr"][
                lines[i]["2"]["arr"].length - 1
              ] = shorterVerb;

              lines[i]["syllables"] += 1;
            }
          } else if (
            word.split("")[word.length - 1] === "y" &&
            word !== "cay" &&
            word !== "donkey"
          ) {
            word = word.split("").slice(0, -1).join("").concat("ies");
          } else if (word === "wolf") {
            word = "wolves";
          } else {
            word = word.concat("s");
          }
          lines[i][key]["arr"][lines[i][key]["arr"].length - 1] = word;
          lines[i][key]["plural"] = true;
        }
        ///////// add "," to verbs followed by nouns //////////
        if (
          key === "1" &&
          lines[i][key]["arr"].length === 1 &&
          lines[i][key]["verb"] === true &&
          lines[i][key]["art"] === false
        ) {
          lines[i][key]["arr"][0] = lines[i][key]["arr"][0].concat(",");
        }

        if (
          lines[i]["1"]["art"] === "a" &&
          formHelpers.isVowel(lines[i]["2"]["arr"][0].split("")[0]) === true
        ) {
          lines[i]["1"]["arr"][lines[i]["1"]["arr"].length - 1] = "an";
        }
      }
    });
  });

  const linesFinal = lines.map((line) => {
    if (Array.isArray(line["1"]["arr"])) {
      line["1"]["arr"] = line["1"]["arr"].join(" ");
    }

    if (Array.isArray(line["2"]["arr"])) {
      line["2"]["arr"] = line["2"]["arr"].join(" ");
    }

    return line["1"]["arr"] + " " + line["2"]["arr"];
  });

  linesFinal.forEach((line, i) => {
    line = line.trim();

    if (formHelpers.randomizer() === 1) {
      linesFinal[i] = line + formHelpers.randomPunct();
    }
    if (formHelpers.randomizer() === 1) {
      linesFinal[i] = line[0].toUpperCase() + line.slice(1);
    }
  });

  const fiveSylLines = [linesFinal[0], linesFinal[2]];

  const randomLine = fiveSylLines.splice([formHelpers.randomizer1()], 1)[0];

  const otherLine = [fiveSylLines].find((i) => i !== randomLine)[0];

  let haikuHere = [randomLine, linesFinal[1], otherLine];

  return haikuHere;
};

export default formLogic;
