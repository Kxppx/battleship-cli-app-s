import { greetUser, guessNumber } from "./battleship.js";
import readlineSync from "readline-sync";

/**
 * 
 * @param {Array} board
 * @returns {string}
  This Function prints the board with its cells all hidden, or revealed depending wether cell.hit === true/false
 */
function printBoard(board) {
  const result = {};
  for (const [rowLabel, row] of Object.entries(board)) {
    result[rowLabel] = row.map((cell) => {
      if (cell.hit && cell.type === "large") return "🔵";
      if (cell.hit && cell.type === "small") return "🟠";
      if (cell.hit && cell.type === "empty") return "❗";
      return "-";
    });
  }
  console.table(result);
}
/**
 * 
 * @param {Array} board 
 * @returns {string} 
 This function is meant to reveal all cells, and its only used when the game is finished(won/lost)
 */
function printBoardFully(board) {
  const result = {};
  for (const [rowLabel, row] of Object.entries(board)) {
    result[rowLabel] = row.map((cell) => {
      if (cell.hit === false) cell.hit = true;
      if (cell.hit && cell.type === "large") return "🔵";
      if (cell.hit && cell.type === "small") return "🟠";
      if (cell.hit && cell.type === "empty") return "❗";
      return "-";
    });
  }
  console.table(result);
}
/**
 *
 * @param {Array} board
 * @returns {boolean}
 This function keeps track of the amount of ships still in play, and is used as a flag to know when the user has won the game
 */
function checkShipsDestroyed(board) {
  const shipStatus = {};
  for (const row of Object.values(board)) {
    for (const cell of row) {
      if (cell.type !== "empty") {
        if (!shipStatus[cell.id]) {
          shipStatus[cell.id] = { total: 0, hit: 0, destroyed: false };
        }
        shipStatus[cell.id].total++;
        if (cell.hit === true) {
          shipStatus[cell.id].hit++;
        }
      }
    }
  }
  let shipsRemaining = 0;
  for (const shipId in shipStatus) {
    const ship = shipStatus[shipId];
    if (ship.hit === ship.total) {
      ship.destroyed = true;
    } else {
      shipsRemaining++;
    }
  }
  console.log(`Ships remaining: ${shipsRemaining}`);
  return shipsRemaining === 0;
}
/**
 *
 * @param {Array} board
 * @returns {boolean}
 * This function is used as a flag to know when the user has lost
 */
function guessedAllWrong(board) {
  for (const row of Object.values(board)) {
    for (const cell of row) {
      if (cell.type === "empty" && !cell.hit) {
        return false;
      }
    }
  }
  return true;
}
/**
 *
 * @returns {function}
 * This function is used as an infinite loop, so the user can play to their hearts content
 */
function replay() {
  const replay = readlineSync.keyInYN("Would you like to play again?");
  if (replay === true) {
    clearScreen();
    greetUser();
  } else {
    console.log("goodbye..😭💔");
    return;
  }
}
/**
 *
 * @param {Array} board
 * This function makes the game a bit more thrilling, giving the user a reason to keep playing
 */
function checkGuessNumber(board) {
  if (Object.keys(board).length === 4) {
    if (guessNumber === 5) {
      console.log("Literal Perfection. You did not miss a single time!");
    } else if (guessNumber <= 8) {
      console.log("Nice!!! Try to not miss a single time, next time😎");
    } else {
      console.log("Not bad.. but you can do better!");
    }
  } else if (Object.keys(board).length === 5) {
    if (guessNumber === 7) {
      console.log("Literal Perfection. You are really good at this huh..");
    } else if (guessNumber <= 10) {
      console.log("Nice!!! Try to not miss a single time, next time😎");
    } else {
      console.log("Not bad.. but you can do better!");
    }
  } else if (Object.keys(board).length === 6) {
    if (guessNumber === 10) {
      console.log("Stop cheating, cheater.");
    } else if (guessNumber <= 13) {
      console.log("Nice!!! Try to not miss a single time, next time😎");
    } else {
      console.log("Not bad.. but you can do better!");
    }
  }
}
/**
 * This function works in replacement of "console.clear()", since after multiple uses it seems to cause a lot of bugs in the terminal
 */
function clearScreen() {
  console.log("\n".repeat(50));
}

export {
  printBoard,
  printBoardFully,
  checkShipsDestroyed,
  guessedAllWrong,
  replay,
  checkGuessNumber,
  clearScreen,
};
