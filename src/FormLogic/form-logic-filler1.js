import pushers from "./pushers";

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
        pushers.pushRandomPassiveVerb(key, randomverbPassive1, line);

        //////////////push a helper////////////
        pushers.pushRandomHelper(key, line);

        //////////push an article///////////
        pushers.pushArticle(key, line);

        /////////// randomly push an adj ////////////
        pushers.pushRandomAdjective(key, line, adjectivesArr, adjOneS);
      }
    });
  });
}
