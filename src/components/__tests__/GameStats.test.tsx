import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameStats from "../../components/GameStats";

describe("GameStats", () => {
  it("renders total score", () => {
    render(
      <GameStats
        players={[{ name: "Player 1", score: 42, foundedWords: [] }]}
      />
    );
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/total score/i)).toBeInTheDocument();
  });

  it("renders number of words found", () => {
    render(
      <GameStats
        players={[
          {
            name: "Player 1",
            score: 10,
            foundedWords: ["apple", "banana", "cat"],
          },
        ]}
      />
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(/words found/i)).toBeInTheDocument();
  });

  it("displays the longest word", () => {
    render(
      <GameStats
        players={[
          {
            name: "Player 1",
            score: 0,
            foundedWords: ["hi", "elephant", "tree"],
          },
        ]}
      />
    );
    expect(screen.getByText(/longest word/i)).toBeInTheDocument();
    expect(screen.getByText("elephant")).toBeInTheDocument();
  });

  it("handles empty words array correctly", () => {
    render(
      <GameStats players={[{ name: "Player 1", score: 0, foundedWords: [] }]} />
    );
    expect(screen.getByText(/longest word/i)).toBeInTheDocument();
  });
});
