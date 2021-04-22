let story =
  'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ["really", "very", "basically"];

let unnecessaryWords = ["extremely", "literally", "actually"];

const storyWords = story
  .split(" ")
  .map((word) => word.replace(",", "").replace(".", ""));
console.log("There are ", storyWords.length, "words in the story.");
const betterWords = storyWords.filter(
  (word) => unnecessaryWords.indexOf(word) === -1
);

console.log("There are ", betterWords.length, "better words in the story.");
console.log("");

const overuseds = overusedWords.map((overused) => {
  let group = storyWords.filter((word) => word === overused);
  console.log(
    "Overused word : " + overused + "\tis occuring " + group.length + " times."
  );
  return group;
});
console.log("");
console.log("overuseds=\n", overuseds);
console.log("");

console.log("");
let nrOfSentences = story.split(".").length + story.split("!").length;
console.log("There are ", nrOfSentences, "sentences in the story.");
console.log("");
