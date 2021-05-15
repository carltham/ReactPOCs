import { Caller } from "./app/test/caller";
import { CvReporter } from "./app/cv/cv-reporter";
import { dataJsonArray } from "./app/cv/data";
import { Constants } from "./app/cv/constants";
require("source-map-support").install();

new Caller();

const reporter = new CvReporter(
  Constants._OUTPUT_TechnologiesOverTime,
  dataJsonArray
);
reporter.createReport();
