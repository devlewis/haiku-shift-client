import formLogic from "./form-logic";
import verbs_p from "../WordBanks/VerbsPassive";
import adjectives from "../WordBanks/Adjectives";

const expect = require("chai").expect;
//////////testing element no. 1/////////////////
// const animal1 = { word: "cat", syllables: 1 };
// const animal2 = { word: "ant", syllables: 1 };
// const place = { word: "rainforest", syllables: 3 };
// const adjective = { word: "cantankerous", syllables: 4 };
// const adjective2 = { word: "red", syllables: 1 };
// const verbActive = { word: "ask", syllables: 1 };
// const verbPassive1 = { word: "faint", syllables: 1 };
// const verbPassive2 = { word: "pray", syllables: 1 };

///////////testing element no. 2////////////////
const animal1 = { word: "deer", syllables: 1 };
const animal2 = { word: "moose", syllables: 1 };
const place = { word: "road", syllables: 1 };
const adjective = { word: "blue", syllables: 1 };
const adjective2 = { word: "red", syllables: 1 };
const verbActive = { word: "ask", syllables: 1 };
const verbPassive1 = { word: "faint", syllables: 1 };
const verbPassive2 = { word: "pray", syllables: 1 };
let verbPassiveOneS = verbs_p.filter((v) => v.present.syllables === 1);
let adjOneS = adjectives.filter((a) => a.syllables === 1);
let adjs2 = adjectives.map((a) => a.word);

describe("results of whole form are correct", () => {
  let result = formLogic(
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
    adjectives,
    verbs_p
  );

  it("should return an array of 3 strings", () => {
    console.log(result);
    expect(result).to.be.an("array").of.length(3);
  });
});
