import styles from "./Flashcard.module.scss";
import shuffleIcon from "../../assets/images/icon-shuffle.svg";
import chevronDownIcon from "../../assets/images/icon-chevron-down.svg";
import { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export function Flashcard({
  question = "What does HTML stand for?",
  answer = "HyperText Markup Language",
}: FlashcardProps) {
  const isFlashcard = question && answer;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { name: "Art", count: 1 },
    { name: "CSS", count: 6 },
    { name: "Geography", count: 4 },
    { name: "History", count: 1 },
    { name: "HTML", count: 3 },
    { name: "JavaScript", count: 14 },
  ];

  if (!isFlashcard) {
    question = "No question";
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.left}>
          {/* dropdown to toggle between front and back of card */}
          <div className={styles.dropdownContainer}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              All Categories
              <img
                src={chevronDownIcon}
                alt=""
                className={isDropdownOpen ? styles.rotate : ""}
              />
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {categories.map((cat) => (
                  <label key={cat.name} className={styles.dropdownItem}>
                    <input type="checkbox" />
                    <span>
                      {cat.name} ({cat.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className={styles.checklist}>
            <input type="checkbox" id="checklist" name="checklist" />
            <label htmlFor="checklist">Checklist</label>
          </div>
        </div>
        <div className={styles.right}>
          <button>
            <img src={shuffleIcon} alt="" />
            Shuffle
          </button>
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
