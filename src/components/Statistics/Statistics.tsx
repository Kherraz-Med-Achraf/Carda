import styles from './Statistics.module.scss';

export function Statistics() {
  return (
    <div className={styles.statsContainer}>
      <h3>Statistics</h3>
      <div className={styles.statItem}>
        <span>Total Cards</span>
        <strong>0</strong>
      </div>
    </div>
  );
}

