import https from "https";
import fs from "fs";
import crypto from "crypto";

const _SEARCHED_VALUE = 32;
const _AGENT_KEY = "http.agent";
const _AGENT_VALUE = "Chrome";
const _API_URL = "https://coderbyte.com/api/challenges/json/age-counting";

const _ENCODING = "utf8";
const _VALID_RESULTS = "valid";
const _INVALID_RESULTS = "invalid";
const _KEY_IDENTIFIER = "key=";
const _VALUE_IDENTIFIER = "age=";
const _HEADER_IDENTIFIER = '{"data":"';
const _TAIL_IDENTIFIER = '"}';
const _EMPTY_STRING = "";
const _DATA_FILE = "./dist/output.txt";

var algorithm = "sha1",
  shasum = crypto.createHash(algorithm);

export const call = () => {
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
          resultMap = parseJsonString(jsonString);
        } catch (e) {
          console.log(e);
        }
        const writables = resultMap.get(_VALID_RESULTS);
        if (writables.size > 0) {
          assureFileExists(_DATA_FILE);
          write(_DATA_FILE, writables);
          calculateHash(_DATA_FILE);
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

const parseJsonString = (jsonString) => {
  const valuesString = jsonString
    .replace(_HEADER_IDENTIFIER, _EMPTY_STRING)
    .replace(_TAIL_IDENTIFIER, _EMPTY_STRING);
  const valesArray = valuesString.split(",");
  let key;
  let stringValue;
  const validEntriesMap = new Map();
  const invalidEntriesMap = new Map();
  valesArray.forEach((entryPart) => {
    entryPart = entryPart.trim();
    if (entryPart.startsWith(_KEY_IDENTIFIER)) {
      key = entryPart.replace(_KEY_IDENTIFIER, _EMPTY_STRING);
    } else if (entryPart.startsWith(_VALUE_IDENTIFIER)) {
      if (key == null) {
        throw "Key was missing to this value ..." + entryPart;
      }
      stringValue = entryPart.replace(_VALUE_IDENTIFIER, _EMPTY_STRING);
      const value = Number(stringValue);
      if (value === _SEARCHED_VALUE) {
        validEntriesMap.set(key, stringValue);
      } else {
        invalidEntriesMap.set(key, stringValue);
      }
    } else if (entryPart !== "") {
      console.log("Unknown entry found ...", entryPart);
    }
  });
  const resultMap = new Map();
  resultMap.set(_VALID_RESULTS, validEntriesMap);
  resultMap.set(_INVALID_RESULTS, invalidEntriesMap);
  return resultMap;
};

const assureFileExists = (dataFile) => {
  const file = dataFile;
  if (fs.existsSync(file)) {
    console.log(`File :${file}  already exists !`);
  } else {
    // writeFile function with filename, content and callback function
    fs.writeFile(file, "", function (err) {
      if (err) throw err;
    });
  }
};

const write = (dataFile, data) => {
  const stream = fs.createWriteStream(dataFile);

  data.forEach((value, key) => {
    const json = JSON.stringify(key) + "\n";
    fs.appendFile(dataFile, key + "\n", function (err) {
      if (err) {
        console.log("err=", err);
      } else {
      }
    });
  });
};
export const calculateHash = (filename: string) => {
  let promise = new Promise(function (resolve, reject) {
    const file = fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        reject(err);
        console.log("err = ", err);
      }
    });

    const fileStream = fs.createReadStream(filename);
    fileStream.on("data", function (data) {
      shasum.update(data);
    });

    // making digest
    fileStream.on("end", function () {
      const hash = shasum.digest("hex");
      console.log(hash);
      resolve(hash);
    });
  });
  return promise;
};
