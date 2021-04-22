let secretMessage = [
  "Learning",
  "is",
  "not",
  "about",
  "what",
  "you",
  "get",
  "easily",
  "the",
  "first",
  "time,",
  "it",
  "is",
  "about",
  "what",
  "you",
  "can",
  "figure",
  "out.",
  "-2015,",
  "Chris",
  "Pine,",
  "Learn",
  "JavaScript",
];
console.log(secretMessage);
const originalLength = secretMessage.length;
console.log(originalLength);
const removedMessage = secretMessage.pop();
const presentLength = secretMessage.length;
console.log(presentLength);
console.log(presentLength === originalLength - 1);
secretMessage.push("to", "Program");
console.log(secretMessage);
secretMessage[secretMessage.indexOf("easily")] = "right";
secretMessage.shift();
["Programming"].concat(secretMessage);
console.log(secretMessage);
secretMessage.splice(secretMessage.indexOf("get"), 5, "know");
console.log(secretMessage);
secretMessage.join;
