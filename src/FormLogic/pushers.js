import formHelpers from "./form-helpers";

const pushers = {
  pushRandomAdjective(key, line, adjectivesArr, adjOneS) {
    if (
      line["syllables"] > 0 &&
      line[key]["verb"] === false &&
      line[key]["arr"].length > 0 &&
      formHelpers.randomizer() === 1
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
      let art = formHelpers.randomArticle();
      if (
        art === "a" &&
        line["syllables"] > 1 &&
        line["2"]["verb"] === true &&
        line["2"]["arr"].length === 1
      ) {
        let help = formHelpers.randomHelper();
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
      let help = formHelpers.randomHelper();
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
      formHelpers.randomizer() === 1
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
      formHelpers.randomizer() === 1
    ) {
      let verb = randomverbPassive1();
      line["2"]["arr"].push(verb.word);
      line["2"]["verb"] = true;
      line["syllables"] = line["syllables"] -= verb.syllables;
    }
  },
};

export default pushers;
