// App.tsx with Modal Implementation - Responsive Version

import { useState } from "react";
import Controls from "./components/Controls";
import GameStats from "./components/GameStats";
import WordList from "./components/WordList";
import Board from "./components/Board";
import { generateBoard } from "./utilities/boardUtils";
import { calculateWordListScore } from "./utilities/scoring";
import { Player } from "./types";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  const [gameActive, setGameActive] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<string | null>(null);
  const [board, setBoard] = useState<string[][]>(generateBoard());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const handleModeSelection = (
    mode: "single" | "multi" | "ai",
    playerName: string[]
  ) => {
    setGameActive(true);
    setPlayers([]);
    setBoard(generateBoard());
    setFoundWords([]);
    setGameOver(false);
    if (mode === "multi") {
      const [finalPlayer1Name, finalPlayer2Name] = playerName;
      setPlayers((prev) => [
        ...prev,
        { name: finalPlayer1Name, foundedWords: [], score: 0 },
        { name: finalPlayer2Name, foundedWords: [], score: 0 },
      ]);
      setActivePlayer(finalPlayer1Name);
    } else if (mode === "single") {
      const [finalPlayer1Name] = playerName;
      setPlayers((prev) => [
        ...prev,
        { name: finalPlayer1Name, foundedWords: [], score: 0 },
      ]);

      setActivePlayer(finalPlayer1Name);
    }
  };
  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
  };

  const handleWordFound = (word: string) => {
    if (!gameActive) return;
    const lowerWord = word.toLowerCase();

    if (foundWords.some((w) => w.toLowerCase() === lowerWord)) {
      return;
    }
    setPlayers((prev) => {
      const player = prev.find((p) => p.name === activePlayer);
      if (!player) return prev;
      return prev.map((p) =>
        p.name === activePlayer
          ? {
              ...p,
              foundedWords: [...(p.foundedWords || []), word],
              score: calculateWordListScore([
                ...(p.foundedWords || []),
                word,
              ] as string[]),
            }
          : p
      );
    });
    setFoundWords((prev) => [...prev, word]);

    if (players.length >= 2) {
      const [player1, player2] = players;

      if (activePlayer === player1.name) {
        setActivePlayer(player2.name);
      } else if (activePlayer === player2.name) {
        setActivePlayer(player1.name);
      }
    }
  };

  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-indigo-50 to-slate-100 text-slate-900 overflow-y-auto">
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-8">
          <Controls
            handleModeSelection={handleModeSelection}
            gameActive={gameActive}
            onEndGame={endGame}
          />

          <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-4xl gap-6 md:gap-8  p-3 sm:p-4 rounded-lg bg-white/50">
            <div className="w-full md:w-1/2 flex justify-center">
              <Board
                board={board}
                onWordFound={handleWordFound}
                gameActive={gameActive}
              />
            </div>

            <div className="w-full md:w-1/2">
              {!gameOver ? (
                <div className="flex justify-center w-full">
                  <WordList players={players} data-testid="word-list" />
                </div>
              ) : (
                <div className="w-full">
                  <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-indigo-100">
                    <GameStats players={players} />
                    <div className="mt-4 sm:mt-6 flex flex-col justify-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-center text-red-500">
                        {t("gameOver")}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
