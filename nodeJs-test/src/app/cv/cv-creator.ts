import { FileHandler } from "./file-handler";
export class Report {
  _OUTPUT_TechnologiesOverTime = "./output/technologies-over-time.json";
  _OUTPUT_TechnologiesUnique = "./output/technologies-unique.json";
  _OUTPUT_TechnologiesLastUsed = "./output/technologies-last-used.json";
  dataJsonArray: any;
  definedHeaders = ["start", "end", "client", "location", "position"];
  fileHandler: FileHandler;

  constructor(dataJsonArray) {
    this.dataJsonArray = dataJsonArray;
    this.fileHandler = new FileHandler(this._OUTPUT_TechnologiesOverTime);
  }
  createHeaderJson = () => {
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
    this.fileHandler.assureFileExists(this._OUTPUT_TechnologiesOverTime);
    this.fileHandler.writeJson(
      this._OUTPUT_TechnologiesOverTime,
      JSON.parse(jsonString)
    );
  };
  createTechnologies = () => {
    this.dataJsonArray.forEach((dataJson) => {
      const data = dataJson.technologies.trim().split("=>");

      const map = new Map();

      data.forEach((word, index) => {
        map.set(word.toLowerCase(), word);
      });
      console.log("map = ", ...map.values());
      var mapAsc = new Map([...map.entries()].sort());
      console.log("mapString = ", Array.from(mapAsc.values()).sort().join(","));
    });
  };
}
