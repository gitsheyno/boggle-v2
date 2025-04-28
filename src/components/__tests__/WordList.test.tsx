import { render, screen } from "@testing-library/react";
import WordList from "../WordList";
import { it, expect, describe, vi } from "vitest";

// Mock the translation function
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations = {
        playerScore: "Score:",
        word: "Word",
        point: "Points",
        Nowordsfoundyet: "No words found yet",
      };
      return translations[key as keyof typeof translations] || key;
    },
  }),
}));

// Mock the calculateWordScore function
vi.mock("../utilities/scoring", () => ({
  calculateWordScore: (word: string) => {
    // Simple scoring logic for testing purposes
    if (word === "elephant") return 11;
    if (word === "bottles" || word === "grapes") return 3;
    if (word === "apple") return 2;
    if (word === "tree" || word === "dog") return 1;
    return 0; // For "hi" and other short words
  },
}));

describe("WordList", () => {
  it("displays total score and word count correctly", () => {
    render(
      <WordList
        players={[
          { name: "Player 1", score: 4, foundedWords: ["hello", "apple"] },
        ]}
      />
    );
    expect(screen.getByText("Score: 4 pts")).toBeInTheDocument();
    expect(screen.getByText("Total Words: 2")).toBeInTheDocument();
    expect(screen.getByText("Avg Points: 2.0 per word")).toBeInTheDocument();
  });

  it("shows correct score for each word", () => {
    render(
      <WordList
        players={[
          {
            name: "Player 1",
            score: 15,
            foundedWords: ["hi", "tree", "bottle", "elephant"],
          },
        ]}
      />
    );
    expect(screen.getByText("tree")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument(); // tree = 1 point
    expect(screen.getAllByText("+0")[0]).toBeInTheDocument(); // hi = 0 points
    expect(screen.getByText("+11")).toBeInTheDocument(); // elephant = 11
  });

  it("displays badge for 7-letter and 8+ letter words", () => {
    render(
      <WordList
        players={[
          {
            name: "Player 1",
            score: 13,
            foundedWords: ["bottles", "elephant", "cat"],
          },
        ]}
      />
    );
    expect(screen.getByText("bottles")).toBeInTheDocument();
    expect(screen.getByText("Good!")).toBeInTheDocument();
    expect(screen.getByText("elephant")).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();
  });

  it("renders empty state when no words are found", () => {
    render(
      <WordList players={[{ name: "Player 1", score: 0, foundedWords: [] }]} />
    );
    expect(screen.getByText("No words found yet...")).toBeInTheDocument();
  });
});
