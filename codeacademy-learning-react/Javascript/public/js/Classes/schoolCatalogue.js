class School {
  constructor(name, numberOfStudents, level) {
    this._name = name;
    this._level = level;
    this._numberOfStudents = numberOfStudents;
  }

  get name() {
    return this._name;
  }
  get level() {
    return this._level;
  }
  get numberOfStudents() {
    return this._numberOfStudents;
  }
  set numberOfStudents(newNumberOfStudents) {
    if (newNumberOfStudents instanceof number) {
      this._numberOfStudents = newNumberOfStudents;
    } else {
      console.log("Invalid input: numberOfStudents must be set to a Number.");
    }
  }

  quickFacts() {
    const facts = `${this.name} educates ${this.numberOfStudents} students at the ${this.level} school level.`;
    return facts;
  }

  static pickSubstituteTeacher(substituteTeachers) {
    const selectedTeacher = Math.floor(
      Math.random() * substituteTeachers.length
    );
    return substituteTeachers[selectedTeacher];
  }
}

class Primary extends School {
  constructor(name, numberOfStudents, pickupPolicy) {
    super(name, numberOfStudents, "primary");
    this._pickupPolicy = pickupPolicy;
  }

  get pickupPolicy() {
    return this._pickupPolicy;
  }
}

class Middle extends School {
  constructor(name, numberOfStudents) {
    super(name, numberOfStudents, "middle");
  }
}

class High extends School {
  constructor(name, numberOfStudents, sportsTeams) {
    super(name, numberOfStudents, "high");
    this._sportsTeams = sportsTeams ? sportsTeams : [];
  }

  get sportsTeams() {
    return this._sportsTeams;
  }
}

const lorraineHansbury = new Primary(
  "Lorraine Hansbury",
  514,
  "Students must be picked up by a parent, guardian, or a family member over the age of 13."
);
console.log(lorraineHansbury.quickFacts());
const substituteTeacher = Primary.pickSubstituteTeacher([
  "Jamal Crawford",
  "Lou Williams",
  "J. R. Smith",
  "James Harden",
  "Jason Terry",
  "Manu Ginobli",
]);
console.log(substituteTeacher);

const alSmith = new High("Al E. Smith", 415, [
  "Baseball",
  "Basketball",
  "Volleyball",
  "Track and Field",
]);

console.log(alSmith.sportsTeams);
