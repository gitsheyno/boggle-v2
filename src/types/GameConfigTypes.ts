export type GameConfigTypes = {
  handleModeSelection: (
    mode: "single" | "multi" | "ai",
    playerName: string[]
  ) => void;
};
