import { expect } from "chai";
import { TestParser } from "./test-parser";
import { TestConstants } from "./test-constants";

describe("TestParser", () => {
  let instance: TestParser;

  beforeEach(() => {
    instance = new TestParser();
  });

  it("parseJsonString {'array':['AA', 'BB', 'C1', '23']}", () => {
    const result = instance.parseJsonString(
      '{"data":key=OGqoG, age=31, key=6n8pa, age=32, key=ADTut, age=33, key=WNJXO, age=37, key=qta1A, age=67, key=cJOTp, age=67, key=1Bgd3, age=71"}'
    );
    console.log("result = ", result);
    expect(result.get(TestConstants._VALID_RESULTS).size).to.equal(1);
    expect(result.get(TestConstants._INVALID_RESULTS).size).to.equal(6);
  });
});
