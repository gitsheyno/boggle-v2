import { GameStatsProps } from "../types";

/**
 * GameStats component displays game performance metrics
 *
 * Shows the player's total score, number of words found, and the longest word.
 */
const GameStats: React.FC<GameStatsProps> = ({ players }) => {
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
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full gap-3 flex flex-col border border-slate-100">
      {players.map((player) => (
        <div className="bg-white rounded-xl  p-4 md:p-6 w-full max-w-md">
          <h2 className="text-xl text-center font-bold text-slate-800 mb-4">
            {player.name} Stats
          </h2>

          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-col items-center ">
              <p className="text-sm text-slate-500">Total Score</p>
              <p className="text-2xl font-bold text-indigo-600">
                {player.score}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm text-slate-500">Words Found</p>
              <p className="text-2xl font-bold text-indigo-600">
                {handleTotalWords(player.foundedWords)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-slate-500">Longest Word</p>
              <p className="text-xl font-bold text-slate-800 truncate">
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
