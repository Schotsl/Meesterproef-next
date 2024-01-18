"use client";

import styles from "./Intro.module.scss";

import imageBeeldtaal from "@/public/vid/Beeldtaal.png";

import Background from "@/components/Background";
import Image from "next/image";

export default function Rows() {
  return (
    <main className={styles.main}>
      <Background color={"#fff021"} cmd={50} clouds={0} spread={true} islands={false} />

      <div className={styles.main__rows}>
        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__row__wrapper}>
            <video className={styles.main__rows__row__wrapper__video} autoPlay muted loop>
              <source src="/vid/Grid & Kleur.mov" type="video/mp4" />
            </video>
          </div>

          <div className={styles.main__rows__row__content}>
            <h1 className={styles.main__rows__row__content__title}>Grid & Kleur</h1>

            <p className={styles.main__rows__row__content__text}>
              De meesterproef is een onderzoek naar de toekomst van de Nederlandse journalistiek. We hebben onderzocht
              hoe de journalistiek kan veranderen om de toekomst te overleven.
            </p>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Typografie</h1>

            <p className={styles.main__rows__content__text}>
              De meesterproef is een onderzoek naar de toekomst van de Nederlandse journalistiek. We hebben onderzocht
              hoe de journalistiek kan veranderen om de toekomst te overleven.
            </p>
          </div>

          <div className={styles.main__rows__row__wrapper}>
            <video className={styles.main__rows__row__wrapper__video} autoPlay muted loop>
              <source src="/vid/Typografie.mov" type="video/mp4" />
            </video>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__row__wrapper}>
            <video className={styles.main__rows__row__wrapper__video} autoPlay muted loop>
              <source src="/vid/Interface & Beweging.mov" type="video/mp4" />
            </video>
          </div>

          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Interface & Beweging</h1>

            <p className={styles.main__rows__content__text}>
              De meesterproef is een onderzoek naar de toekomst van de Nederlandse journalistiek. We hebben onderzocht
              hoe de journalistiek kan veranderen om de toekomst te overleven.
            </p>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Interface & Interactie</h1>

            <p className={styles.main__rows__content__text}>
              De meesterproef is een onderzoek naar de toekomst van de Nederlandse journalistiek. We hebben onderzocht
              hoe de journalistiek kan veranderen om de toekomst te overleven.
            </p>
          </div>

          <div className={styles.main__rows__row__wrapper}>
            <video className={styles.main__rows__row__wrapper__video} autoPlay muted loop>
              <source src="/vid/Interface & Interactie.mov" type="video/mp4" />
            </video>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__row__wrapper}>
            <Image src={imageBeeldtaal} alt="Beeldtaal" className={styles.main__rows__row__wrapper__video} />
          </div>

          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Interface & Beweging</h1>

            <p className={styles.main__rows__content__text}>
              De meesterproef is een onderzoek naar de toekomst van de Nederlandse journalistiek. We hebben onderzocht
              hoe de journalistiek kan veranderen om de toekomst te overleven.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
// https://cssloaders.github.io/
