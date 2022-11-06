import styles from "../styles/drawing.module.css";

type HangmanDrawingProps = {
  noOfGuess: number;
};

const HEAD = <div className={styles.head} />;
const BODY = <div className={styles.body} />;
const RIGHT_ARM = <div className={styles.right_arm} />;
const LEFT_ARM = <div className={styles.left_arm} />;
const LEFT_LEG = <div className={styles.left_leg} />;
const RIGHT_LEG = <div className={styles.right_leg} />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

const HangmanDrawing = ({ noOfGuess: noOfGuess }: HangmanDrawingProps) => {
  return (
    <div className={styles.drawing_container}>
      {BODY_PARTS.slice(0, noOfGuess)}
      <div className={styles.bowline} />
      <div className={styles.top_rod} />
      <div className={styles.middle_rod} />
      <div className={styles.bottom_rod} />
    </div>
  );
};
export default HangmanDrawing;
