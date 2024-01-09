"use client";

import styles from "./page.module.scss";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";

import LandingForm from "../components/Landing/Form";
import LandingSteps from "../components/Landing/Steps";
import LandingHeader from "../components/Landing/Header";
import LandingIntro from "../components/Landing/Intro";
import LandingMission from "@/components/Landing/Mission";
import LandingBenefits from "../components/Landing/Benefits";
import LandingNavigation from "../components/Landing/Navigation";

export default function Home() {
  return (
    <ParallaxProvider>
      <LandingNavigation
        items={[
          {
            href: "#intro",
            title: "Presently",
          },
          {
            href: "#benefits",
            title: "Voordelen",
          },
          {
            href: "#steps",
            title: "Stappen",
          },
          {
            href: "#mission",
            title: "Missie",
          },
          {
            href: "#contact",
            title: "Contact",
          },
          {
            href: "/applicatie",
            title: "Naar dashboard",
          },
        ]}
      />

      <LandingHeader />

      <main className={styles.main}>
        <section className={styles.main__section} id="intro">
          <Parallax speed={-8}>
            <LandingIntro
              title="Maak communicatie in school kinderspel met Presently"
              subtitle="Een eenvoudig narrowcasting systeem ontworpen voor scholen om informatie via schermen te delen!"
              content="Upload eenvoudig je PowerPoint-diavoorstellingen, beheer de weergave op verschillende schermen en hou je schoolomgeving betrokken met digitale mededelingenborden"
              className={styles.main__section__leveled}
            />
          </Parallax>
        </section>

        <section className={styles.main__section} id="benefits">
          <Parallax speed={-8}>
            <LandingBenefits
              benefits={[
                {
                  alt: "Een hand die vingers knipt",
                  icon: "/icons/snap.png",
                  title: "Gemakkelijk",
                  description:
                    "Vanaf elke locatie stuur je 24/7 met een eenvoudige web interface meerdere informatieschermen aan in groepen of individueel. Op afstand kies je bijvoorbeeld je eigen afspeelsnelheid en zie je de status van de schermen",
                },
                {
                  alt: "Een scherm met kleurrijke pixels",
                  icon: "/icons/screen.png",
                  title: "Persoonlijk",
                  description:
                    "Wij kunnen je helpen met een PowerPoint template in je eigen huisstijl, zodat je ouders, leerlingen of je team up-to-date blijven. Met deze template pas je snel en eenvoudig de dia’s aan en hou je een persoonlijke touch.",
                },
                {
                  alt: "Een timer met 10 minuten",
                  icon: "/icons/10-minutes.png",
                  title: "Bespaar tijd",
                  description:
                    "Met Presently en een template maakt iedereen supersnel een PowerPoint die binnen enkele seconden live draait, en op ingestelde tijden alle schermen aan- en uitzet.",
                },
                {
                  alt: "Een hand die een schild vasthoudt",
                  icon: "/icons/shield.png",
                  title: "Betrouwbaar",
                  description:
                    "Ervaar een stabiel systeem dat altijd doet wat het moet doen en soepel blijft werken.",
                },
                {
                  alt: "Een rekenmachine, geld en een kalender",
                  icon: "/icons/monthly.png",
                  title: "Budgetvriendelijk",
                  description:
                    "Een betaalbare energiezuinige oplossing die naadloos aansluit bij de behoeften van basisscholen. Het enige wat nodig is, is stroom, WiFi en/of een internetbekabeling.",
                },
              ]}
            />
          </Parallax>
        </section>

        <section className={styles.main__section} id="steps">
          <Parallax speed={-8}>
            <LandingSteps
              steps={[
                "Tijdens ons eerste contact kunnen wij je meer vertellen over Presently en de mogelijkheden",
                "Je krijgt toegang tot een demonstratie omgeving, zodat je de web-interface kunt uit proberen",
                "Wij adviseren over de aan te schaffen scherm(en)",
                "Wij kunnen langskomen om de benodigde hardware te verbinden aan de schermen",
                "Gebruikers kunnen inloggen via een internetbrowser (met een Google-account of e-mail) en wij linken deze gebruikers aan het systeem",
                "Wil je al je diavoorstelling in je eigen huisstijl? Wij kunnen helpen met het ontwerpen van een PowerPoint template",
              ]}
              className={styles.main__section__leveled}
            />
          </Parallax>
        </section>

        <section className={styles.main__section} id="mission">
          <Parallax speed={-8}>
            <LandingMission
              title="Missie"
              content="Met Presently willen we narrowcasting eenvoudig, betrouwbaar en betaalbaar maken, zodat het toegankelijk is voor scholen met een beperkt budget"
            />
          </Parallax>
        </section>

        <section className={styles.main__section} id="contact">
          <Parallax speed={-8}>
            <LandingForm
              quoteTitle="Offerte aanvragen"
              quoteContent="Interesse in een offerte? Vul je gegevens hieronder in en wij zullen binnen 48 uur contact met je opnemen om de mogelijkheden te bespreken."
              questionTitle="Vraag stellen"
              questionContent="Heb je een vraag over Presently? Aarzel niet en vul hieronder je gegevens in. Wij zorgen ervoor dat je binnen 48 uur de nodige ondersteuning ontvangt."
              className={styles.main__section__leveled}
            />
          </Parallax>
        </section>

        <section className={styles.main__section}>
          <p>
            Made with ❤️ by{" "}
            <a href="https://sjorsvanholst.nl">Sjors van Holst</a>
          </p>
        </section>
      </main>
    </ParallaxProvider>
  );
}
