import logicParts from "./form-logic-parts";
const expect = require("chai").expect;

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

const nouns = [
  { word: "alpaca", syllables: 3 },
  { word: "jungle", syllables: 2 },
  { word: "cow", syllables: 1 },
];

describe("insertNouns", () => {
  let result = logicParts.insertNouns(lines, nouns);

  it("should return an array of objects", () => {
    expect(result).to.be.an("array").that.has.lengthOf(3);

    result.forEach((obj) => {
      expect(obj).to.be.an("object").that.has.all.keys(1, 2, "syllables");
    });
  });

  it("one of each obj arrs should contain a word", () => {
    result.forEach((obj) => {
      if (obj[1]["arr"].length === 0) {
        expect(obj[2]["arr"]).to.have.lengthOf(1);
      } else {
        expect(obj[1]["arr"]).to.have.lengthOf(1);
      }
    });
  });

  it("each obj arr should contain the correct word", () => {
    if (result[0][1]["arr"].length === 1) {
      expect(result[0][1]["arr"][0]).to.equal("cow");
    } else {
      expect(result[0][2]["arr"][0]).to.equal("cow");
    }

    if (result[1][1]["arr"].length === 1) {
      expect(result[1][1]["arr"][0]).to.equal("alpaca");
    } else {
      expect(result[1][2]["arr"][0]).to.equal("alpaca");
    }

    if (result[2][1]["arr"].length === 1) {
      expect(result[2][1]["arr"][0]).to.equal("jungle");
    } else {
      expect(result[2][2]["arr"][0]).to.equal("jungle");
    }
  });
});
