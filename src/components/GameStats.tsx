import React from "react";
import { GameStatsProps } from "../types";
import { useTranslation } from "react-i18next";
/**
 * GameStats component displays game performance metrics
 *
 * Shows the player's total score, number of words found, and the longest word.
 */
const GameStats: React.FC<GameStatsProps> = ({ players }) => {
  const { t } = useTranslation();
  const handleTotalWords = (word: string[]) => {
    return word.length;
  };

  const handlelongestWord = (word: string[]) => {
    const longestWord = word.reduce(
      (longest, word) => (word.length > longest.length ? word : longest),
      ""
    );
    return longestWord;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-full flex flex-col gap-4 border border-slate-100">
      {players.map((player, index) => (
        <div
          key={player.name + index}
          className="bg-white rounded-xl p-4 w-full"
        >
          <h2 className="text-lg md:text-xl text-center font-bold text-slate-800 mb-3">
            {player.name} Stats
          </h2>

          <div className="flex items-center justify-between gap-3">
            <div className="flexflex-col items-center bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-500 ">{t("totalScore")}</p>
              <p className="text-xl md:text-2xl text-center font-bold text-indigo-600">
                {player.score}
              </p>
            </div>

            <div className="flex flex-col items-center bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-500">{t("totalWords")}</p>
              <p className="text-xl md:text-2xl font-bold text-indigo-600">
                {handleTotalWords(player.foundedWords)}
              </p>
            </div>

            <div className="flex flex-col items-center bg-slate-50  rounded-lg p-3">
              <p className="text-sm text-slate-500">{t("longestWord")}</p>
              <p className="text-sm  font-bold text-slate-800 truncate max-w-full">
                {handlelongestWord(player.foundedWords)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameStats;
