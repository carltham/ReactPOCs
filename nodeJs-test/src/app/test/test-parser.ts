import { TestConstants } from "./test-constants";

export class TestParser {
  parseJsonString = (jsonString) => {
    const valuesString = jsonString
      .replace(TestConstants._HEADER_IDENTIFIER, TestConstants._EMPTY_STRING)
      .replace(TestConstants._TAIL_IDENTIFIER, TestConstants._EMPTY_STRING);
    const valesArray = valuesString.split(",");
    let key;
    let stringValue;
    const validEntriesMap = new Map();
    const invalidEntriesMap = new Map();
    valesArray.forEach((entryPart) => {
      entryPart = entryPart.trim();
      if (entryPart.startsWith(TestConstants._KEY_IDENTIFIER)) {
        key = entryPart.replace(
          TestConstants._KEY_IDENTIFIER,
          TestConstants._EMPTY_STRING
        );
      } else if (entryPart.startsWith(TestConstants._VALUE_IDENTIFIER)) {
        if (key === null) {
          throw "Key was missing to this value ..." + entryPart;
        }
        stringValue = entryPart.replace(
          TestConstants._VALUE_IDENTIFIER,
          TestConstants._EMPTY_STRING
        );
        const value = Number(stringValue);
        if (value === TestConstants._SEARCHED_VALUE) {
          validEntriesMap.set(key, stringValue);
        } else {
          invalidEntriesMap.set(key, stringValue);
        }
      } else if (entryPart !== "") {
        console.log("Unknown entry found ...", entryPart);
      }
    });
    const resultMap = new Map();
    resultMap.set(TestConstants._VALID_RESULTS, validEntriesMap);
    resultMap.set(TestConstants._INVALID_RESULTS, invalidEntriesMap);
    return resultMap;
  };
}
