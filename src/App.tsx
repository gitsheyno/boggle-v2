import { useState } from "react";
import Controls from "./components/Controls";
import { GAME_SETTINGS } from "./constans/gameConstans";
function App() {
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(
    GAME_SETTINGS.DEFAULT_TIMER
  );
  const [gameOver, setGameOver] = useState<boolean>(false);

  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
  };

  const resetGame = () => {
    endGame();
  };
  return (
    <div className="min-h-screen h-[100vh]  bg-gradient-to-b from-indigo-50 to-slate-100 text-slate-900">
      <main className="container  mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <Controls
            gameActive={gameActive}
            onStart={startGame}
            onReset={resetGame}
            timerSeconds={timerSeconds}
            onTimerChange={setTimerSeconds}
            onTimeUp={endGame}
            initialSeconds={timerSeconds}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
