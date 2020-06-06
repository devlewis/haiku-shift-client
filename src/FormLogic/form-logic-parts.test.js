import logicParts from "./form-logic-parts";
const expect = require("chai").expect;
import helpers from "./test-helpers";

describe("insertNouns", () => {
  let lines = helpers.makeEmptyPhrases();
  let nouns = helpers.makeNouns();
  let result = logicParts.insertNouns(lines, nouns);

  it("should return an array of objects", () => {
    expect(result).to.be.an("array").that.has.lengthOf(3);
    result.forEach((obj) => {
      expect(obj).to.be.an("object").that.has.all.keys(1, 2, "syllables");
    });
  });

  it("only one of each obj's 2 arrs should contain a word", () => {
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

describe("insert long adj first if more than 3 syllables", () => {
  let lines = helpers.makeEmptyPhrases();
  let nouns = helpers.makeNouns();
  let adjs = helpers.make4Adj();
  let result = logicParts.insertNouns(lines, nouns);
  let result1 = logicParts.insertAdjIf3(result, adjs);

  it("should insert the long adj to an obj arr", () => {});

  it("obj with long adj: syllable count should be 0", () => {});

  it("other objs: obj arrs should be length of 1 or 0, no adjs added", () => {});

  it("adjs array should be length of 2 and not include the spliced adj", () => {});
});
