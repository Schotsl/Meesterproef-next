import styles from "./Background.module.scss";

import { numberBetween, floatBetween } from "@/helper";
import { DoodleImage, DoodleProperties } from "./_types";
import { useEffect, useState, useCallback } from "react";
import { moneyDoodles, workersDoodles, societyDoodles } from "./_doodles";

import imageIslandMoney from "@/public/background/islands/money.png";
import imageIslandSociety from "@/public/background/islands/society.png";
import imageIslandWorkers from "@/public/background/islands/workers.png";

import Image from "next/image";

type BackgroundProps = {
  color?: string;
  money?: number;
  society?: number;
  workers?: number;
};

export default function Background({ color, money = 0, society = 0, workers = 0 }: BackgroundProps) {
  const [doodles, setDoodles] = useState<DoodleProperties[]>([]);

  const [moneyCount, setMoneyCount] = useState<number>(0);
  const [societyCount, setSocietyCount] = useState<number>(0);
  const [workersCount, setWorkersCount] = useState<number>(0);

  const updateDoodle = useCallback(() => {
    setDoodles((doodles) =>
      doodles.map((doodle) => {
        // Loop the doodle back to the top if it's out of the screen
        const positionNext = doodle.positionY + doodle.speed;
        const positionOverflow = positionNext > window.innerHeight;
        const positionY = positionOverflow ? -doodle.doodle.height : positionNext;

        return {
          ...doodle,
          positionY,
        };
      }),
    );
  }, []);

  useEffect(() => {
    const doodlesAdded: DoodleProperties[] = [];

    // Generate more doodles if the count increases
    const addDoodles = (currentCount: number, targetCount: number, doodleArray: DoodleImage[]) => {
      for (let i = currentCount; i < targetCount; i++) {
        const randomIndex = numberBetween(0, doodleArray.length - 1);
        const randomDoodle = doodleArray[randomIndex];

        // Base the speed on the index of the doodle
        const index = numberBetween(0, 4);
        const speed = index + 4 + floatBetween(-2, 2);

        doodlesAdded.push({
          tilt: numberBetween(-30, 30),
          index,
          speed,
          doodle: randomDoodle,

          // Randomize the position of the doodle on the screen
          positionX: Math.random() * window.innerWidth,
          positionY: -randomDoodle.height,
        });
      }

      return targetCount;
    };

    setMoneyCount(addDoodles(moneyCount, money, moneyDoodles));
    setWorkersCount(addDoodles(workersCount, workers, workersDoodles));
    setSocietyCount(addDoodles(societyCount, society, societyDoodles));

    setDoodles((doodles) => [...doodles, ...doodlesAdded]);
  }, [money, society, workers]);

  // Update the doodles at 60FPS
  useEffect(() => {
    const intervalSpeed = 1000 / 60;
    const intervalId = setInterval(updateDoodle, intervalSpeed);

    return () => clearInterval(intervalId);
  }, [updateDoodle]);

  return (
    <div className={styles.background} style={{ backgroundColor: color }}>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>
      <div className={styles.background__cloud}></div>

      <Image alt="Profit cliff" src={imageIslandMoney} className={styles.background__cliff} />
      <Image alt="Profit cliff" src={imageIslandWorkers} className={styles.background__cliff} />
      <Image alt="Profit cliff" src={imageIslandSociety} className={styles.background__cliff} />

      {doodles.map((doodle, index) => (
        <Image
          alt="Profit doodle"
          key={index}
          src={doodle.doodle.image}
          className={styles.background__suspense__doodle}
          style={{
            zIndex: doodle.index,
            height: `${doodle.doodle.height}px`,
            filter: `brightness(${0.8 + doodle.index * 0.05})`,
            transform: `translate(${doodle.positionX}px, ${doodle.positionY}px) rotate(${doodle.tilt}deg) scale(${
              doodle.index * 0.1 + 0.5
            })`,
          }}
        />
      ))}
    </div>
  );
}
