interface GameStatsProps {
  words: string[];
  score: number;
}

/**
 * GameStats component displays game performance metrics
 *
 * Shows the player's total score, number of words found, and the longest word.
 */
const GameStats: React.FC<GameStatsProps> = ({ words, score }) => {
  const totalWords = words.length;
  const longestWord = words.reduce(
    (longest, word) => (word.length > longest.length ? word : longest),
    ""
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 w-full max-w-md">
      <h2 className="text-xl text-center font-bold text-slate-800 mb-4">
        Game Stats
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center ">
          <p className="text-sm text-slate-500">Total Score</p>
          <p className="text-2xl font-bold text-indigo-600">{score}</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm text-slate-500">Words Found</p>
          <p className="text-2xl font-bold text-indigo-600">{totalWords}</p>
        </div>

        {longestWord && (
          <div>
            <p className="text-sm text-slate-500">Longest Word</p>
            <p className="text-xl font-bold text-slate-800 truncate">
              {longestWord}
              <span className="text-sm font-normal">
                ({longestWord.length})
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStats;
