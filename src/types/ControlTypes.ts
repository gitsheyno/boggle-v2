export type ControlsProps = {
  gameActive: boolean;
  onEndGame: () => void;
  handleModeSelection: (
    mode: "single" | "multi" | "ai",
    playerName: string[]
  ) => void;
};
