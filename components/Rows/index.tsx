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
              Aan de linkerkant zie je de resultaten van het vak Grid & Kleur, waarin ik een website in Figma heb
              ontworpen voor de verkoop van groene energie-opwekkers zoals zonnepanelen, windmolens en batterijopslag.
              Dit project was superleuk, hoewel het wel wat kort was. Ik heb hier voor het eerst geëxperimenteerd met
              Neo-brutalisme en ben echt trots op het eindresultaat.
            </p>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Typografie</h1>

            <p className={styles.main__rows__content__text}>
              Voor het vak Typografie moest ik een website maken om meer te vertellen over een bepaald lettertype; ik
              koos voor Futura. Deze website is een van mijn favorieten geworden. Ik ben vooral trots op hoe ik
              &apos;geëxperimenteerd&apos; heb met het lettertype, en de website heeft een gaaf sci-fi gevoel!{" "}
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
              In Interface & Beweging heb ik een website gemaakt waarbij je in de huid kruipt van een schurk uit
              Scooby-Doo die de Scooby-gang bespioneert. Ik ben tevreden over hoe het is geworden, maar achteraf had ik
              het liever in Next.js geschreven om meer nieuwe vaardigheden te leren. Toch ben ik blij met het
              eindresultaat.
            </p>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Interface & Interactie</h1>

            <p className={styles.main__rows__content__text}>
              Voor Interface & Interactie moesten we drie animaties maken. Ik heb mijn animaties gemaakt in Procreate
              Dreams. Het resultaat is niet super indrukwekkend, vooral als ik bedenk hoeveel tijd ik eraan heb besteed.
              Ik ben er niet per se &apos;ontevreden&apos; mee, maar zou het niet snel aan anderen laten zien... Toch
              was het leerzaam om meer over animatie te leren.
            </p>
          </div>

          <div className={styles.main__rows__row__wrapper}>
            <video className={styles.main__rows__row__wrapper__video} autoPlay muted loop>
              <source src="/vid/Interface & Interactie.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section className={styles.main__rows__row}>
          <div className={styles.main__rows__row__wrapper}>
            <Image src={imageBeeldtaal} alt="Beeldtaal" className={styles.main__rows__row__wrapper__video} />
          </div>

          <div className={styles.main__rows__content}>
            <h1 className={styles.main__rows__content__title}>Beeldtaal</h1>

            <p className={styles.main__rows__content__text}>
              Tot slot heb ik voor Beeldtaal meerdere posters gemaakt. Een van de eindresultaten staat hier links,
              waarbij ik probeer mensen te overtuigen om minder te vervuilen. Ik ben best tevreden met mijn posters,
              maar mijn hart ligt meer bij websites en webdesign - dat zie je waarschijnlijk ook terug in het resultaat.
              Maar het was zeker een interessant vak!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
// https://cssloaders.github.io/
