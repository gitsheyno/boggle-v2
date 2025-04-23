import { useState } from "react";
import Controls from "./components/Controls";
import { GAME_SETTINGS } from "./constans/gameConstans";
import GameStats from "./components/GameStats";
import WordList from "./components/WordList";

function App() {
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(
    GAME_SETTINGS.DEFAULT_TIMER
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

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

          <div className="flex items-end   gap-8 w-full max-w-4xl">
            {!gameOver ? (
              <div className="flex justify-center flex-1 h-[420px]">
                <WordList words={foundWords} totalScore={score} />
              </div>
            ) : (
              <div className="mt-6 w-full max-w-lg flex-1 ">
                <div className="bg-white h-[420px] rounded-2xl shadow-xl p-6 border border-indigo-100">
                  <GameStats words={foundWords} score={score} />
                  <div className="mt-6 flex flex-col justify-center gap-3">
                    <button
                      onClick={resetGame}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
                    >
                      Play Again
                    </button>
                    <h2 className="text-2xl font-bold text-center text-red-500">
                      Game Over!
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
