class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }
  get isCheckedOut() {
    return this._isCheckedOut;
  }
  set isCheckedOut(value) {
    this._isCheckedOut = value;
  }
  get ratings() {
    return this._ratings;
  }

  getAverageRating() {
    return this._ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
  toggleCheckOutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }
  addRating(rating) {
    this._ratings.push(rating);
  }
}

class Book extends Media {
  constructor(title, author, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
}

const historyOfEverything = new Book(
  "A Short History of Nearly Everything",
  "Bill Bryson",
  544
);
console.log("historyOfEverything", historyOfEverything.isCheckedOut);
historyOfEverything.toggleCheckOutStatus();
console.log("historyOfEverything", historyOfEverything.isCheckedOut);

console.log("ratings", historyOfEverything.ratings);
historyOfEverything.addRating(4);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
console.log("ratings", historyOfEverything.ratings);
console.log("ratings", historyOfEverything.getAverageRating());

class Movie extends Media {
  constructor(title) {
    super(title);
    this._director = "";
    this._runTime = 0;
  }

  get director() {
    return this._director;
  }
  get runTime() {
    return this._runTime;
  }
}

const speed = new Book("Speed", "Jan de Bont", 116);
console.log("speed", speed.isCheckedOut);
speed.toggleCheckOutStatus();
console.log("speed", speed.isCheckedOut);
console.log("ratings", speed.ratings);
speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
console.log("ratings", speed.ratings);
console.log("ratings", speed.getAverageRating());

class CD extends Media {
  constructor(title) {
    super(title);
    this._artist = "";
    this._songs = [];
  }

  get artist() {
    return this._artist;
  }
  get songs() {
    return this._songs;
  }
}
