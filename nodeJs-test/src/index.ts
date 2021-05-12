import { call } from "./app/test/caller";
import { Report } from "./app/cv/cv-creator";
import { dataJsonArray } from "./app/cv/data";
require("source-map-support").install();

call();

const report = new Report(dataJsonArray);
report.createHeaderJson();
