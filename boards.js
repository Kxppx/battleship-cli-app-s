/**
 *
 * @param {number} size
 * @returns {Array}
 * This function creates an asymmetrical empty board depending on the size(int) given.
 */
function boardGenerator(size) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, size);
  const board = {};
  for (let letter of letters) {
    board[letter] = [];
    for (let i = 0; i < size; i++) {
      board[letter].push({ type: "empty", hit: false });
    }
  }
  return board;
}
/**
 *
 * @param {Array} board
 * @param {number} shipId
 * @param {number} shipSize
 * This function randomly chooses a direction(horizontal/vertical) and IF the location !=="empty"
 * it repeats the function until it finds a spot to place the # of ships wanted
 */
function placeShip(board, shipId, shipSize) {
  const directions = ["horizontal", "vertical"];
  const rows = Object.keys(board);
  const cols = board[rows[0]].length;
  let placed = false;
  while (!placed) {
    const startRowIndex = Math.floor(Math.random() * rows.length);
    const startColIndex = Math.floor(Math.random() * cols);
    const direction = directions[Math.floor(Math.random() * directions.length)];
    let positions = [];
    if (direction === "horizontal" && startColIndex + shipSize <= cols) {
      for (let i = 0; i < shipSize; i++) {
        if (board[rows[startRowIndex]][startColIndex + i].type !== "empty") {
          break;
        }
        positions.push([rows[startRowIndex], startColIndex + i]);
      }
    } else if (
      direction === "vertical" &&
      startRowIndex + shipSize <= rows.length
    ) {
      for (let i = 0; i < shipSize; i++) {
        if (board[rows[startRowIndex + i]][startColIndex].type !== "empty") {
          break;
        }
        positions.push([rows[startRowIndex + i], startColIndex]);
      }
    }
    if (positions.length === shipSize) {
      for (const [row, col] of positions) {
        board[row][col] = {
          type: shipSize === 2 ? "small" : "large",
          id: shipId,
          hit: false,
        };
      }
      placed = true;
    }
  }
}
/**
 *
 * @param {number} size
 * @param {Array} ships
 * @returns {Array}
 * This function is responsible for generating the desired board using boardGenerator() & placing the ships at random
 * using placeShip() and .forEach() with an array of [obj] each representing a ship
 */
function generateRandomBoard(size, ships) {
  const board = boardGenerator(size);
  ships.forEach((ship, index) => {
    placeShip(board, index + 1, ship.size);
  });
  return board;
}
// The bread and butter of generateRandomBoard() using .forEach() and placeShip()
const ships4x4 = [{ size: 2 }, { size: 3 }];
const ships5x5 = [{ size: 2 }, { size: 2 }, { size: 3 }];
const ships6x6 = [{ size: 2 }, { size: 2 }, { size: 3 }, { size: 3 }];

export { generateRandomBoard, ships4x4, ships5x5, ships6x6 };
