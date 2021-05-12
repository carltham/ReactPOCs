import { expect } from "chai";
import { calculateHash } from "./caller";

describe("index", () => {
  const dataFile = "test/app/output.txt";

  it("should create the app", async () => {
    const hash = await calculateHash(dataFile);
    expect(hash).to.equal("78b728314b3e861f4dcac408d7c63b08d6490efd");
  });
});
