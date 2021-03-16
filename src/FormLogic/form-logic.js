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
  verbActive,
  verbPassive1,
  verbPassive2,
  verbPassiveOneS,
  adjOneS,
  adjs2,
  adjectivesArr,
  verbs_pArr
) => {
  const nouns = [animal1, place, animal2];
  const adjs = [adjective, adjective2];
  const verbs = [verbActive, verbPassive1, verbPassive2];

  const randomverbPassive1 = () =>
    verbPassiveOneS.splice(
      [Math.floor(Math.random() * verbPassiveOneS.length)],
      1
    )[0].present;

  //////////////////// first, get rid of all user word inputs that will fit./////////////////
  let lines = setBanks(nouns, adjs, verbs, randomverbPassive1);

  /////////add one adjective, one helper, one random verb if there's room, and a second adjective/////////
  filler1(lines, randomverbPassive1, adjectivesArr, adjOneS);

  /////////fill up rest of lines until all syllables are full./////////
  filler2(lines, adjs2, adjectivesArr);

  /////////apply grammar rules.
  grammar(lines, verbs_pArr);

  let linesFinal = formHelpers.finalizeLines(lines);

  linesFinal = formHelpers.linesPunctCaps(linesFinal);

  let randomLines = formHelpers.linesRandomizer(linesFinal);

  return randomLines;
};

export default formLogic;
