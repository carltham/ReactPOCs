import { expect } from "chai";
import { CvReporter } from "./cv-reporter";
import { dataJsonArray } from "../../../dist/app/cv/data";
import { Constants } from "./constants";

describe("CvReporter", () => {
  let instance: CvReporter;

  beforeEach(() => {
    instance = new CvReporter(
      Constants._OUTPUT_TechnologiesOverTime,
      dataJsonArray
    );
  });

  it("createReport", () => {
    const result = instance.createReport();
    console.log("result = ", result);
  });
});
