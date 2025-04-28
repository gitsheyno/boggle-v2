import { calculateWordScore } from "../utilities/scoring";
import { WordListProps } from "../types";
import { useTranslation } from "react-i18next";
/**
 * WordList component displays a sortable list of found words with their scores
 *
 * Shows a table of words sorted by score with visual indicators for high-scoring words.
 * Includes a summary showing total points, word count, and average points per word.
 * Displays a placeholder message and icon when no words have been found.
 */
const WordList: React.FC<WordListProps> = ({ players }: WordListProps) => {
  const { t } = useTranslation();
  if (!players || players.length === 0) {
    const dummyPlayers = [1, 2];

    return (
      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full h-[500px] flex flex-col border border-slate-100">
        {dummyPlayers.map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-[250px] overflow-scroll"
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div className="h-6 w-36 bg-slate-200 rounded-md animate-pulse"></div>
              <div className="h-8 w-20 bg-indigo-50 rounded-lg animate-pulse"></div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center text-slate-400 space-y-3 py-12">
              <div className="h-12 w-12 rounded-full bg-slate-200 animate-pulse"></div>
              <div className="h-5 w-32 bg-slate-200 rounded-md animate-pulse"></div>
            </div>

            <div className="flex-grow hidden">
              <div className="w-full">
                <div className="flex justify-between pb-2 sticky top-0 bg-white">
                  <div className="h-5 w-20 bg-slate-200 rounded-md animate-pulse"></div>
                  <div className="h-5 w-16 bg-slate-200 rounded-md animate-pulse"></div>
                </div>

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between py-2.5 border-b border-slate-100"
                  >
                    <div className="h-5 w-28 bg-slate-200 rounded-md animate-pulse"></div>
                    <div className="h-5 w-12 bg-slate-200 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 hidden">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-slate-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-32 bg-slate-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      data-testid="word-list"
      className="bg-white rounded-2xl shadow-lg p-5 md:p-6 w-full flex flex-col border border-slate-100"
    >
      {players.map((player) => (
        <div className="flex flex-col justify-between h-[250px] overflow-scroll">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">{player.name}</h2>
            <div className="text-xl font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
              {t("playerScore")} {player.score} pts
            </div>
          </div>
          {player.foundedWords.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-slate-400 space-y-3 py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              <p className="italic">{t("Nowordsfoundyet")}...</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <table className="w-full">
                <thead className="text-left text-slate-500 sticky top-0 bg-white">
                  <tr>
                    <th className="pb-2 font-medium">{t("word")}</th>
                    <th className="pb-2 font-medium text-right">
                      {t("point")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {player.foundedWords.map((word, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-2.5 font-medium text-slate-700">
                        {word}
                        {word.length >= 8 && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                            Great!
                          </span>
                        )}
                        {word.length === 7 && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                            Good!
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-right text-indigo-600 font-medium">
                        +{calculateWordScore(word)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {player.foundedWords.length > 0 && (
            <div className="pt-3 mt-3 border-t border-slate-100 text-sm text-slate-500 flex justify-between">
              <span>Total Words: {player.foundedWords.length}</span>
              <span>
                Avg Points:{" "}
                {(player.score / player.foundedWords.length).toFixed(1)} per
                word
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WordList;
