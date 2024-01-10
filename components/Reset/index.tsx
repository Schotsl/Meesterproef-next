import styles from "./Reset.module.scss";

type ResetProps = {
  onReset: () => void;
};

export default function Reset({ onReset }: ResetProps) {
  return (
    <button className={styles.reset} onClick={onReset}>
      Reset
    </button>
  );
}
