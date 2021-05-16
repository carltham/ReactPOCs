import { FileHandler } from "../tools/file-handler";
import { Constants, ReportType } from "./constants";
import { StringTool } from "../tools/string-tool";
export class CvReporter {
  reportType: ReportType;
  fileHandler: FileHandler;
  dataJsonArray: any;
  definedHeaders = ["start", "end", "client", "location", "position"];
  lastClientName = "Unknown";

  constructor(dataJsonArray: any) {
    this.dataJsonArray = dataJsonArray;
  }
  createReport = (reportType: ReportType) => {
    this.reportType = reportType;
    this.fileHandler = new FileHandler(reportType.fileName);
    this.fileHandler.deleteFile(reportType.fileName);

    let clientArray;
    switch (reportType) {
      case Constants._OUTPUT_TechnologiesLastUsed:
        clientArray = this.create_LastUsed_ClientArray();
        break;
      case Constants._OUTPUT_TechnologiesOverTime:
        clientArray = this.create_OverTime_ClientArray();
        break;
      default:
        // case Constants._OUTPUT_TechnologiesUnique:
        clientArray = this.create_Unique_ClientArray();
        break;
    }
    const jsonString = '{ "entries":[ ' + clientArray.join() + "] }";
    this.fileHandler.assureFileExists(this.reportType.fileName);
    this.fileHandler.writeJson(
      this.reportType.fileName,
      JSON.parse(jsonString)
    );
  };

  parseTechnologies = (
    dataJson: any,
    technologiesMap: any = new Map(),
    headerMap: any = null
  ) => {
    const technologies = dataJson.technologies.trim().split(",");
    technologies.forEach((word, index) => {
      if (word.trim() !== "") {
        const indexHeader = '"' + word.trim().toUpperCase() + '"';
        const newTechnologyBody = {
          name: '"' + StringTool.upperStarting(word.trim()) + '"',
          header: headerMap,
        };
        const savedTechnologyBody = technologiesMap.get(indexHeader);
        if (
          !savedTechnologyBody ||
          !savedTechnologyBody.header ||
          savedTechnologyBody.header.end < newTechnologyBody.header.end
        ) {
          technologiesMap.set(indexHeader, newTechnologyBody);
        }
      }
    });
    return technologiesMap;
  };

  parseHeader = (dataJson: any) => {
    const head = dataJson.head.trim().split("=>");
    const headerMap = new Map();
    head.forEach((word, index) => {
      if (this.definedHeaders[index] === "client") {
        this.lastClientName = word;
      }
      headerMap.set(
        this.definedHeaders[index],
        '"' + this.definedHeaders[index] + '":' + '"' + word + '"'
      );
    });
    return headerMap;
  };

  create_LastUsed_ClientArray = () => {
    const jsonArray = [];
    const technologiesMap = new Map();

    this.dataJsonArray.forEach((dataJson) => {
      const headerMap = this.parseHeader(dataJson);
      this.parseTechnologies(dataJson, technologiesMap, headerMap);
    });

    const technologiesString = Array.from(technologiesMap.values())
      .sort()
      .map((technologyBody) => {
        let technology: string = "{" + technologyBody.name;
        if (technologyBody.header) {
          const headerContent =
            "{" + Array.from(technologyBody.header.values()) + "}";
          this.check(
            "create_LastUsed_ClientArray::headerContent",
            headerContent
          );
          technology += ":" + headerContent;
        }
        technology += "}";

        this.check("create_LastUsed_ClientArray::technology", technology);
        return technology;
      });

    const jsonComponentString = '{"technologies":[' + technologiesString + "]}";
    this.check("create_LastUsed_ClientArray", jsonComponentString);
    jsonArray.push(jsonComponentString);
    return jsonArray;
  };
  create_OverTime_ClientArray = () => {
    const jsonArray = [];

    this.dataJsonArray.forEach((dataJson) => {
      let headerString = Array.from(this.parseHeader(dataJson).values()).join(
        " ,"
      );

      const technologiesMap = this.parseTechnologies(dataJson);
      const technologiesArray = Array.from(technologiesMap.values()).map(
        (technologyBody: any) => {
          let technology: string = technologyBody.name;
          if (technologyBody.header) {
            const headerContent =
              "{" + Array.from(technologyBody.header.values()) + "}";
            this.check(
              "create_LastUsed_ClientArray::headerContent",
              headerContent
            );
            technology += ":" + headerContent;
          }

          this.check("create_LastUsed_ClientArray::technology", technology);
          return technology;
        }
      );
      console.log("technologiesArray = ", technologiesArray);

      const jsonComponentString =
        '{"' +
        this.lastClientName +
        '":{' +
        '"head":{' +
        headerString +
        '},"technologies":[' +
        technologiesArray.sort() +
        "]}}";

      console.log("jsonComponentString = ", jsonComponentString);

      this.check("create_OverTime_ClientArray", jsonComponentString);
      jsonArray.push(jsonComponentString);
    });
    return jsonArray;
  };

  create_Unique_ClientArray = () => {
    const jsonArray = [];
    const technologiesMap = new Map();

    this.dataJsonArray.forEach((dataJson) => {
      this.parseTechnologies(dataJson, technologiesMap);
    });

    const technologiesString = Array.from(technologiesMap.values())
      .sort()
      .map((technologyBody) => {
        let technology: string = technologyBody.name;
        if (technologyBody.header) {
          const headerContent =
            "{" + Array.from(technologyBody.header.values()) + "}";
          this.check(
            "create_LastUsed_ClientArray::headerContent",
            headerContent
          );
          technology += ":" + headerContent;
        }

        this.check("create_LastUsed_ClientArray::technology", technology);
        return technology;
      });

    const jsonComponentString = '{"technologies":[' + technologiesString + "]}";
    this.check("create_Unique_ClientArray", jsonComponentString);
    jsonArray.push(jsonComponentString);
    return jsonArray;
  };

  check = (caller: string, jsonComponentString: string) => {
    try {
      JSON.parse(jsonComponentString);
    } catch (error) {
      console.log(caller, "::error = ", jsonComponentString);
      throw error;
    }
  };
}
