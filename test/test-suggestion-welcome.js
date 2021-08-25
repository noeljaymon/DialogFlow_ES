const validateOption = require("../helper/validate_query")
const chai = require("chai");
const should = chai.should();
describe("Validate Suggestions", () => {
  describe("Check options", () => {
      let query1 = "Music Recommendation"
      let query2 = "Play Spotify On Tv"
      let query3 = "Play spotify On Bluetooth"
      let query4 = "Latest Songs"
      let query5 = "Not the right response"

      
      it(`${query1}is correct`, () => {
          let output = true;

          let response = validateOption(query1);
          output.should.deep.equal(response);
      });
      it(`${query5} is not correct`, () => {
          let output = true;

          let response = validateOption(query5);
          output.should.deep.equal(response);
        });
  });
});



