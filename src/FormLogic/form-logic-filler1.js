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
        formHelpers.pushRandomAdjective(key, line, adjectivesArr, adjOneS);
      }
    });
  });
}
