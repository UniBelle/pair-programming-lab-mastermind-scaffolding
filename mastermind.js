/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - an string representing the number of corect numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532, '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  // TODO: complete this function
  // first determine how many characters total the two strings have in common
  // This may help:
  // https://github.com/bonnie/udemy-ENZYME/blob/master/context-base/src/helpers/index.js
  //
  // then determine how many of those characters are in the right place
  // hint: iterate through characters of guess and compare to character
  // in the same position in solution
  //
  // finally, return a string in the format
  // "count of correct characters in the right place"-"count of correct
  // characters not in the right place"
  // for example, "2-1"

  // Initiliaze variable to track correct position
  let correctPosition = 0;
  // Initialiaze variable to keep track of incorrectPosition
  let incorrectPosition = 0;

  // objects to track occurances of each digit
  const guessFrequency = {};
  const solutionFrequency = {};

  // We are going to loop through the array and compare values to see if the placement is correct or not
  for (let i = 0; i < guess.length; i++) {
    // condition to see if the number a guess index i is equal to the solution at index i
    if (guess[i] === solution[i]) {
      // if the guess at index i is equal to the solution at index i, we increment the correctPosition
      correctPosition++;
    } else {
      // We keep track of the number of times the solution appears
      guessFrequency[solution[i]] = (solutionFrequency[solution[i]] || 0) + 1;
      solutionFrequency[guess[i]] = (guessFrequency[guess[i]] || 0) + 1;
    }
  }

  // loop to count the correct numbers in incorrect positions
  for (const digit in guessFrequency) {
    if (solutionFrequency[digit]) {
      // the number of times this digit appears in both, but not in the correct position
      incorrectPosition += Math.min(
        guessFrequency[digit],
        solutionFrequency[digit],
      );
    }
  }

  return `${correctPosition}-${incorrectPosition}`;
}

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */
function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
//
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
const output = processInput(solution, guesses);
console.log(output.join(" "));
