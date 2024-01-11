import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__inner}></div>
    </div>
  );
}
