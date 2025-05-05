import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  EN: {
    translation: {
      // Controls component
      start: "New Game",
      endGame: "End Game",
      gameLength: "Game Length",
      language: "Language",
      selectGameMode: " Select Game Mode",

      // Game Config strings
      singlePlayer: "Single Player",
      multiPlayer: "Multiplayer Setup",
      aiOpponent: "vs AI",
      startGame: "Start Game",
      player1Name: "Player 1 Name",
      player2Name: "Player 2 Name",

      // Game UI elements
      score: "Score",
      foundWords: "Found Words",
      playAgain: "Play Again",
      gameOver: "Game Over!",
      playerScore: "Player Score",
      totalWords: "Words",
      Nowordsfoundyet: "No words found yet",
      word: "Word",
      point: "Point",
      longestWord: "Longest Word",
      totalScore: "Score",
      Great: "Great",
      Good: "Good",
      perWords: "per word",
      AvgPoints: "Average Points",

      // SingleModeForm texts
      singlePlayerSetup: "Single Player Setup",
      yourName: "Your Name",
      enterYourName: "Enter your name",
      pleaseEnterValidName: "Please enter a valid name (at least 2 characters)",
      back: "Back",
      enterYourNameToStart: "Enter your name to start the game",
      clearInput: "Clear input",
    },
  },
  DE: {
    translation: {
      // Controls component
      start: "neues Spiel",
      endGame: "beenden",
      gameLength: "Spieldauer",
      language: "Sprache",
      selectGameMode: " Spielmodus auswählen",

      // Game Config strings
      singlePlayer: "Einzelspieler",
      multiPlayer: "Mehrspieler",
      aiOpponent: "gegen KI",
      startGame: "Spiel starten",
      player1Name: "Name Spieler 1",
      player2Name: "Name Spieler 2",

      // Game UI elements
      score: "Punkte",
      foundWords: "Gefundene Wörter",
      playAgain: "Nochmal spielen",
      gameOver: "Spiel vorbei!",
      playerScore: "spieler Punkte",
      totalWords: "Wörter",
      Nowordsfoundyet: "Noch keine Wörter gefunden",
      word: "Wort",
      point: "Punkt",
      longestWord: "Längstes Wort",
      totalScore: "punktzahl",
      Great: "Toll!",
      Good: "Gut",
      perWords: "pro Wort",
      AvgPoints: "Durchschnittliche Punkte",

      // SingleModeForm texts
      singlePlayerSetup: "Einzelspieler-Setup",
      yourName: "Dein Name",
      enterYourName: "Gib deinen Namen ein",
      pleaseEnterValidName:
        "Bitte gib einen gültigen Namen ein (mindestens 2 Zeichen)",
      back: "Zurück",
      enterYourNameToStart: "Gib deinen Namen ein, um das Spiel zu starten",
      clearInput: "Eingabe löschen",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "EN",
  fallbackLng: "EN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
