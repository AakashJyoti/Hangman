import { useCallback, useEffect, useState } from "react";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import words from "./wordList.json";

const getWord = () => words[Math.floor(Math.random() * words.length)];

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord());

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const inCorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLose = inCorrectLetters.length >= 6;
  const isWin = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLose || isWin) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLose, isWin]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetters(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setWordToGuess(getWord());
      setGuessedLetters([]);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div className="main">
      <div className="status">
        {isWin && "Winner! - Refresh to try again"}
        {isLose && "Nice try! - Refresh to try again"}
      </div>
      <HangmanDrawing noOfGuess={inCorrectLetters.length} />
      <HangmanWord
        reveal={isLose}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      {isWin ||
        (isLose && (
          <button
            className="reset_btn"
            onClick={() => {
              setWordToGuess(getWord());
              setGuessedLetters([]);
            }}
          >
            Reset
          </button>
        ))}
      <div className="keyboard">
        <Keyboard
          disabled={isLose || isWin}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={inCorrectLetters}
          addGuessedLetters={addGuessedLetters}
        />
      </div>
    </div>
  );
}

export default App;
