const team = {
  _players: [
    {
      firstName: "Pablo",
      lastName: "Sanchez",
      age: 11,
    },
    {
      firstName: "Sanchez",
      lastName: "Pablo",
      age: 11,
    },
    {
      firstName: "Lukaz",
      lastName: "Remires",
      age: 11,
    },
    {
      firstName: "Remires",
      lastName: "Lukaz",
      age: 11,
    },
  ],
  _games: [
    {
      opponent: "Broncos",
      teamPoints: 42,
      opponentPoints: 27,
    },
    {
      opponent: "Chelsea",
      teamPoints: 33,
      opponentPoints: 13,
    },
    {
      opponent: "Lazios",
      teamPoints: 46,
      opponentPoints: 45,
    },
    {
      opponent: "Ashojden",
      teamPoints: 1,
      opponentPoints: 54,
    },
  ],
  get players() {
    return this._players;
  },
  set players(dish) {
    _players.push(dish);
  },
  get games() {
    return this._games;
  },
  set games(dish) {
    _games.push(dish);
  },
  addPlayer(firstName, lastName, age) {
    const player = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    this._players.push(player);
  },
  addGame(opponent, teamPoints, opponentPoints) {
    const game = {
      opponent: opponent,
      teamPoints: teamPoints,
      opponentPoints: opponentPoints,
    };
    this._games.push(game);
  },
};

team.addPlayer("Steph", "Curry", 28);
team.addPlayer("Lisa", "Leslie", 44);
team.addPlayer("Bugs", "Bunny", 76);
console.log("games:\n", team._games);
console.log("");

team.addGame("Milan", 21, 28);
team.addGame("FK Munich", 21, 20);
team.addGame("Liverpool", 21, 19);
console.log("games:\n", team._games);
console.log("");
