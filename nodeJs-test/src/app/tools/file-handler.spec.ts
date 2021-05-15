import { expect } from "chai";
import { FileHandler } from "./file-handler";

describe("FileHandler", () => {
  const testOutputFile = "test/testdata/testOutput.txt";
  const testInputFile = "test/testdata/testInput.txt";
  let instance: FileHandler;

  beforeEach(() => {
    instance = new FileHandler(testOutputFile);
  });

  it(
    "should calculate hash from testInputFile - 'OO2Mc, XZbHV, uumoL, cUS5f, GIDFA, A5gR0' : " +
      testInputFile,
    async () => {
      const hash: string = await instance.calculateHash(testInputFile);
      expect(hash).to.equal("78b728314b3e861f4dcac408d7c63b08d6490efd");
    }
  );

  it("assureFileExists when file do exists", () => {
    instance.createFile(testOutputFile);
    const result = instance.assureFileExists(testOutputFile);
    expect(result).to.equal(true);
  });

  it("assureFileExists when file do not exists", () => {
    instance.deleteFile(testOutputFile);
    const result = instance.assureFileExists(testOutputFile);
    expect(result).to.equal(true);
  });

  it("writeArray ['AA', 'BB', 'C1', '23']", () => {
    instance.deleteFile(testOutputFile);
    instance.assureFileExists(testOutputFile);
    const result = instance.writeArray(testOutputFile, [
      "AA",
      "BB",
      "C1",
      "23",
    ]);
    console.log("result = ", result);
    expect(result).to.equal(true);
  });

  it("writeJson {'array':['AA', 'BB', 'C1', '23']}", () => {
    instance.deleteFile(testOutputFile);
    instance.assureFileExists(testOutputFile);
    const result = instance.writeJson(testOutputFile, {
      array: ["AA", "BB", "C1", "23"],
    });
    console.log("result = ", result);
    expect(result).to.equal(true);
  });

  it("writeString {'array':['AA', 'BB', 'C1', '23']}", () => {
    instance.deleteFile(testOutputFile);
    instance.assureFileExists(testOutputFile);
    const result = instance.writeString(
      testOutputFile,
      "{ array: ['AA', 'BB', 'C1', '23'] }"
    );
    console.log("result = ", result);
    expect(result).to.equal(true);
  });
});
