import formHelpers from "./form-helpers";
const expect = require("chai").expect;

describe("randomArticle", () => {
  let result = formHelpers.randomArticle();
  it("should return 'the' or 'a'", () => {
    expect(result).to.be.oneOf(["the", "a"]);
  });
});
