import { expect } from "chai";
import { FileHandler } from "./file-handler";

describe("FileHandler", () => {
  const testDataFile = "test/testdata/output.txt";

  it("should calculate hash" + testDataFile, async () => {
    const instance = new FileHandler(testDataFile);
    const hash = await instance.calculateHash(testDataFile);
    expect(hash).to.equal("78b728314b3e861f4dcac408d7c63b08d6490efd");
  });
});
