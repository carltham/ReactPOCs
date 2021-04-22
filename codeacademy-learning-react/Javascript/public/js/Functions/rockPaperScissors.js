const getUserChoice = function (userInput) {
  userInput = userInput.toLowerCase();
  if (
    userInput === "rock" ||
    userInput === "paper" ||
    userInput === "scissors"
  ) {
    return userInput;
  } else {
    console.log("error message");
  }
};

const getComputerChoice = function () {
  const choiseNr = Math.floor(Math.random() * 3);
  //   console.log(choiseNr);
  let choise;
  switch (choiseNr) {
    case 0:
      choise = "rock";
      break;
    case 1:
      choise = "paper";
      break;
    default:
      choise = "scissors";
  }
  return choise;
};

const determineWinner = function (userChoice, computerChoice) {
  let winner;
  if (userChoice === "bomb") {
    winner = "User";
  } else if (userChoice === computerChoice) {
    return `${userChoice}-${computerChoice}:The game was a tie!`;
  } else if (userChoice === "rock") {
    if (computerChoice === "paper") {
      winner = "Computer";
    } else {
      winner = "User";
    }
  } else if (userChoice === "paper") {
    if (computerChoice === "scissors") {
      winner = "Computer";
    } else {
      winner = "User";
    }
  } else {
    if (computerChoice === "rock") {
      winner = "Computer";
    } else {
      winner = "User";
    }
  }
  return `${userChoice}-${computerChoice}:Winner is - ${winner}!`;
};

const playGame = function (userChoice) {
  // 'rock', 'paper', or 'scissors'
  let computerChoice = getComputerChoice();
  console.log(determineWinner(userChoice, computerChoice));
};

console.log(getUserChoice("RoCK"));
console.log(getUserChoice("error message"));

console.log("\n");
console.log(getComputerChoice());
console.log(getComputerChoice());
console.log(getComputerChoice());

console.log("\n");
console.log(determineWinner("rock", "paper"));
console.log(determineWinner("paper", "scissors"));
console.log(determineWinner("scissors", "rock"));
console.log(determineWinner("rock", "scissors"));
console.log(determineWinner("paper", "rock"));
console.log(determineWinner("scissors", "paper"));
console.log(determineWinner("paper", "paper"));

console.log("\n");
// 'rock', 'paper', or 'scissors'
playGame("rock");
playGame("paper");
playGame("scissors");
playGame("bomb");
