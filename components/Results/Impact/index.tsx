import Image from "next/image";
import styles from "./ResultsImpact.module.scss";

import { Impact } from "../../../types";

import moneyIcon from "@/public/background/profit/1.png";
import societyIcon from "@/public/background/society/3.png";
import workersIcon from "@/public/background/workers/2.png";

type ResultsImpactProps = {
  impact: Impact;
};

export default function ResultsImpact({ impact }: ResultsImpactProps) {
  const societyWidth = 50 * impact.societalImpact + 50;
  const workersWidth = 50 * impact.employeeWellbeing + 50;
  const financialWidth = 50 * impact.financialPresentation + 50;

  return (
    <ul className={styles.impact}>
      <li className={styles.impact__item}>
        <Image className={styles.impact__item__icon} src={moneyIcon} alt="Money icon" />

        <span className={styles.impact__item__slider} style={{ width: `${financialWidth}%` }}></span>
      </li>

      <li className={styles.impact__item}>
        <Image className={styles.impact__item__icon} src={workersIcon} alt="Workers icon" />

        <span className={styles.impact__item__slider} style={{ width: `${workersWidth}%` }}></span>
      </li>

      <li className={styles.impact__item}>
        <Image className={styles.impact__item__icon} src={societyIcon} alt="Society icon" />

        <span className={styles.impact__item__slider} style={{ width: `${societyWidth}%` }}></span>
      </li>
    </ul>
  );
}
