import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "../../components/Controls";
import { GameConfigTypes } from "../../types";

vi.mock("../../components/GameConfig", () => ({
  default: ({ handleModeSelection }: GameConfigTypes) => (
    <div data-testid="game-config">
      <button onClick={() => handleModeSelection("single", ["Shayan"])}>
        Start Game
      </button>
    </div>
  ),
}));

describe("Controls", () => {
  const defaultProps = {
    gameActive: false,
    onEndGame: vi.fn(),
    handleModeSelection: vi.fn(),
  };

  it("renders Game Config when game is not active", () => {
    render(<Controls {...defaultProps} />);
    expect(screen.getByTestId("game-config")).toBeInTheDocument();
    expect(screen.getByText(/Game Length/i)).toBeInTheDocument();
  });

  it("calls handleModeSelection when a mode is selected", () => {
    render(<Controls {...defaultProps} />);
    fireEvent.click(screen.getByText(/start game/i));
    expect(defaultProps.handleModeSelection).toHaveBeenCalledWith("single", [
      "Shayan",
    ]);
  });

  it("renders End Game when game is active", () => {
    render(<Controls {...defaultProps} gameActive={true} />);
    expect(screen.getByText(/end game/i)).toBeInTheDocument();
  });

  it("calls onEndGame when End Game is clicked", () => {
    render(<Controls {...defaultProps} gameActive={true} />);
    fireEvent.click(screen.getByText(/end game/i));
    expect(defaultProps.onEndGame).toHaveBeenCalled();
  });

  it("renders timer options and highlights selected one", () => {
    render(<Controls {...defaultProps} />);
    const selected = screen.getByText("2 min");
    expect(selected).toHaveClass(
      "px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg transition-all bg-slate-100 text-slate-700 hover:bg-slate-200"
    );
  });

  it("selects the correct timer button when clicked", () => {
    render(<Controls {...defaultProps} />);

    const button = screen.getByText("3 min");

    fireEvent.click(button);

    expect(button).toHaveClass("bg-indigo-100");
    expect(button).toHaveClass("text-indigo-800");
  });

  it("renders Timer when game is active", () => {
    render(<Controls {...defaultProps} gameActive={true} />);
    expect(screen.queryByText(/game length/i)).not.toBeInTheDocument();
  });

  it("displays language selector and changes language when selected", () => {
    render(<Controls {...defaultProps} />);
    expect(screen.getByText("English")).toBeInTheDocument();

    fireEvent.click(screen.getByText("English"));
    expect(screen.getByText("German")).toBeInTheDocument();
  });
});
