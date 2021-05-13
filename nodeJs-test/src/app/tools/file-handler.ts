import fs from "fs";
import crypto, { Hash } from "crypto";
import { Constants } from "../common/constants";

export class FileHandler {
  fileName: string;
  algorithm: string = "sha1";
  shasum: Hash;

  constructor(fileName: string) {
    this.shasum = crypto.createHash(this.algorithm);
    // console.log("this.shasum = ", this.shasum);
    this.fileName = fileName;
  }

  calculateHash = (filename: string) => {
    return this.calculateHashImpl(filename, this.shasum);
  };

  calculateHashImpl = (filename: string, shasum) => {
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

  assureFileExists = (fileName) => {
    const file = fileName;
    if (fs.existsSync(file)) {
      console.log(`File :${file}  already exists !`);
    } else {
      console.log(`File :${file}  does not exists !`);
      const nameArray = fileName.split("/");
      if (nameArray.length > 1) {
        const path = nameArray.slice(0, nameArray.length - 1).join("/");
        console.log(`Assuring path :${path} !`);
        if (fs.existsSync(path)) {
          console.log("Directory exists!");
        } else {
          console.log(`Directory not found, creating ${path}`);
          fs.mkdirSync(path, { recursive: true });
        }
      }
      console.log(`Creating file :${fileName} !`);
      fs.writeFile(file, "", function (err) {
        if (err) throw err;
      });
    }
  };

  writeArray = async (fileName, data) => {
    let result = await new Promise((resolve, reject) => {
      fs.unlinkSync(fileName);
      console.log("data = ", data);
      data.forEach((value) => {
        const json = JSON.stringify(value) + "\n";
        // console.log("json = ", json);

        fs.appendFileSync(fileName, value + "\n");
      });
    });
    console.log("result = ", result);
  };

  writeJson = (fileName: string, obj: object) => {
    const jsonString = JSON.stringify(obj, null, 2);

    fs.writeFile(fileName, jsonString, function (err) {
      if (err) {
        console.log("err=", err);
      }
    });
  };

  writeString = (fileName: string, jsonString: string) => {
    console.log("writeString::jsonString =  ", jsonString);

    fs.writeFile(fileName, jsonString, function (err) {
      if (err) {
        console.log("err=", err);
      } else {
        console.log("result=", err);
      }
    });
  };

  parseJsonString = (jsonString) => {
    const valuesString = jsonString
      .replace(Constants._HEADER_IDENTIFIER, Constants._EMPTY_STRING)
      .replace(Constants._TAIL_IDENTIFIER, Constants._EMPTY_STRING);
    const valesArray = valuesString.split(",");
    let key;
    let stringValue;
    const validEntriesMap = new Map();
    const invalidEntriesMap = new Map();
    valesArray.forEach((entryPart) => {
      entryPart = entryPart.trim();
      if (entryPart.startsWith(Constants._KEY_IDENTIFIER)) {
        key = entryPart.replace(
          Constants._KEY_IDENTIFIER,
          Constants._EMPTY_STRING
        );
      } else if (entryPart.startsWith(Constants._VALUE_IDENTIFIER)) {
        if (key === null) {
          throw "Key was missing to this value ..." + entryPart;
        }
        stringValue = entryPart.replace(
          Constants._VALUE_IDENTIFIER,
          Constants._EMPTY_STRING
        );
        const value = Number(stringValue);
        if (value === Constants._SEARCHED_VALUE) {
          validEntriesMap.set(key, stringValue);
        } else {
          invalidEntriesMap.set(key, stringValue);
        }
      } else if (entryPart !== "") {
        console.log("Unknown entry found ...", entryPart);
      }
    });
    const resultMap = new Map();
    resultMap.set(Constants._VALID_RESULTS, validEntriesMap);
    resultMap.set(Constants._INVALID_RESULTS, invalidEntriesMap);
    return resultMap;
  };
}
