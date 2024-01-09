import styles from "./EmojiPreloader.module.scss";

import Image from "next/image";

export default function EmojiPreloader() {
  const emojiNames = [
    "disappointed-face",
    "face-with-open-mouth",
    "face-with-raised-eyebrow",
    "face-with-spiral-eyes",
    "fax-machine",
    "file-folder",
    "gear",
    "wastebasket",
    "shaking-face",
    "pensive-face",
    "partying-face",
    "party-popper",
    "open-file-folder",
    "information",
  ];

  return (
    <ul className={styles.preloader}>
      {emojiNames.map((emojiName) => {
        return (
          <li key={emojiName}>
            <Image
              alt={`Preloading ${emojiName} emoji`}
              src={`/emojis/${emojiName}.png`}
              width={72}
              height={72}
              loading="eager"
            />
          </li>
        );
      })}
    </ul>
  );
}
