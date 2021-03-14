let raceNumber = Math.floor(Math.random() * 1000);
let earlyRegistrant = false;
let runnersAge = 18;
if (runnersAge > 18 && earlyRegistrant) {
  raceNumber += 1000;
}
if (runnersAge > 18 && earlyRegistrant) {
  console.log(`Hi there runner nr ${raceNumber}, you will race at 9:30 am.`);
} else if (runnersAge > 18 && !earlyRegistrant) {
  console.log(`Hi there runner nr ${raceNumber}. Late adults run at 11: 00 am`);
} else if (runnersAge < 18) {
  console.log(
    `Hi there runner nr ${raceNumber}. Youth registrants run at 12:30 pm (regardless of registration)`
  );
} else {
  console.log(
    `Hi there runner nr ${raceNumber}. Please see the registration desk!`
  );
}
