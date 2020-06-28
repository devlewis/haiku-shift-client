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
      if (key !== "syllables") {
        let line = lines[i];

        /////////if either array is empty, push a 1-syllable verb/////////
        formHelpers.pushRandomPassiveVerb(key, randomverbPassive1, line);

        //////////////push a helper////////////
        formHelpers.pushRandomHelper(key, line);

        //////////push an article///////////
        formHelpers.pushArticle(key, line);
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
