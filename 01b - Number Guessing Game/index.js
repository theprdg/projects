const readlineSync = require('readline-sync');
let name = readlineSync.question("Warrior! What is your name? "); // replace this comment with code to get the user's name
console.log("Welcome Warrior", name + "!");

//initiates the game
let startGame = (name) => {
  let playAgain = true,
      guessCount = 0,
      possibleGuesses = 1,
      relativeScore = 0,
      guessHist = [],
      relativeScoreHist = [];

  while (playAgain) {
    // gets the maximum number for the game from the user and returns it as a Number
    let maxNumber = getMaxFromUser();
    possibleGuesses += maxNumber;
    
    // check if user exits game with zero as input
    if (maxNumber == 0) {
      return console.log("\nWe hope you return", name + "! At ease soldier.\n");
    }
    
    // generate a random integer between 0 and max
    let goal = generateRandomNumber(maxNumber);

    let isCorrect = false;

    // play through the game 
    playAgain = playGame(isCorrect, maxNumber, guessCount, goal, relativeScore, guessHist, relativeScoreHist, possibleGuesses, playAgain)
  }
}

let playGame = (isCorrect, maxNumber, guessCount, goal, relativeScore, guessHist, relativeScoreHist, possibleGuesses, playAgain) => {
  while (!isCorrect) {
    // takes care of prompting the user for a guess and converting it to a number
    let guess = getGuessFromUser(maxNumber);
    guessCount++;

    // check if a guess is correct and return a boolean
    isCorrect = isGuessCorrect(goal, guess);
    if (isCorrect) {
      relativeScore = Math.round((guessCount / possibleGuesses) * 1000) / 10;
      guessHist.unshift(guessCount);
      relativeScoreHist.unshift(relativeScore);
      
      winStatements(name, goal, relativeScoreHist, guessHist);
      
      guessCount = 0;
      possibleGuesses = 1;

      // asks user if they want to play again
      return layAgain = replay();
    } else if (guess > goal) {
      console.log("So close! You're guess is too high!");
    } else {
      console.log("Don't give up! You're guess is too low!");
    }
  }
}

let getMaxFromUser = () => {
  return readlineSync.questionInt("How high of a number do you want to guess? ");
}

let generateRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * (maxNumber + 1));
}

let getGuessFromUser = (max) => {
  console.log("Warrior, guess a number between 0 and", max + "!");
  return max = readlineSync.questionInt();
}

let isGuessCorrect = (goal, guess) => {
  if (goal == guess) return true;
  return false;
}

let replay = () => {
  while (true) {
    let playAgain = (readlineSync.question("Would you like to play again? ")).toLowerCase();
    if (playAgain == 'yes' || playAgain == 'y') {
      return true;
    } else if (playAgain == 'no' || playAgain == 'n') {
      console.log("\nWe are humbled by your presence Warrior, Godspeed!\n");
      return false;
    } 
  }
}

let winStatements = (name, goal, relativeScoreHist, guessHist) => {
  console.log("\nGreat fight Warrior", name + "! The winning number is", goal + "!\n");
  console.log("Previous proportional guess rate (%)", relativeScoreHist);
  console.log("Lowest proportional guess rate (lower is better):", Math.min.apply(null,relativeScoreHist) + "%\n");
  console.log("Previous number of guesses:", guessHist);
  console.log("Lowest number of guesses:", Math.min.apply(null,guessHist),"\n");
}

// code that houses the while loop for our game. call this function once to begin
startGame(name); 