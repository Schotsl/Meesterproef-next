import "./layout.scss";

import { Metadata } from "next";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

import EmojiPreloader from "@/components/Emoji/Preloader";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Presently",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlausibleProvider
      domain="presently.dev"
      enabled={true}
      selfHosted={true}
      customDomain="https://plausible.hedium.nl"
    >
      <html lang="en">
        <head>
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
        </head>
        <body>
          {children}
          <EmojiPreloader />
        </body>
      </html>
    </PlausibleProvider>
  );
}
