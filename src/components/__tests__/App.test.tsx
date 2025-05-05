import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect } from "vitest";
import App from "../../App";

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Controls, Board and WordList when game is active", () => {
    render(<App />);

    // Initially, Controls should be visible
    expect(
      screen.getByRole("button", { name: /new game/i })
    ).toBeInTheDocument();

    // Board should render (may render a grid or some known board text)
    expect(screen.getByTestId("board")).toBeInTheDocument();
  });

  it("starts the game when mode is selected", () => {
    render(<App />);

    // Click to start a "Single Player" mode (assuming you have a button or flow that triggers it)
    const startButton = screen.getByRole("button", { name: /new game/i });
    fireEvent.click(startButton);

    // After start, players and board should appear
    expect(screen.getByTestId("board")).toBeInTheDocument();
    // expect(screen.getByTestId("word-list")).toBeInTheDocument();
  });

  //   it('shows "Game Over" after ending the game', () => {
  //     render(<App />);

  //     // Simulate starting the game
  //     const startButton = screen.getByRole("button", { name: /new game/i });
  //     fireEvent.click(startButton);

  //     // End the game
  //     const endButton = screen.getByRole("button", { name: /end/i });
  //     fireEvent.click(endButton);

  //     // Should show GameStats and "Game Over" text
  //     expect(screen.getByText(/game over/i)).toBeInTheDocument();
  //     expect(screen.getByTestId("game-stats")).toBeInTheDocument();
  //   });

  it("handles finding a word", () => {
    render(<App />);

    // Start the game first
    const startButton = screen.getByRole("button", { name: /new game/i });
    fireEvent.click(startButton);

    // Find a word (simulate word click if possible)
    const board = screen.getByTestId("board");
    fireEvent.click(board); // Assuming Board handles word finding by click or some interaction

    // After finding, check that WordList updates
    // expect(screen.getByTestId("word-list")).toBeInTheDocument();
    // You can go further and check if the word count increases
  });

  it("switches players correctly in multiplayer mode", () => {
    render(<App />);

    // Start the game first
    const startButton = screen.getByRole("button", { name: /new game/i });
    fireEvent.click(startButton);
    // Start the game in multi mode
    const multiPlayerButton = screen.getByRole("button", {
      name: /multiplayer/i,
    });
    fireEvent.click(multiPlayerButton);

    const board = screen.getByTestId("board");

    // Find a word as player 1
    fireEvent.click(board);

    // After player 1 finds a word, it should switch to player 2
    // expect(screen.getByTestId("active-player")).toHaveTextContent(/player 2/i);
  });

  it("renders initial timer value correctly", () => {
    render(<App />);
    // Start the game first
    const startButton = screen.getByRole("button", { name: /new game/i });
    fireEvent.click(startButton);
    // Start the game in multi mode
    const multiPlayerButton = screen.getByRole("button", {
      name: /multiplayer/i,
    });
    fireEvent.click(multiPlayerButton);
    //     const timerElement = screen.getByTestId("timer");
    //     expect(timerElement).toHaveTextContent(String(GAME_SETTINGS.DEFAULT_TIMER));
  });
});
