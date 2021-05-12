import https from "https";
import { Constants } from "../cv/constants";
import { FileHandler } from "../cv/file-handler";

const _AGENT_KEY = "http.agent";
const _AGENT_VALUE = "Chrome";
const _API_URL = "https://coderbyte.com/api/challenges/json/age-counting";

const _ENCODING = "utf8";

const _OUTPUT_FILE = "./output/output.txt";

export const call = () => {
  const fileHandler = new FileHandler(_OUTPUT_FILE);
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
        const writables = resultMap.get(Constants._VALID_RESULTS);
        if (writables.size > 0) {
          fileHandler.assureFileExists(_OUTPUT_FILE);
          fileHandler.writeArray(_OUTPUT_FILE, Array.from(writables.keys()));
          fileHandler.calculateHash(_OUTPUT_FILE);
        }
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
