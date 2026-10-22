import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Quicksand } from "next/font/google";
import "./globals.css";

const body = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFE4EF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "OUR JOURNAL · FOREVER US",
  description:
    "Dear Kashvi, congratulations on surviving 24 years of being you.",
  applicationName: "OUR JOURNAL",
  authors: [{ name: "Vaidehi" }],
  robots: {
    index: false,
    follow: false,
  },
  appleWebApp: {
    capable: true,
    title: "OUR JOURNAL",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    title: "OUR JOURNAL · FOREVER US",
    description: "a little scrapbook just for you, Kashu ♡",
    siteName: "OUR JOURNAL",
  },
  twitter: {
    card: "summary",
    title: "OUR JOURNAL · FOREVER US",
    description: "a little scrapbook just for you, Kashu ♡",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${hand.variable} ${display.variable} h-full overflow-hidden antialiased`}
    >
      <body className="flex h-full flex-col overflow-hidden">{children}</body>
    </html>
  );
}
