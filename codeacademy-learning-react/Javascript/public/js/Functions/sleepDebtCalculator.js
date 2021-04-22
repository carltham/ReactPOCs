const getSleepHours = (day) => {
  let numbeOfHoursSlept = 8;
  day = day.toLowerCase();

  switch (day) {
    case "monday":
      numbeOfHoursSlept = 8;
      break;
    case "tuesday":
      numbeOfHoursSlept = 5;
      break;
    case "wednesday":
      numbeOfHoursSlept = 7;
      break;
    case "thursday":
      numbeOfHoursSlept = 8;
      break;
    case "friday":
      numbeOfHoursSlept = 9;
      break;
    case "saturday":
      numbeOfHoursSlept = 10;
      break;
    case "sunday":
      numbeOfHoursSlept = 10;
      break;
    default:
      -1;
  }
  return numbeOfHoursSlept;
};

const getIdealSleepHours = (idealHours = 8) => {
  return Math.round(idealHours * 7);
};
const getActualSleepHours = () => {
  let actualSleepHours = 0;
  actualSleepHours += getSleepHours("monday");
  actualSleepHours += getSleepHours("tuesday");
  actualSleepHours += getSleepHours("wednesday");
  actualSleepHours += getSleepHours("thursday");
  actualSleepHours += getSleepHours("friday");
  actualSleepHours += getSleepHours("saturday");
  actualSleepHours += getSleepHours("sunday");
  return actualSleepHours;
};
const calculateSleepDebt = (idealHours) => {
  let actualSleepHours = getActualSleepHours();
  let idealSleepHours = getIdealSleepHours(idealHours);
  let diff = Math.abs(idealSleepHours - actualSleepHours);
  if (actualSleepHours === idealSleepHours) {
    console.log("You got the perfect amount of sleep.");
  } else if (actualSleepHours > idealSleepHours) {
    console.log(`You  got more sleep than needed - with ${diff} hours.`);
  } else {
    console.log(`You should get some rest - with ${diff} hours.`);
  }
};

console.log(getSleepHours("monday"));
console.log(getSleepHours("thursday"));
console.log(getSleepHours("saturday"));
console.log("\n");
console.log(getIdealSleepHours());
console.log(getIdealSleepHours(5));
console.log(getIdealSleepHours(9));
console.log(getActualSleepHours());
console.log("\n");
calculateSleepDebt();
calculateSleepDebt(5);
calculateSleepDebt(9);
