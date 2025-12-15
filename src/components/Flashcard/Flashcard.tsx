import styles from "./Flashcard.module.scss";

interface FlashcardProps {
  question: string;
  answer: string;
}

export function Flashcard({
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
}: FlashcardProps) {
  const isFlashcard = question && answer;

  if (!isFlashcard) {
    question = "No question";
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className="right">
          {/* dropdown to toggle between front and back of card */}
          <div className={styles.dropdown}>
            <select name="cardSide" id="cardSide">
              <option value="front">Front</option>
              <option value="back">Back</option>
            </select>
          </div>
          <div className={styles.checklist}>
            <input type="checkbox" id="checklist" name="checklist" />
            <label htmlFor="checklist">Checklist</label>
          </div>
        </div>
        <div className="left">
          <button>Shuffle</button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.flipCard}>
          <span className={styles.category}>Web Development</span>
          <h2>Front of card</h2>
          <p>{question}</p>
          {/* progress bar */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressBarFill}
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
        <div className={styles.controlButtons}>
          <button>I Know This</button>
          <button>Reset Progress</button>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <button>Previous</button>
        <span className={styles.currentCard}>1/10</span>
        <button>Next</button>
      </div>
    </div>
  );
}
