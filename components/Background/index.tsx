import styles from "./Background.module.scss";

import { numberBetween, floatBetween } from "@/helper";
import { DoodleImage, DoodleProperties } from "./_types";
import { useEffect, useState, useCallback } from "react";
import { moneyDoodles, workersDoodles, societyDoodles, cloudDoodles, cmdDoodles } from "./_doodles";

import imageIslandMoney from "@/public/background/islands/money.png";
import imageIslandSociety from "@/public/background/islands/society.png";
import imageIslandWorkers from "@/public/background/islands/workers.png";

import Image from "next/image";

type BackgroundProps = {
  color?: string;
  cmd?: number;
  money?: number;
  clouds?: number;
  society?: number;
  workers?: number;
  spread?: boolean;
  islands?: boolean;
  completed?: boolean;
};

// TODO: Cleanup this entire component
// - Add aspect ratio to clouds so they can loop properly
// - Make sure the random cloud placement is evenly distributed
// - Make sure the random item placement is evenly distributed
// - Remove properties like mirrored, rotatable, transparent and use something like isCloud
// - Refactor style object to a function or something

export default function Background({
  color,
  cmd = 0,
  money = 0,
  clouds = 25,
  society = 0,
  workers = 0,
  spread = false,
  islands = true,
  completed = false,
}: BackgroundProps) {
  const [doodles, setDoodles] = useState<DoodleProperties[]>([]);

  const [cmdCount, setCmdCount] = useState<number>(0);
  const [cloudCount, setCloudCount] = useState<number>(0);
  const [moneyCount, setMoneyCount] = useState<number>(0);
  const [societyCount, setSocietyCount] = useState<number>(0);
  const [workersCount, setWorkersCount] = useState<number>(0);

  const updateDoodle = useCallback(() => {
    setDoodles((doodles) =>
      doodles.map((doodle) => {
        // Loop the doodle back to the top if it's out of the screen
        const positionYNext = doodle.positionY + doodle.speedY;
        const positionYOverflow = positionYNext > window.innerHeight;
        const positionY = positionYOverflow ? -doodle.doodle.height : positionYNext;

        const positionXNext = doodle.positionX + doodle.speedX;
        const positionXOverflow = positionXNext > window.innerWidth;
        const positionX = positionXOverflow ? -500 : positionXNext;

        return {
          ...doodle,
          positionY,
          positionX,
        };
      }),
    );
  }, []);

  useEffect(() => {
    const doodlesAdded: DoodleProperties[] = [];

    // Generate more doodles if the count increases
    const addDoodles = (currentCount: number, targetCount: number, doodleArray: DoodleImage[], cloud: boolean) => {
      for (let i = currentCount; i < targetCount; i++) {
        const randomIndex = numberBetween(0, doodleArray.length - 1);
        const randomDoodle = doodleArray[randomIndex];

        // Base the speed on the index of the doodle
        const index = cloud ? numberBetween(0, 5) : numberBetween(0, 4);
        const speedY = index + 4 + floatBetween(-2, 2);
        const speedX = index / 2 + 1 + floatBetween(-1, 1);

        doodlesAdded.push({
          tilt: numberBetween(-30, 30),
          index,
          doodle: randomDoodle,
          speedX: cloud ? speedX : 0,
          speedY: !cloud ? speedY : 0,
          mirrored: !!numberBetween(0, 1),
          rotatable: !cloud,
          transparent: cloud,

          // Randomize the position of the doodle on the screen
          positionX: Math.random() * window.innerWidth,
          positionY: cloud
            ? window.innerHeight * floatBetween(0.95, 1.05) - randomDoodle.height
            : spread
              ? window.innerHeight * Math.random()
              : -randomDoodle.height,
        });
      }

      return targetCount;
    };

    setCmdCount(addDoodles(cmdCount, cmd, cmdDoodles, false));
    setCloudCount(addDoodles(cloudCount, clouds, cloudDoodles, true));
    setMoneyCount(addDoodles(moneyCount, money, moneyDoodles, false));
    setWorkersCount(addDoodles(workersCount, workers, workersDoodles, false));
    setSocietyCount(addDoodles(societyCount, society, societyDoodles, false));

    setDoodles((doodles) => [...doodles, ...doodlesAdded]);
  }, [cmd, clouds, money, society, workers]);

  // Update the doodles at 60FPS
  useEffect(() => {
    const intervalSpeed = 1000 / 60;
    const intervalId = setInterval(updateDoodle, intervalSpeed);

    return () => clearInterval(intervalId);
  }, [updateDoodle]);

  return (
    <div className={styles.background} style={{ backgroundColor: color }}>
      {islands && (
        <>
          <Image
            alt="Profit island"
            src={imageIslandMoney}
            style={{ bottom: `${completed ? -600 : -300 + money * 5}px` }}
            className={styles.background__island}
          />

          <Image
            alt="Profit island"
            src={imageIslandWorkers}
            style={{ bottom: `${completed ? -600 : -300 + workers * 5}px` }}
            className={styles.background__island}
          />

          <Image
            alt="Profit island"
            src={imageIslandSociety}
            style={{ bottom: `${completed ? -600 : -300 + society * 5}px` }}
            className={styles.background__island}
          />
        </>
      )}

      {doodles.map((doodle, index) => (
        <Image
          alt="Profit doodle"
          key={index}
          src={doodle.doodle.image}
          className={styles.background__suspense__doodle}
          style={{
            zIndex: doodle.index,
            height: `${doodle.doodle.height}px`,
            filter: `brightness(${doodle.transparent ? 1 : 0.8 + doodle.index * 0.05})`,
            opacity: doodle.transparent ? 0.4 + doodle.index * 0.1 : 1,
            transform: `translate(${doodle.positionX}px, ${doodle.positionY}px) rotate(${
              doodle.rotatable ? doodle.tilt : 0
            }deg) scale(${doodle.index * 0.1 + 0.5}) ${doodle.mirrored ? "scaleX(-1)" : ""}`,
          }}
        />
      ))}
    </div>
  );
}
