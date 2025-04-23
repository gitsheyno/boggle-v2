export type BoardProps = {
  board: string[][];
  onWordFound: (word: string) => void;
  gameActive: boolean;
};
