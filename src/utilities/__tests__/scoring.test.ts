import { describe, it, expect } from "vitest";
import {
  calculateWordScore,
  calculateWordListScore,
  multipleWordLists,
} from "../scoring";
import { MultipleWordLists, MultipleListWordScore } from "../../types";
describe("calculateWordScore", () => {
  it("should return 0 for words less than 3 characters", () => {
    expect(calculateWordScore("")).toBe(0);
    expect(calculateWordScore("a")).toBe(0);
    expect(calculateWordScore("ab")).toBe(0);
  });
  it("should return 1 for words with 3 or 4 characters", () => {
    expect(calculateWordScore("cat")).toBe(1);
    expect(calculateWordScore("dogs")).toBe(1);
  });
  it("should return 2 for words with 5 characters", () => {
    expect(calculateWordScore("happy")).toBe(2);
    expect(calculateWordScore("eagle")).toBe(2);
  });
  it("should return 3 for words with 6 characters", () => {
    expect(calculateWordScore("coding")).toBe(3);
    expect(calculateWordScore("system")).toBe(3);
  });
  it("should return 5 for words with 7 characters", () => {
    expect(calculateWordScore("awesome")).toBe(5);
    expect(calculateWordScore("testing")).toBe(5);
  });
  it("should return 11 for words with 8 or more characters", () => {
    expect(calculateWordScore("excellent")).toBe(11);
    expect(calculateWordScore("extraordinary")).toBe(11);
  });
  it("should handle edge cases and special characters", () => {
    expect(calculateWordScore("a-b")).toBe(1); // 3 chars including hyphen
    expect(calculateWordScore("test!")).toBe(2); // 5 chars including !
  });
});

describe("calculateWordListScore", () => {
  it("should return 0 for an empty list", () => {
    expect(calculateWordListScore([])).toBe(0);
  });

  it("should calculate the sum of individual word scores", () => {
    const wordList = ["a", "test", "sample", "complex", "advanced"];
    // 0 + 1 + 2 + 3 + 5 = 11
    expect(calculateWordListScore(wordList)).toBe(20);
  });

  it("should handle a list with all zeros", () => {
    const wordList = ["a", "b", "c"];
    expect(calculateWordListScore(wordList)).toBe(0);
  });

  it("should handle a list with high-scoring words", () => {
    const wordList = ["extraordinary", "professional", "development"];
    // 11 + 11 + 11 = 33
    expect(calculateWordListScore(wordList)).toBe(33);
  });
});

describe("multipleWordLists", () => {
  it("should return an empty array for empty input", () => {
    expect(multipleWordLists([])).toEqual([]);
  });

  it("should calculate scores for multiple word lists", () => {
    const multipleLists: MultipleWordLists[] = [
      {
        name: "Short Words",
        list: ["a", "to", "the", "test"],
      },
      {
        name: "Medium Words",
        list: ["happy", "coding", "system"],
      },
      {
        name: "Long Words",
        list: ["excellent", "development", "programming"],
      },
    ];

    const expectedResult: MultipleListWordScore[] = [
      { name: "Short Words", score: 2 }, // 0 + 0 + 0 + 1 = 1
      { name: "Medium Words", score: 8 }, // 2 + 3 + 2 = 7
      { name: "Long Words", score: 33 }, // 11 + 11 + 11 = 33
    ];

    expect(multipleWordLists(multipleLists)).toEqual(expectedResult);
  });

  it("should handle a list with mixed word lengths", () => {
    const multipleLists: MultipleWordLists[] = [
      {
        name: "Mixed Words",
        list: ["a", "test", "happy", "coding", "awesome", "extraordinary"],
      },
    ];

    const expectedResult: MultipleListWordScore[] = [
      { name: "Mixed Words", score: 22 }, // 0 + 1 + 2 + 3 + 5 + 11 = 22
    ];

    expect(multipleWordLists(multipleLists)).toEqual(expectedResult);
  });

  it("should handle empty lists within the input", () => {
    const multipleLists: MultipleWordLists[] = [
      {
        name: "Empty List",
        list: [],
      },
      {
        name: "Valid List",
        list: ["test", "happy"],
      },
    ];

    const expectedResult: MultipleListWordScore[] = [
      { name: "Empty List", score: 0 },
      { name: "Valid List", score: 3 }, // 1 + 2 = 3
    ];

    expect(multipleWordLists(multipleLists)).toEqual(expectedResult);
  });
});

describe("integration tests", () => {
  it("should process multiple word lists end-to-end", () => {
    const input: MultipleWordLists[] = [
      {
        name: "Animals",
        list: ["dog", "cat", "elephant", "tiger", "rhinoceros"],
      },
      {
        name: "Countries",
        list: ["usa", "uk", "france", "germany", "australia"],
      },
    ];

    const result = multipleWordLists(input);

    // Manual calculation for verification:
    // Animals: 'dog' (1) + 'cat' (1) + 'elephant' (11) + 'tiger' (2) + 'rhinoceros' (11) = 26
    // Countries: 'usa' (1) + 'uk' (0) + 'france' (3) + 'germany' (5) + 'australia' (11) = 20

    expect(result).toEqual([
      { name: "Animals", score: 26 },
      { name: "Countries", score: 20 },
    ]);
  });
});
