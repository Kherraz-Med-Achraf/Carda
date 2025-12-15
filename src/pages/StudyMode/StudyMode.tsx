import { Flashcard, Statistics } from "../../components";
import styles from "./StudyMode.module.scss";

export function StudyMode() {
  return (
    <main className={styles.pageContainer}>
      <Flashcard />
      <Statistics />
    </main>
  );
}
