import formHelpers from "./form-helpers";
import setBanks from "./form-setBanks";
import filler1 from "./form-logic-filler1";
import filler2 from "./form-logic-filler2";
import grammar from "./form-logic-grammar";

// pass object of parameters. to define inputs. //
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
  let lines = formHelpers.linesConstructor();

  //////////////////// second line must have 7 syllables; default is 5
  lines[1].syllables += 2;

  const nouns = [animal1, place, animal2];
  const adjs = [adjective, adjective2];
  const verbs = [verb_a, verb_p1, verb_p2];

  const randomVerb_p1 = () =>
    verb_pOneS.splice([Math.floor(Math.random() * verb_pOneS.length)], 1)[0]
      .present;

  //////////////////// first, get rid of all word banks that will fit./////////////////
  lines = setBanks(lines, nouns, adjs, verbs, randomVerb_p1);

  filler1(lines, randomVerb_p1, adjectivesArr, adjOneS);

  /////////fill up rest of lines./////////

  filler2(lines, adjs2, adjectivesArr);

  grammar(lines, verbs_pArr);

  const linesFinal = formHelpers.finalizeLines(lines);

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
