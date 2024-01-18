import { StaticImageData } from "next/image";

export type DoodleImage = {
  image: StaticImageData;
  height: number;
};

export type DoodleProperties = {
  tilt: number;
  index: number;
  doodle: DoodleImage;
  speedX: number;
  speedY: number;
  mirrored: boolean;
  transparent: boolean;
  positionX: number;
  positionY: number;
  rotatable: boolean;
};
