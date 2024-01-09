import styles from "./Background.module.scss";

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
    </div>
  );
}
