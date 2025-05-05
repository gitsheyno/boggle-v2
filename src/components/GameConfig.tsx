import { useState } from "react";
import Modal from "./Modal";
import SingleModeForm from "./SingleModeForm";
import MultiModeForm from "./MultiModeForm";
import { GameConfigTypes } from "../types";
import { useTranslation } from "react-i18next";
/**
 * GameCongig component handles game and users configuratoin.
 * renders a modal with game mode selection and player name input.
 */
const GameConfig = ({ handleModeSelection }: GameConfigTypes) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const { t } = useTranslation();
  const selectMode = (mode: string) => {
    setSelectedMode(mode);
  };
  const handleStartGame = (playersName: string[]) => {
    if (selectedMode === "single") {
      const finalPlayer1Name = playersName;
      handleModeSelection("single", [...finalPlayer1Name]);
    } else if (selectedMode === "multi") {
      const [finalPlayer1Name, finalPlayer2Name] = playersName;

      handleModeSelection("multi", [finalPlayer1Name, finalPlayer2Name]);
    }
    setSelectedMode(null);
  };

  return (
    <>
      <Modal>
        <Modal.Open>
          <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            {t("start")}
          </button>
        </Modal.Open>

        <Modal.Window>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("selectGameMode")}
            </h2>

            {selectedMode === null ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => selectMode("single")}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  {t("singlePlayer")}
                </button>

                <button
                  onClick={() => selectMode("multi")}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  {t("multiPlayer")}
                </button>

                <button
                  onClick={() => selectMode("ai")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  {t("aiPlayer")}
                </button>
              </div>
            ) : selectedMode === "single" ? (
              <div className="flex flex-col gap-4">
                <SingleModeForm
                  handleStartGame={handleStartGame}
                  setSelectedMode={setSelectedMode}
                />
              </div>
            ) : selectedMode === "multi" ? (
              <div className="flex flex-col gap-4">
                <MultiModeForm
                  handleStartGame={handleStartGame}
                  setSelectedMode={setSelectedMode}
                />
              </div>
            ) : selectedMode === "ai" ? (
              <div className="flex flex-col gap-4"></div>
            ) : null}
          </div>
        </Modal.Window>
      </Modal>
    </>
  );
};

export default GameConfig;
