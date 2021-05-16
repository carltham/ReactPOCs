import { expect } from "chai";
import { CvReporter } from "./cv-reporter";
import { dataJsonArray } from "./data";
import { Constants } from "./constants";

describe("CvReporter", () => {
  let instance: CvReporter;

  beforeEach(() => {
    instance = new CvReporter(dataJsonArray);
  });

  it("createReport._OUTPUT_TechnologiesLastUsed", () => {
    const result = instance.createReport(
      Constants._OUTPUT_TechnologiesLastUsed
    );
    console.log("result = ", result);
  });

  it("createReport._OUTPUT_TechnologiesOverTime", () => {
    const result = instance.createReport(
      Constants._OUTPUT_TechnologiesOverTime
    );
    console.log("result = ", result);
  });

  it("createReport._OUTPUT_TechnologiesUnique", () => {
    const result = instance.createReport(Constants._OUTPUT_TechnologiesUnique);
    console.log("result = ", result);
  });
});
