import type { Metadata } from "next";
import { Gentium_Book_Plus } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/context/Provider";
import { Analytics } from "@vercel/analytics/react";
import { i18n, type Locale } from "../../../i18n-config";

const gentiumBookPlus = Gentium_Book_Plus({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-gentium-book-plus",
});

export const metadata: Metadata = {
  title: "IL Portfolio",
  description: "Portfolio of Ingrid Lima",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={gentiumBookPlus.className + " bg-bgWhite dark:bg-bgBlack"}
        style={{ overflowX: "hidden" }}
      >
        <Providers lang={lang}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
