import React, { useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface SingleModeFormProps {
  initialName?: string;
  handleStartGame?: (names: string[]) => void;
  setSelectedMode: (mode: string | null) => void;
}

const SingleModeForm: React.FC<SingleModeFormProps> = ({
  initialName = "",
  handleStartGame,
  setSelectedMode,
}) => {
  const { t } = useTranslation();
  const [playerName, setPlayerName] = useState<string>(initialName);
  const [touched, setTouched] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (playerName.trim()) {
      handleStartGame?.([playerName.trim()]);
    }
  };

  const isNameValid = playerName.trim().length >= 2;
  const showError = touched && !isNameValid;

  return (
    <div className="w-3xl max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        {t("singlePlayerSetup")}
      </h2>

      <form
        data-testid="single-mode-form"
        onSubmit={handleSubmit}
        className="space-y-6 flex flex-col"
      >
        <div className="space-y-2">
          <label
            htmlFor="playerName"
            className="block text-sm font-medium text-gray-700"
          >
            {t("yourName")}
          </label>

          <div className="relative">
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={handleNameChange}
              onBlur={() => setTouched(true)}
              placeholder={t("enterYourName")}
              autoComplete="off"
              className={`w-full px-4 py-3 border ${
                showError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-opacity-50 ${
                showError
                  ? "focus:ring-red-200 focus:border-red-500"
                  : "focus:ring-indigo-200 focus:border-indigo-500"
              } transition duration-150 ease-in-out`}
            />

            {playerName && (
              <button
                type="button"
                onClick={() => setPlayerName("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label={t("clearInput")}
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
        </div>

        <div className="h-[30px]">
          {showError && (
            <p className="text-red-500 text-sm">{t("pleaseEnterValidName")}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!isNameValid}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition duration-150 ease-in-out ${
              isNameValid
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-green-300 text-white cursor-not-allowed"
            }`}
          >
            {t("startGame")}
          </button>
          <button
            type="button"
            onClick={() => setSelectedMode(null)}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg"
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

export default SingleModeForm;
