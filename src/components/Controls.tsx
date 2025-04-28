import React, { useState } from "react";
import Timer from "./Timer";
import { type ControlsProps } from "../types";
import GameConfig from "./GameConfig";
import { useTranslation } from "react-i18next";
import i18n from "../utilities/i18n";
import {
  GAME_SETTINGS,
  timerOptions,
  languages,
} from "../constans/gameConstans";
/**
 * Controls component for a timed game interface
 *
 * Provides UI for starting/ending the game and selecting game duration.
 * When the game is inactive, displays a start button and timer options.
 * When the game is active, displays an end button and countdown timer.
 * Handles language selection with a dropdown menu.
 */
const Controls: React.FC<ControlsProps> = ({
  gameActive,
  onEndGame,
  handleModeSelection,
}) => {
  const { t } = useTranslation();
  const [timerSeconds, setTimerSeconds] = useState<number>(
    GAME_SETTINGS.DEFAULT_TIMER
  );
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "EN",
    name: "English",
  });

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const selectLanguage = (lang: { code: string; name: string }) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang.code);
    setIsLanguageOpen(false);
  };

  return (
    <div className="flex flex-col  w-[80%]  md:flex-row items-start justify-center gap-4">
      <div className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-4 p-5 bg-white rounded-2xl shadow-lg border border-slate-100">
        <div className="w-full md:w-auto">
          {!gameActive ? (
            <GameConfig handleModeSelection={handleModeSelection} />
          ) : (
            <button
              onClick={onEndGame}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t("endGame")}
            </button>
          )}
        </div>
        {!gameActive ? (
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm font-medium text-slate-600 self-center">
              {t("gameLength")} :
            </span>
            <div className="flex gap-1">
              {timerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimerSeconds(option.value)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    timerSeconds === option.value
                      ? "bg-indigo-100 text-indigo-800 font-medium shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Timer
            initialSeconds={timerSeconds}
            isActive={gameActive}
            timeUp={onEndGame}
          />
        )}
      </div>

      <div className="relative">
        <button
          onClick={toggleLanguageDropdown}
          className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all"
        >
          <span className="text-slate-700 font-medium">
            {selectedLanguage.name}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-slate-500 transition-transform ${
              isLanguageOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isLanguageOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-10">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang)}
                className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors ${
                  selectedLanguage.code === lang.code
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-700"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
