import Controls from "../../components/Controls";
import GameStats from "../../components/GameStats";
import WordList from "../../components/WordList";
import { GAME_SETTINGS } from "../../constans/gameConstans";
import { it, describe } from "vitest";
import { render } from "@testing-library/react";

describe("App Component Unit Tests (Vitest)", () => {
  it("renders Controls component with correct props", () => {
    const onStart = () => {};
    const onTimerChange = () => {};
    const onEndGame = () => {};

    render(
      <Controls
        gameActive={false}
        onStart={onStart}
        timerSeconds={GAME_SETTINGS.DEFAULT_TIMER}
        onTimerChange={onTimerChange}
        onEndGame={onEndGame}
        initialSeconds={GAME_SETTINGS.DEFAULT_TIMER}
      />
    );
  });

  it("renders GameStats component with correct props", () => {
    const words = ["apple", "banana"];
    const score = 10;
    render(<GameStats words={words} score={score} />);
  });

  it("renders WordList component with correct props", () => {
    const words = ["cat", "dog"];
    const totalScore = 5;
    render(<WordList words={words} totalScore={totalScore} />);
  });
});
