import { describe, it, expect } from "vitest";
import {
  generateBoard,
  areAdjacent,
  isValidPath,
  getWordFromPath,
} from "../../utilities/boardUtils";
import { DICE } from "../../constans/gameConstans";

describe("generateBoard", () => {
  it("should generate a 4x4 board", () => {
    const board = generateBoard();
    expect(board.length).toBe(4);
    expect(board[0].length).toBe(4);
  });

  it("should only contain valid letters from the dice", () => {
    const board = generateBoard();
    const allLetters = board.flat();
    const allPossibleLetters = DICE.join("");

    allLetters.forEach((letter) => {
      const letterToCheck = letter === "Qu" ? "Q" : letter;
      expect(allPossibleLetters.includes(letterToCheck)).toBe(true);
    });
  });
});

describe("areAdjacent", () => {
  it("should return true for adjacent positions", () => {
    expect(areAdjacent([0, 0], [0, 1])).toBe(true); // Right
    expect(areAdjacent([1, 1], [2, 2])).toBe(true); // Diagonal
  });

  it("should return false for non-adjacent positions", () => {
    expect(areAdjacent([0, 0], [2, 0])).toBe(false); // Two rows apart
    expect(areAdjacent([1, 1], [1, 1])).toBe(false); // Same position
  });
});

describe("isValidPath", () => {
  it("should validate a proper connected path", () => {
    const path: [number, number][] = [
      [0, 0],
      [0, 1],
      [1, 2],
    ];
    expect(isValidPath(path)).toBe(true);
  });

  it("should reject a path with disconnected positions", () => {
    const path: [number, number][] = [
      [0, 0],
      [2, 2],
    ]; // Not adjacent
    expect(isValidPath(path)).toBe(false);
  });
});

describe("getWordFromPath", () => {
  it("should form a word from a valid path", () => {
    const board = [
      ["A", "B", "C", "D"],
      ["E", "F", "G", "H"],
      ["I", "J", "K", "L"],
      ["M", "N", "O", "P"],
    ];
    const path: [number, number][] = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    expect(getWordFromPath(board, path)).toBe("AFK");
  });

  it('should handle special characters like "Qu"', () => {
    const board = [
      ["Qu", "B", "C", "D"],
      ["E", "F", "G", "H"],
      ["I", "J", "K", "L"],
      ["M", "N", "O", "P"],
    ];
    const path: [number, number][] = [
      [0, 0],
      [1, 1],
    ];
    expect(getWordFromPath(board, path)).toBe("QuF");
  });
});
