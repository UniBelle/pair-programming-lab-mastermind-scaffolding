// https://jsdoc.app
/**
* @function calculateCorrectPositions
* Calculates the number of correct digits in the correct position.
*
* @param {string} guess - The guess made by the player.
* @param {string} solution - The correct solution to be guessed.
*
* @returns {number} - The number of correct digits in the correct position.
* -----------------------------------------------------------------------------
* @function calculateIncorrectPositions
* Calculates the number of correct digits in the incorrect position.
*
* @param {string} guess - The guess made by the player.
* @param {string} solution - The correct solution to be guessed.
*
* @returns {number} - The number of correct digits in the incorrect position.
*---------------------------------------------------------------------------------
* @function checkGuess
* Checks the guess against the solution and returns a formatted string
* representing correct and incorrect positions.
*
* @param {string} guess - The guess made by the player.
* @param {string} solution - The correct solution to be guessed.
*
* @returns {string} - A string formatted as 'correct-incorrect' where
*                     'correct' is the number of correct positions and
*                     'incorrect' is the number of incorrect positions.
*/


function calculateCorrectPositions(guess, solution) {

  let correctPosition = 0;

  // Iterate through each character in the guess
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {  // Increment correctPosition if the guess digit matches the solution digit at the same position
      correctPosition++;
    }
  }
  return correctPosition;
}

function calculateIncorrectPositions(guess, solution) {
  const guessFrequency = {};
  const solutionFrequency = {};
  let incorrectPosition = 0;

  // Count the frequency of each digit in guess and solution where digits are in incorrect positions
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] !== solution[i]) {
      guessFrequency[guess[i]] = (guessFrequency[guess[i]] || 0) + 1;
      solutionFrequency[solution[i]] = (solutionFrequency[solution[i]] || 0) + 1;
    }
  }

  // Compare frequencies to count how many digits are correct but in the wrong position
  for (const digit in guessFrequency) {
    if (solutionFrequency[digit]) {
      const minCount = Math.min(
        guessFrequency[digit],
        solutionFrequency[digit]
      );
      incorrectPosition += minCount;
    }
  }

  return incorrectPosition;
}

function checkGuess(guess, solution) {
  const correctPosition = calculateCorrectPositions(guess, solution);
  const incorrectPosition = calculateIncorrectPositions(guess, solution);

  return `${correctPosition}-${incorrectPosition}`; // Return the result as a string formatted 'correct-incorrect'
}

function evaluateGuessesAgainstSolution(solution, guesses) {
  // Apply the checkGuess function to each guess and return the results
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
const [solution, guessCount, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = evaluateGuessesAgainstSolution(solution, guesses);
console.log(output.join(" "));
