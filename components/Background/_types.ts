import { StaticImageData } from "next/image";

export type DoodleImage = {
  image: StaticImageData;
  height: number;
};

export type DoodleProperties = {
  tilt: number;
  speed: number;
  index: number;
  doodle: DoodleImage;
  positionX: number;
  positionY: number;
};
