import { StaticImageData } from "next/image";
import { DoodleImage } from "./_types";

import imageProfitFirst from "@/public/background/profit/1.png";
import imageProfitSecond from "@/public/background/profit/2.png";
import imageProfitThird from "@/public/background/profit/3.png";
import imageProfitFourth from "@/public/background/profit/4.png";

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
