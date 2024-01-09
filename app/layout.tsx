import "./layout.scss";

import { Metadata } from "next";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

import EmojiPreloader from "@/components/Emoji/Preloader";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Guide your own company!",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlausibleProvider
      domain="meesterproef.sjorsvanholst.nl"
      enabled={true}
      selfHosted={true}
      customDomain="https://plausible.hedium.nl"
    >
      <html lang="en">
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

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Open+Sans:wght@400;600&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          {children}
          <EmojiPreloader />
        </body>
      </html>
    </PlausibleProvider>
  );
}
