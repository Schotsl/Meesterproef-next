import styles from "./Background.module.scss";

type BackgroundProps = {
  color: string;
};

export default function Background({ color }: BackgroundProps) {
  return (
    <div className={styles.background} style={{ backgroundColor: color }}>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
    </div>
  );
}
