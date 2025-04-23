export type DieProps = {
  letter: string;
  row: number;
  col: number;
  isSelected: boolean;
  isSelectable: boolean;
  selectionIndex: number | null;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
};
