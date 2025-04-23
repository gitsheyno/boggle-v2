export type ControlsProps = {
  gameActive: boolean;
  onStart: () => void;
  timerSeconds: number;
  onEndGame: () => void;
  initialSeconds: number;
  onTimerChange: (seconds: number) => void;
};
