import https from "https";
import { Constants } from "../common/constants";
import { FileHandler } from "../tools/file-handler";

const _AGENT_KEY = "http.agent";
const _AGENT_VALUE = "Chrome";
const _API_URL = "https://coderbyte.com/api/challenges/json/age-counting";

const _ENCODING = "utf8";

const _OUTPUT_FILE = "./output/output.txt";

export class Caller {
  constructor() {
    console.log("Caller Instantiated !!");
  }
  makeCall = (outputFile: string) => {
    console.log("Caller.call called !!");
    const fileHandler = new FileHandler(outputFile);
    let hashPromise = new Promise((resolve, reject) => {
      const req = https
        .get(_API_URL, (resp) => {
          resp.setEncoding(_ENCODING);
          let data = "";

          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            let jsonData = JSON.parse(data);
            let jsonString = jsonData.data;
            let resultMap;
            try {
              resultMap = fileHandler.parseJsonString(jsonString);
            } catch (e) {
              console.log(e);
            }
            const writables = Array.of(
              ...resultMap.get(Constants._VALID_RESULTS).keys()
            );
            if (writables.length > 0) {
              let keys = Array.from(writables.keys());
              console.log("writables = ", writables);
              console.log("keys = ", keys);
              fileHandler.assureFileExists(outputFile);
              fileHandler.writeArray(outputFile, writables);

              let hash = fileHandler.calculateHash(outputFile);
              console.log("hash = ", hash);
              resolve(hash);
            }
          });
        })
        .on("error", (error) => {
          console.log("Error: " + error.message);
          reject(error);
        });

      req.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      req.end();
    });
    return hashPromise;
  };
}
