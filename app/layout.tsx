import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Stony Brook Quant Club",
  description: "Student-led community exploring quantitative finance, analytics, and markets."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <div className="relative min-h-screen bg-midnight text-ice">
          <div className="absolute inset-0 -z-10 bg-grid opacity-40 background-grid" />
          <div className="absolute inset-0 -z-10 bg-radial" />
          <div className="absolute -left-40 top-32 h-72 w-72 rounded-full bg-signal/30 blur-[120px]" />
          <div className="absolute right-0 top-80 h-72 w-72 rounded-full bg-neon/30 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-ember/20 blur-[140px]" />
          <NavBar />
          <main className="noise relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
