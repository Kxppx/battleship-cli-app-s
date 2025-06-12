import {
  printBoard,
  printBoardFully,
  checkShipsDestroyed,
  guessedAllWrong,
  replay,
  checkGuessNumber,
  clearScreen,
} from "./functions.js";
import { generateRandomBoard, ships4x4, ships5x5, ships6x6 } from "./boards.js";
import readlineSync from "readline-sync";

// Fun side mission
export let guessNumber = 0;
/**
 * This function is the main menu of the game and the only way to play the game
 */
export function greetUser() {
  console.log("⭐ Welcome To BattleShip⭐");
  console.log("Mission: Find all the ships or DIE");
  console.log("Small ship - 🟠🟠 | Large ship - 🔵🔵🔵");
  const boardChoice = readlineSync.keyInSelect(
    [
      "4x4 -CONTAINS- 1🟠 1🔵",
      "5x5 -CONTAINS- 2🟠 1🔵",
      "6x6 -CONTAINS- 2🟠 2🔵",
    ],
    "Please choose your board 😊"
  );
  switch (boardChoice) {
    case 0:
      clearScreen();
      const board4x4 = generateRandomBoard(4, ships4x4);
      printBoard(board4x4);
      makeMove(board4x4);
      break;
    case 1:
      clearScreen();
      const board5x5 = generateRandomBoard(5, ships5x5);
      printBoard(board5x5);
      makeMove(board5x5);
      break;
    case 2:
      clearScreen();
      const board6x6 = generateRandomBoard(6, ships6x6);
      printBoard(board6x6);
      makeMove(board6x6);
      break;
    default:
      clearScreen();
      const lastChance = readlineSync.keyInSelect(
        ["I'm sure", "Nvm, Let's Play!"],
        "Are you sure you don't want to play this AWESOME game?🥺"
      );
      if (lastChance === 1) greetUser();
      else console.log("goodbye..😭💔");
      break;
  }
}
/**
 *
 * @param {Array} board
 * This function is in charge of the flow of the game and bridges the other functions to make them all work together in unison
 */
function makeMove(board) {
  const answer = readlineSync.question(
    "Select the row(letter) followed by the column(number)😎 "
  );
  if (!answer || answer.length < 2) {
    console.log(`Sorry but that is not a valid input`);
    return makeMove(board);
  }
  const row = answer[0].toUpperCase();
  const column = Number(answer[1]);
  if (
    answer.length === 2 &&
    board[row] &&
    !isNaN(column) &&
    column >= 0 &&
    column < board[row].length
  ) {
    if (board[row][column].hit === true) {
      console.log("You already guessed this, try a different spot");
      makeMove(board);
    }
    board[row][column].hit = true;
    guessNumber++;
    clearScreen();
    if (board[row][column].type === "empty") {
      console.log("\nGood try, you'll get it next time!");
      console.log(`Guesses: ${guessNumber}`);
    } else {
      console.log("\nNice hit!🔥");
      console.log(`Guesses: ${guessNumber}`);
    }
    printBoard(board);
    if (checkShipsDestroyed(board) === true) {
      clearScreen();
      console.log("\nYou have won! Total Guesses: ", guessNumber);
      checkGuessNumber(board);
      printBoardFully(board);
      guessNumber = 0;
      return replay();
    } else if (guessedAllWrong(board) === true) {
      console.log("\nYou missed all the ships!😭");
      console.log("Total Guesses: ", guessNumber);
      printBoardFully(board);
      guessNumber = 0;
      return replay();
    } else makeMove(board);
  } else {
    console.log(`Sorry but that is not a valid input`);
    return makeMove(board);
  }
}
greetUser();
