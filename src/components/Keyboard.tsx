import styles from "../styles/keyboard.module.css";
const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type keyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetters: (letter: string) => void;
  disabled?: boolean;
};

const Keyboard = ({
  activeLetters,
  inactiveLetters,
  addGuessedLetters,
  disabled = false,
}: keyboardProps) => {
  return (
    <div className={styles.key}>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetters(key)}
            className={`${styles.btn} 
            ${isActive ? styles.active : ""}
            ${isInactive ? styles.inactive : ""}`}
            disabled={isActive || isInactive || disabled}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};
export default Keyboard;
