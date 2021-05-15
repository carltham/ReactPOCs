import { expect } from "chai";
import { Caller } from "./caller";

describe("Caller", () => {
  const testDataFile = "test/testdata/output.txt";

  it("should create the app", () => {
    const instance = new Caller();
    expect(instance).to.be.an.instanceof(Caller);
  });
});
