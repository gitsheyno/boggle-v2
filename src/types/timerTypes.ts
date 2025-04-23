export type TimerProps = {
  initialSeconds: number;
  isActive: boolean;
  timeUp: () => void;
};
