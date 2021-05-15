import { FileHandler } from "../tools/file-handler";
import { Constants, ReportType } from "./constants";
export class CvReporter {
  dataJsonArray: any;
  definedHeaders = ["start", "end", "client", "location", "position"];
  fileHandler: FileHandler;

  constructor(private reportType: ReportType, dataJsonArray: any) {
    this.dataJsonArray = dataJsonArray;
    this.fileHandler = new FileHandler(reportType.fileName);
  }
  createReport = () => {
    const jsonArray = [];
    this.dataJsonArray.forEach((dataJson) => {
      const head = dataJson.head.trim().split("=>");
      const technologies = dataJson.technologies.trim().split(",");

      const headMap = new Map();
      const technologiesMap = new Map();
      let clientName = "Unknown";
      head.forEach((word, index) => {
        if (this.definedHeaders[index] === "client") {
          clientName = word;
        }
        headMap.set(
          this.definedHeaders[index],
          '"' + this.definedHeaders[index] + '":' + '"' + word + '"'
        );
      });
      technologies.forEach((word, index) => {
        technologiesMap.set(index, '"' + word.trim() + '"');
      });
      let headerString = Array.from(headMap.values()).join(" ,");
      let technologiesString = Array.from(technologiesMap.values()).join(" ,");
      // console.log("technologiesString = ", technologiesString);

      let jsonComponentString =
        '{"' +
        clientName +
        '":{' +
        '"head":{' +
        headerString +
        '},"technologies":[' +
        technologiesString +
        "]}}";
      try {
        JSON.parse(jsonComponentString);
      } catch (error) {
        console.log(jsonComponentString);
        throw error;
      }
      jsonArray.push(jsonComponentString);
    });

    const jsonString = '{ "entries":[ ' + jsonArray.join() + "] }";
    // console.log("jsonString = ", jsonString);
    // console.log("jsonized = ", JSON.parse(jsonString));
    this.fileHandler.assureFileExists(this.reportType.fileName);
    this.fileHandler.writeJson(
      this.reportType.fileName,
      JSON.parse(jsonString)
    );
  };
}
