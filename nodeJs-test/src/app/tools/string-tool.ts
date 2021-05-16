export class StringTool {
  static upperStarting = (str) => {
    let resultStringArray = [];
    for (let index = 0; index < str.length; index++) {
      let character: string = str[index];
      if (index === 0) {
        character = character.toUpperCase();
      }
      resultStringArray.push(character);
    }
    return resultStringArray.join("");
  };
}
