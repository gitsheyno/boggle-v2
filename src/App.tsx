import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import { GAME_SETTINGS } from "./constans/gameConstans";
import GameStats from "./components/GameStats";
import WordList from "./components/WordList";
import Board from "./components/Board";
import { generateBoard } from "./utilities/boardUtils";
import { calculateWordListScore } from "./utilities/scoring";

function App() {
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(
    GAME_SETTINGS.DEFAULT_TIMER
  );
  const [board, setBoard] = useState<string[][]>(generateBoard());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  const initializeGame = () => {
    setBoard(generateBoard());
    setFoundWords([]);
    setScore(0);
    setGameActive(false);
    setGameOver(false);
  };

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
    initializeGame();
    startGame();
  };

  const handleWordFound = (word: string) => {
    if (!gameActive) return;

    const lowerWord = word.toLowerCase();

    if (foundWords.some((w) => w.toLowerCase() === lowerWord)) {
      return;
    }

    setFoundWords((prev) => [...prev, word]);
  };

  useEffect(() => {
    const newScore = calculateWordListScore(foundWords);
    setScore(newScore);
  }, [foundWords]);

  return (
    <div className="min-h-screen h-[100vh]  bg-gradient-to-b from-indigo-50 to-slate-100 text-slate-900">
      <main className="container  mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <Controls
            gameActive={gameActive}
            onStart={startGame}
            timerSeconds={timerSeconds}
            onTimerChange={setTimerSeconds}
            onEndGame={endGame}
            initialSeconds={timerSeconds}
          />

          <div className="flex items-end   gap-8 w-full max-w-4xl">
            <div className="flex justify-center flex-1">
              <Board
                board={board}
                onWordFound={handleWordFound}
                gameActive={gameActive}
              />
            </div>
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
