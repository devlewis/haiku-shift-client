import formHelpers from "./form-helpers";

export default function grammar(lines, verbs_pArr) {
  lines.forEach((line, i) => {
    let lineArr = Object.keys(line);
    lineArr.forEach((key) => {
      ///// don't apply to key "syllables" ////
      if (key === "1" || key === "2") {
        ///// articles must be in the first section.
        ///// ex: "pray" "the cats" should be "the cats" "pray" (plural handled later)
        /////
        ///// find [arr] with [art] (verbActive); push to ["1"].  ////
        if (lines[i]["2"]["art"] === "a" || lines[i]["2"]["art"] === "the") {
          [lines[i]["1"], lines[i]["2"]] = [lines[i]["2"], lines[i]["1"]];
        }
        ///// pluralize singular nouns followed by verbs sans articles ///////
        if (
          key === "1" &&
          lines[i][key]["verb"] === false &&
          lines[i][key]["arr"].length > 0 &&
          lines[i]["2"]["verb"] === true &&
          lines[i]["2"]["art"] === false &&
          !formHelpers.isPlur(
            lines[i][key]["arr"][lines[i][key]["arr"].length - 1]
          )
        ) {
          let word = lines[i][key]["arr"][lines[i][key]["arr"].length - 1];
          ///////// for words that need "es" at the end: ///////
          //////// ex. "fox" -> "foxes" /////////
          if (
            formHelpers.isH(word.split("")[word.length - 1]) === true &&
            word !== "cheetah"
          ) {
            word = word.concat("es");
          }

          if (word.slice(word.length - 2, word.length) === "se") {
            word = word.concat("s");
          }

          /////////if you added a syllable (fox -> foxes): //////////
          if (
            (formHelpers.isH(word.split("")[word.length - 1]) === true &&
              word !== "cheetah") ||
            word.slice(word.length - 2, word.length) === "se"
          ) {
            //////////////if you have more than one word in the section, delete
            //////////////the end word to make room for extra syllable
            if (lines[i]["2"]["arr"].length > 1) {
              lines[i]["2"]["arr"] =
                lines[i]["2"]["arr"][lines[i]["2"]["arr"].length - 1];
            } else {
              //////////////else,
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
}
