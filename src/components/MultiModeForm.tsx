import React, { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

interface MultiModeFormProps {
  initialNames?: {
    player1: string;
    player2: string;
  };
  handleStartGame?: (names: string[]) => void;
  setSelectedMode: (mode: string | null) => void;
}

const MultiModeForm: React.FC<MultiModeFormProps> = ({
  initialNames = { player1: "", player2: "" },
  handleStartGame,
  setSelectedMode,
}) => {
  const [player1Name, setPlayer1Name] = useState<string>(initialNames.player1);
  const [player2Name, setPlayer2Name] = useState<string>(initialNames.player2);
  const { t } = useTranslation();

  const [touched, setTouched] = useState({
    player1: false,
    player2: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      handleStartGame?.([player1Name, player2Name]);
    }
  };

  const isNameValid = (name: string) => name.trim().length >= 2;
  const isFormValid = () =>
    isNameValid(player1Name) && isNameValid(player2Name);

  const showPlayer1Error = touched.player1 && !isNameValid(player1Name);
  const showPlayer2Error = touched.player2 && !isNameValid(player2Name);

  return (
    <div className="w-3xl max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        {t("multiPlayer")}
      </h2>

      <form
        data-testid="multi-mode-form"
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col"
      >
        <div className="space-y-2">
          <label
            htmlFor="player1"
            className="block text-sm font-medium text-gray-700"
          >
            {t("player1Name")}
          </label>

          <div className="relative">
            <input
              id="player1"
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, player1: true }))}
              placeholder="Enter player 1 name"
              autoComplete="off"
              className={`w-full px-4 py-3 border ${
                showPlayer1Error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-opacity-50 ${
                showPlayer1Error
                  ? "focus:ring-red-200 focus:border-red-500"
                  : "focus:ring-indigo-200 focus:border-indigo-500"
              } transition duration-150 ease-in-out`}
            />

            {player1Name && (
              <button
                type="button"
                onClick={() => setPlayer1Name("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Clear Player 1 input"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="h-[20px]">
            {showPlayer1Error && (
              <p className="text-red-500 text-sm">
                {t("pleaseEnterValidName")}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="player2"
            className="block text-sm font-medium text-gray-700"
          >
            {t("player2Name")}
          </label>

          <div className="relative">
            <input
              id="player2"
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, player2: true }))}
              placeholder="Enter player 2 name"
              autoComplete="off"
              className={`w-full px-4 py-3 border ${
                showPlayer2Error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-opacity-50 ${
                showPlayer2Error
                  ? "focus:ring-red-200 focus:border-red-500"
                  : "focus:ring-indigo-200 focus:border-indigo-500"
              } transition duration-150 ease-in-out`}
            />

            {player2Name && (
              <button
                type="button"
                onClick={() => setPlayer2Name("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Clear Player 2 input"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="h-[20px]">
            {showPlayer2Error && (
              <p className="text-red-500 text-sm">
                {t("pleaseEnterValidName")}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition duration-150 ease-in-out ${
              isFormValid()
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-green-300 text-white cursor-not-allowed"
            }`}
          >
            {t("startGame")}
          </button>
          <button
            type="button"
            onClick={() => setSelectedMode(null)}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg"
          >
            {t("back")}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>{t("enterYourNameToStart")}</p>
      </div>
    </div>
  );
};

export default MultiModeForm;
