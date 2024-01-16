import styles from "./Background.module.scss";

import { useEffect, useState, useCallback } from "react";
import { moneyDoodles } from "./_doodles";
import { DoodleProperties } from "./_types";
import { numberBetween, floatBetween } from "@/helper";

import imageCliffFirst from "@/public/background/cliff.png";

import Image from "next/image";

type BackgroundProps = {
  color?: string;
  money?: number;
};

export default function Background({ color, money = 0 }: BackgroundProps) {
  const [doodles, setDoodles] = useState<DoodleProperties[]>([]);

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
    for (let i = doodles.length; i < money; i++) {
      const randomIndex = numberBetween(0, moneyDoodles.length - 1);
      const randomDoodle = moneyDoodles[randomIndex];

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

    setDoodles((doodles) => [...doodles, ...doodlesAdded]);
  }, [money]);

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

      <Image alt="Profit cliff" src={imageCliffFirst} className={styles.background__cliff} />

      {/* <div className={styles.background__suspense}> */}
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
      {/* </div> */}
    </div>
  );
}
