import React, { useEffect, useState } from "react";
import { TimerProps } from "../types";
/**
 * Timer component that displays a countdown with visual progress indicator
 *
 * Shows remaining time in minutes:seconds format with a color-coded progress bar
 * that changes from green to amber to red as time runs out. Triggers the timeUp
 * callback when countdown reaches zero.
 */
const Timer: React.FC<TimerProps> = ({ initialSeconds, isActive, timeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            timeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds, timeUp]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progressPercentage = (seconds / initialSeconds) * 100;

  const getProgressColor = (): string => {
    if (progressPercentage > 50) return "bg-emerald-500";
    if (progressPercentage > 25) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div data-testid="timer" className="w-full max-w-md">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-slate-600">
          Time Remaining
        </span>
        <span className="text-xl font-bold text-slate-800">
          {formatTime(seconds)}
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
