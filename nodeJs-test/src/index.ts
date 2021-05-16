import { Caller } from "./app/test/caller";
import { CvReporter } from "./app/cv/cv-reporter";
import { dataJsonArray } from "./app/cv/data";
import { Constants } from "./app/cv/constants";
require("source-map-support").install();

new Caller();

const reporter = new CvReporter(dataJsonArray);
reporter.createReport(Constants._OUTPUT_TechnologiesLastUsed);
reporter.createReport(Constants._OUTPUT_TechnologiesOverTime);
reporter.createReport(Constants._OUTPUT_TechnologiesUnique);
