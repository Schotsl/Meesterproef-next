import { StaticImageData } from "next/image";
import { DoodleImage } from "./_types";

import imageProfitFirst from "@/public/background/profit/1.png";
import imageProfitSecond from "@/public/background/profit/2.png";
import imageProfitThird from "@/public/background/profit/3.png";
import imageProfitFourth from "@/public/background/profit/4.png";

import imageSocietyFirst from "@/public/background/society/1.png";
import imageSocietySecond from "@/public/background/society/2.png";
import imageSocietyThird from "@/public/background/society/3.png";
import imageSocietyFourth from "@/public/background/society/4.png";

import imageWorkersFirst from "@/public/background/workers/1.png";
import imageWorkersSecond from "@/public/background/workers/2.png";
import imageWorkersThird from "@/public/background/workers/3.png";
import imageWorkersFourth from "@/public/background/workers/4.png";

export const moneyDoodles: DoodleImage[] = [
  {
    image: imageProfitFirst,
    height: 56,
  },
  {
    image: imageProfitSecond,
    height: 48,
  },
  {
    image: imageProfitThird,
    height: 64,
  },
  {
    image: imageProfitFourth,
    height: 48,
  },
];

export const societyDoodles: DoodleImage[] = [
  {
    image: imageSocietyFirst,
    height: 64,
  },
  {
    image: imageSocietySecond,
    height: 64,
  },
  {
    image: imageSocietyThird,
    height: 64,
  },
  {
    image: imageSocietyFourth,
    height: 64,
  },
];

export const workersDoodles: DoodleImage[] = [
  {
    image: imageWorkersFirst,
    height: 64,
  },
  {
    image: imageWorkersSecond,
    height: 64,
  },
  {
    image: imageWorkersThird,
    height: 64,
  },
  {
    image: imageWorkersFourth,
    height: 64,
  },
];
