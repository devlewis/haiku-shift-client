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

  const punctBank = [";", "...", "."];
  const articlesBank = ["the", "a"];
  const helperBank = ["will", "did", "should", "could", "might"];

  const randomArticle = () =>
    articlesBank.splice(
      [Math.floor(Math.random() * articlesBank.length)],
      1
    )[0];

  const randomHelper = () =>
    helperBank.splice([Math.floor(Math.random() * helperBank.length)], 1)[0];

  const randomVerb_p1 = () =>
    verb_pOneS.splice([Math.floor(Math.random() * verb_pOneS.length)], 1)[0]
      .present;

  const randomizer = () => Math.ceil(Math.random() * 2);

  const randomizer1 = () => Math.floor(Math.random() * 2);

  const isVowel = (c) => ["a", "e", "i", "o", "u"].indexOf(c) !== -1;

  const isH = (c) => ["s", "h", "x", "z"].indexOf(c) !== -1;

  const randomPunct = () =>
    punctBank.splice([Math.floor(Math.random() * punctBank.length)], 1)[0];

  //put one noun per line

  //noun4 goes into 7-syllable line; randomly place other nouns
  secondLine[randomizer()].arr.push(animal1.word);
  secondLine.syllables -= animal1.syllables;
  firstLine[randomizer()].arr.push(animal2.word);
  firstLine.syllables -= animal2.syllables;
  thirdLine[randomizer()].arr.push(place.word);
  thirdLine.syllables -= place.syllables;

  //if more than 3 syllables, adjective pushes first.

  if (adjs[0].syllables > 3) {
    let linesA = lines.find((line) => line["syllables"] >= 4);
    console.log(linesA);
    if (linesA) {
      console.log(Object.values(Object.values(linesA)[0]));
      let arr = Object.values(linesA).find(
        (obj) => Object.values(obj)[0].length === 1
      );
      console.log(arr);
      arr["arr"].unshift(adjs[0].word);
      linesA["syllables"] = linesA["syllables"] -= adjs[0].syllables;
      adjs.splice(0, 1);
    }
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
      let art = randomArticle();
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
      let art = randomArticle();
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
        let art = randomArticle();
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

  // ///////////// logic for animal names < 4 goes here ///////////////////

  // // ////// FIRST LINE WORK ///////////
  // //make array of lines without verbs
  let linesNoV = [firstLine, secondLine, thirdLine].filter(
    (obj) => !Object.values(obj).find((a) => a["verb"])
  );

  //pick random verb
  const randomVP = verbs.splice([Math.floor(Math.random() * 2)], 1)[0];
  console.log(randomVP);
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
  console.log("pushed a verb. took away syllables?");
  console.log(line.syllables);
  line.syllables = line.syllables -= randomVP.syllables;
  console.log(line.syllables);
  linesNoV.splice(linesNoV.indexOf(line), 1);

  /////////add adjective//////////
  if (randomizer() === 1) {
    const diffB = line.syllables - 1;

    const adjA = adjs.find((a) => a.syllables <= diffB);
    console.log(adjA);
    if (adjA) {
      Object.values(line)
        .find(
          (a) =>
            typeof a === "object" &&
            a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0) &&
            a["arr"].length > 0
        )
        ["arr"].unshift(adjA.word);
      console.log("pushed an adj");
      line.syllables = line.syllables -= adjA.syllables;

      adjs.splice(adjs.indexOf(adjA), 1);
    }
  }

  // ///////////SECOND LINE WORK//////////////

  line = linesNoV[0];
  let diffA = line.syllables - 1;

  console.log(adjs[0]);

  if (adjs[0] && adjs[0].syllables <= diffA) {
    Object.values(line)
      .find(
        (a) =>
          typeof a === "object" &&
          a["arr"].some((r) => nouns.map((a) => a.word).indexOf(r) >= 0) &&
          a["arr"].length > 0
      )
      ["arr"].unshift(adjs[0].word);

    console.log("pushed an adj");

    line.syllables = line.syllables -= adjs[0].syllables;
  }

  ////////random: add verb to this line IF THERE'S ROOM/////////////
  if (randomizer() === 1 && verbs[0].syllables <= line.syllables) {
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

  //////////////testing #2 ////////////////////
  // firstLine = {
  //   1: { arr: ["the", "cockroach"], verb: true, art: true },
  //   2: { arr: ["will", "eat"], verb: false, art: false },
  //   syllables: 0,
  // };
  // secondLine = {
  //   1: { arr: ["the", "blue", "fox"], verb: false, art: false },
  //   2: { arr: ["will elevate"], verb: false, art: false },
  //   syllables: 3,
  // };
  // thirdLine = {
  //   1: { arr: ["valley"], verb: false, art: false },
  //   2: { arr: [], verb: false, art: false },
  //   syllables: 3,
  // };

  lines = [firstLine, secondLine, thirdLine];

  console.log("pre-change lines", lines);

  lines.forEach((line, i) => {
    console.log("i:", i);
    let lineArr = Object.keys(line);
    lineArr.forEach((key) => {
      console.log("key:", key);
      if (key === "1" || key === "2") {
        console.log("arrlength:", lines[i][key]["arr"].length);
        console.log("syllables:", lines[i]["syllables"]);
        /////////if either array is empty, push a 1-syllable verb/////////
        if (
          key === "1" &&
          lines[i][key]["arr"].length === 0 &&
          lines[i]["2"]["verb"] === false &&
          lines[i]["syllables"] > 0 &&
          randomizer() === 1
        ) {
          let verb = randomVerb_p1();
          lines[i][key]["arr"].push(verb.word);
          lines[i][key]["verb"] = true;
          console.log(lines[i]["syllables"]);
          lines[i]["syllables"] = lines[i]["syllables"] -= verb.syllables;
        }

        /////////////if either array is empty, randomly push a 1-syllable verb////////
        else if (
          key === "1" &&
          lines[i]["2"]["arr"].length === 0 &&
          lines[i][key]["verb"] === false &&
          lines[i]["syllables"] > 0 &&
          randomizer() === 1
        ) {
          let verb = randomVerb_p1();
          lines[i]["2"]["arr"].push(verb.word);
          lines[i]["2"]["verb"] = true;
          console.log(lines[i]["syllables"]);
          lines[i]["syllables"] = lines[i]["syllables"] -= verb.syllables;
        }
        //     //////////////push a helper////////////
        if (
          key === "1" &&
          lines[i]["2"]["verb"] === true &&
          lines[i]["2"]["art"] === false &&
          lines[i]["syllables"] > 0
        ) {
          console.log("pushed a helper");
          let help = randomHelper();
          lines[i]["2"]["arr"].unshift(help);
          console.log(lines[i]["syllables"]);
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
          let art = randomArticle();
          if (
            art === "a" &&
            lines[i]["syllables"] > 1 &&
            lines[i]["2"]["verb"] === true &&
            lines[i]["2"]["arr"].length === 1
          ) {
            console.log("inside random article", art);
            let help = randomHelper();
            lines[i][key]["arr"].unshift(art);
            lines[i][key]["art"] = art;
            lines[i]["2"]["arr"].unshift(help);
            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -= 2;
          } else {
            lines[i][key]["arr"].unshift("the");
            lines[i][key]["art"] = "the";
            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -= 1;
          }
        }
        ////////randomly push an adj ////////////
        if (
          lines[i]["syllables"] > 0 &&
          lines[i][key]["verb"] === false &&
          lines[i][key]["arr"].length > 0 &&
          randomizer() === 1
        ) {
          console.log(
            key,
            lines[i]["syllables"],
            lines[i][key]["arr"].length,
            lines[i][key]["verb"],
            lines[i][key]["art"]
          );

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
            console.log(randomAdj);
            console.log("inside first first adj");
            lines[i][key]["arr"].unshift(randomAdj.word + ",");

            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          } else {
            console.log("first random adj");
            let adjs = adjectivesArr.filter(
              (a) => a.syllables <= lines[i]["syllables"]
            );
            let randomAdj = adjs.splice(
              [Math.floor(Math.random() * adjOneS.length)],
              1
            )[0];

            console.log(randomAdj);
            lines[i][key]["arr"].unshift(randomAdj.word);

            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          }
        }

        ////////////randomly push an adjective/////////////
        if (
          lines[i][key]["verb"] === false &&
          lines[i]["syllables"] > 0 &&
          lines[i][key]["arr"].length > 0 &&
          randomizer() === 1
        ) {
          console.log("inside second adjective");
          let adjs = this.adjectivesArr.map((a) => a.word);
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
            console.log(randomAdj);
            lines[i][key]["arr"].unshift(randomAdj.word.concat(","));
            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          } else if (lines[i]["syllables"] > 0 && randomizer() === 1) {
            let randomAdj = adjOneS.splice(
              [Math.floor(Math.random() * adjOneS.length)],
              1
            )[0];
            console.log(randomAdj);
            lines[i][key]["arr"].unshift(randomAdj.word);
            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -=
              randomAdj.syllables;
          }
        }
      }
    });
  });
  console.log(lines);

  /////fill up rest of lines.////////

  lines.forEach((line, i) => {
    console.log("syllables check", line["syllables"]);
    while (line["syllables"] > 0) {
      let lineArr = Object.keys(line);
      lineArr.forEach((key) => {
        console.log();
        console.log("i:", i);
        console.log("key:", key);
        if (key === "1" || key || "2") {
          console.log("syllables:", lines[i]["syllables"]);
          if (
            lines[i][key]["verb"] === false &&
            lines[i][key]["arr"].length > 0 &&
            (adjs2.includes(lines[i][key]["arr"][0]) ||
              adjs2.includes(lines[i][key]["arr"][1]) ||
              adjs2.includes(lines[i][key]["arr"][2]) ||
              adjs2.includes(lines[i][key]["arr"][3]))
          ) {
            console.log(adjectivesArr);
            let adj = adjectivesArr.splice(
              [Math.floor(Math.random() * adjectivesArr.length)],
              1
            )[0];
            console.log(adj);
            if (adj) {
              lines[i][key]["arr"].unshift(adj.word.concat(","));
              console.log(lines[i]["syllables"]);
              lines[i]["syllables"] = lines[i]["syllables"] -= adj.syllables;
            }
          } else if (
            lines[i][key]["verb"] === false &&
            lines[i]["syllables"] > 0
          ) {
            let adjectives = this.adjectivesArr.filter(
              (a) => a.syllables <= lines[i]["syllables"]
            );
            console.log(adjectives);
            let adj = adjectives.splice(
              [Math.floor(Math.random() * adjectives.length)],
              1
            )[0];
            console.log(lines[i]["syllables"]);
            console.log(adj);
            lines[i][key]["arr"].unshift(adj.word);
            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -= adj.syllables;
          }
          if (
            key === "1" &&
            lines[i]["art"] === false &&
            lines[i][key]["arr"].length > 0
          ) {
            let art = randomArticle();
            console.log("inside random article", art);
            lines[i][key]["arr"].unshift(art);
            lines[i][key]["art"] = art;
            console.log(lines[i]["syllables"]);
            lines[i]["syllables"] = lines[i]["syllables"] -= 1;
          }
        }
      });
    }
  });

  lines.forEach((line, i) => {
    let lineArr = Object.keys(line);
    lineArr.forEach((key) => {
      console.log("key:", key);
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
          console.log("trying to add s");
          let word = lines[i][key]["arr"][lines[i][key]["arr"].length - 1];

          if (
            isH(word.split("")[word.length - 1]) === true &&
            word !== "cheetah"
          ) {
            word = word.concat("es");
          }

          if (word.slice(word.length - 2, word.length) === "se") {
            word = word.concat("s");
          }

          if (
            (isH(word.split("")[word.length - 1]) === true &&
              word !== "cheetah") ||
            word.slice(word.length - 2, word.length) === "se"
          ) {
            if (lines[i]["2"]["arr"].length > 1) {
              lines[i]["2"]["arr"] =
                lines[i]["2"]["arr"][lines[i]["2"]["arr"].length - 1];
              console.log(lines[i]["2"]["arr"]);
            } else {
              let lastWord =
                lines[i]["2"]["arr"][lines[i]["2"]["arr"].length - 1];
              let lastWordObj = verbs_pArr.find(
                (v) => v.present.word === lastWord
              );
              console.log(lastWordObj);
              let verbsShorter = verbs_pArr.filter(
                (v) => v.present.syllables === lastWordObj.present.syllables - 1
              );
              console.log(verbsShorter, "verbsShorter");
              console.log(
                lines[i]["2"]["arr"][lines[i]["2"]["arr"].length - 1]
              );

              let shorterVerb =
                verbsShorter[Math.floor(Math.random() * verbsShorter.length)]
                  .present.word;

              lines[i]["2"]["arr"][
                lines[i]["2"]["arr"].length - 1
              ] = shorterVerb;

              console.log(lines[i]["2"]["arr"]);

              console.log(lines[i]["syllables"]);
              lines[i]["syllables"] += 1;
              console.log(lines[i]["syllables"]);
            }
          } else if (
            word.split("")[word.length - 1] === "y" &&
            word !== "cay"
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
          console.log("trying to add comma");
          lines[i][key]["arr"][0] = lines[i][key]["arr"][0].concat(",");
        }

        if (
          lines[i]["1"]["art"] === "a" &&
          isVowel(lines[i]["2"]["arr"][0].split("")[0]) === true
        ) {
          lines[i]["1"]["arr"][lines[i]["1"]["arr"].length - 1] = "an";
        }
      }
    });
  });

  const linesFinal = lines.map((line) => {
    console.log(line["1"]["arr"]);
    console.log(line["2"]["arr"]);

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

    console.log(line);
    if (randomizer() === 1) {
      console.log(randomizer());
      console.log(line);
      linesFinal[i] = line + randomPunct();
      console.log(line);
    }
    if (randomizer() === 1) {
      console.log(randomizer());
      console.log(line);
      linesFinal[i] = line[0].toUpperCase() + line.slice(1);
      console.log(line);
    }
  });

  console.log(linesFinal);

  const fiveSylLines = [linesFinal[0], linesFinal[2]];

  console.log(randomizer1());

  const randomLine = fiveSylLines.splice([randomizer1()], 1)[0];

  console.log(randomLine);

  const otherLine = [fiveSylLines].find((i) => i !== randomLine)[0];

  console.log(otherLine);

  let haikuHere = [randomLine, linesFinal[1], otherLine];

  return haikuHere;
};

export default formLogic;