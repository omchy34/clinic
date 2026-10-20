import type { Metadata } from "next";
import { Fraunces, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

   const fraunces = Fraunces({
     subsets: ["latin"],
     variable: "--font-fraunces",
     display: "swap",
   });

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apana Clinic — Care that keeps pace with you",
  description:
    "Apana Clinic offers multi-specialty and surgical care with same-week appointments, led by a team you can actually reach.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink font-body antialiased">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}