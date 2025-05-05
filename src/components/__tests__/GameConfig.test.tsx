// GameConfig.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, it, describe, expect } from "vitest";
import GameConfig from "../GameConfig";

import { I18nextProvider } from "react-i18next";
import i18n from "../../utilities/i18n";
describe("GameConfig", () => {
  it("renders the Start button initially", () => {
    const mockHandleModeSelection = vi.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <GameConfig handleModeSelection={mockHandleModeSelection} />
      </I18nextProvider>
    );

    expect(screen.getByText(/new game/i)).toBeInTheDocument();
  });

  it("opens modal and displays game mode buttons", async () => {
    const mockHandleModeSelection = vi.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <GameConfig handleModeSelection={mockHandleModeSelection} />
      </I18nextProvider>
    );

    const startButton = screen.getByText(/new game/i);
    fireEvent.click(startButton);

    expect(await screen.findByText(/select game mode/i)).toBeInTheDocument();
    expect(screen.getByText(/single player/i)).toBeInTheDocument();
    expect(screen.getByText(/Multiplayer Setup/i)).toBeInTheDocument();
  });

  it("selects Single Player mode and shows SingleModeForm", async () => {
    const mockHandleModeSelection = vi.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <GameConfig handleModeSelection={mockHandleModeSelection} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(/new game/i));
    fireEvent.click(await screen.findByText(/single player/i));

    expect(await screen.findByTestId("single-mode-form")).toBeInTheDocument();
  });

  it("selects Multi Player mode and shows MultiModeForm", async () => {
    const mockHandleModeSelection = vi.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <GameConfig handleModeSelection={mockHandleModeSelection} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(/new game/i));
    fireEvent.click(await screen.findByText(/Multiplayer Setup/i));

    expect(await screen.findByTestId("multi-mode-form")).toBeInTheDocument();
  });
});
