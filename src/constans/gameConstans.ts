export const GAME_SETTINGS = {
  DEFAULT_TIMER: 180,
  BOARD_SIZE: 4,
  MIN_WORD_LENGTH: 3,
};

// Define the dice faces as they appear in the original Boggle game
// Each string represents one die with its 6 possible faces
export const DICE = [
  "AAEEGN",
  "ABBJOO",
  "ACHOPS",
  "AFFKPS",
  "AOOTTW",
  "CIMOTU",
  "DEILRX",
  "DELRVY",
  "DISTTY",
  "EEGHNW",
  "EEINSU",
  "EHRTVW",
  "EIOSST",
  "ELRTTY",
  "HIMNQU",
  "HLNNRZ",
];

// Special handling for 'Qu' as a single unit in Boggle
export const SPECIAL_LETTERS: Record<string, string> = {
  Q: "Qu",
};

export const timerOptions = [
  { label: "1 min", value: 60 },
  { label: "2 min", value: 120 },
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
];

export const languages = [
  { code: "EN", name: "English" },
  { code: "DE", name: "German" },
];
