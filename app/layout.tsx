import "./layout.scss";

import { cookies } from "next/headers";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

import EmojiPreloader from "@/components/Emoji/Preloader";
import QuestionProvider from "@/context/QuestionContext";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Guide your own company!",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookie = cookies();

  // const targetCookies = cookie.get("target");
  // const answersCookies = cookie.get("answers");
  // const questionsCookies = cookie.get("questions");

  // const targetParsed = targetCookies ? parseInt(targetCookies.value) : 0;
  // const answersParsed = answersCookies ? JSON.parse(answersCookies.value) : [];
  // const questionsParsed = questionsCookies ? JSON.parse(questionsCookies.value) : [];

  return (
    <QuestionProvider initialTarget={0} initialAnswers={[]} initialQuestions={[]}>
      <PlausibleProvider
        domain="meesterproef.sjorsvanholst.nl"
        enabled={true}
        selfHosted={true}
        customDomain="https://plausible.hedium.nl"
      >
        <html lang="en" className={poppins.className}>
          <head>
            {/* 
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" /> 
          */}
          </head>
          <body>
            {children}
            <EmojiPreloader />
          </body>
        </html>
      </PlausibleProvider>
    </QuestionProvider>
  );
}
