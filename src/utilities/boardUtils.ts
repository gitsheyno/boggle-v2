import { DICE, SPECIAL_LETTERS, GAME_SETTINGS } from "../constans/gameConstans";

/**
 * Generates a random Boggle board using the official dice distribution
 * @returns A 2D array representing the Boggle board
 */
export function generateBoard(): string[][] {
  const shuffledDice = [...DICE].sort(() => Math.random() - 0.5);

  const board: string[][] = [];
  for (let i = 0; i < GAME_SETTINGS.BOARD_SIZE; i++) {
    const row: string[] = [];
    for (let j = 0; j < GAME_SETTINGS.BOARD_SIZE; j++) {
      const dieIndex = i * GAME_SETTINGS.BOARD_SIZE + j;
      const die = shuffledDice[dieIndex];
      // Randomly select one face of the die (0-5)
      const faceIndex = Math.floor(Math.random() * 6);
      const letter = die.charAt(faceIndex);

      // Handle special case for 'Q' which is always followed by 'u' in Boggle
      row.push(SPECIAL_LETTERS[letter] || letter);
    }
    board.push(row);
  }

  return board;
}

/**
 * Checks if two positions are adjacent on the board
 */
export function areAdjacent(
  pos1: [number, number],
  pos2: [number, number]
): boolean {
  const [row1, col1] = pos1;
  const [row2, col2] = pos2;

  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);

  // Adjacent if both row and column differences are at most 1
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
}

/**
 * Checks if a path forms a valid word according to Boggle rules
 * @param path Array of positions representing the path
 * @returns true if the path is valid, false otherwise
 */
export function isValidPath(path: [number, number][]): boolean {
  if (path.length < 1) return false;

  // Check if all adjacent positions are actually adjacent
  for (let i = 1; i < path.length; i++) {
    if (!areAdjacent(path[i - 1], path[i])) {
      return false;
    }
  }

  // Check for duplicate positions
  const positionSet = new Set<string>();

  for (const [row, col] of path) {
    const posKey = `${row},${col}`;
    if (positionSet.has(posKey)) {
      return false;
    }
    positionSet.add(posKey);
  }

  return true;
}

/**
 * Forms a word from a path on the board
 * @param board The Boggle board
 * @param path Array of positions
 * @returns The word formed by the path
 */
export function getWordFromPath(
  board: string[][],
  path: [number, number][]
): string {
  return path.map(([row, col]) => board[row][col]).join("");
}
