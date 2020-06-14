import formHelpers from "./form-helpers";

export default function filler1(
  lines,
  randomverbPassive1,
  adjectivesArr,
  adjOneS
) {
  return lines.forEach((line, i) => {
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
          let verb = randomverbPassive1();
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
          let verb = randomverbPassive1();
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
}
