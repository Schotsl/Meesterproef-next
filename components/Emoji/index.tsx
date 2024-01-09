import styles from "./Emoji.module.scss";

import Image from "next/image";

type EmojiProps = {
  emoji: string;
};

export default function Emoji({ emoji }: EmojiProps) {
  let value = "pensive-face";

  switch (emoji) {
    case "📠":
      value = "fax-machine";
      break;
    case "🎉":
      value = "party-popper";
      break;
  }

  return (
    <Image
      src={`/emojis/${value}.png`}
      alt={emoji}
      width={72}
      height={72}
      className={styles.emoji}
    />
  );
}
