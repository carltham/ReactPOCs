import fs from "fs";
import crypto, { Hash } from "crypto";

export class FileHandler {
  fileName: string;
  algorithm: string = "sha1";
  shasum: Hash;

  constructor(fileName: string) {
    this.shasum = crypto.createHash(this.algorithm);
    // console.log("this.shasum = ", this.shasum);
    this.fileName = fileName;
  }

  calculateHash = async (filename: string) => {
    const hash: string = await this.calculateHashImpl(filename, this.shasum);
    return hash;
  };

  calculateHashImpl = (filename: string, shasum) => {
    let promise = new Promise<string>(function (resolve, reject) {
      const file = fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
          reject(err);
          console.log("err = ", err);
        }
      });

      const fileStream = fs.createReadStream(filename);
      fileStream.on("data", (data) => {
        shasum.update(data);
      });

      // making digest
      fileStream.on("end", () => {
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
      this.createFile(fileName);
    }
    return true;
  };

  writeArray = (fileName: string, data: any) => {
    this.deleteFile(fileName);
    console.log("data = ", data);
    data.forEach((value) => {
      fs.appendFileSync(fileName, value + "\n");
    });
    return true;
  };

  writeJson = (fileName: string, obj: object) => {
    const jsonString = JSON.stringify(obj, null, 2);

    fs.writeFileSync(fileName, jsonString);
    return true;
  };

  writeString = (fileName: string, jsonString: string) => {
    console.log("writeString::jsonString =  ", jsonString);

    fs.writeFileSync(fileName, jsonString);
    return true;
  };

  createFile = (fileName: string) => {
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
    fs.writeFileSync(fileName, "");
  };
  deleteFile = (fileName: string) => {
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
    }
  };
}
