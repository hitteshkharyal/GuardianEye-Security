import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GuardianEye Security — See Everything. Miss Nothing.",
  description:
    "AI-powered surveillance solutions engineered for modern security. Premium CCTV installation, remote monitoring, smart security, and enterprise infrastructure.",
  keywords:
    "CCTV installation, AI surveillance, security cameras, remote monitoring, smart security, GuardianEye",
  openGraph: {
    title: "GuardianEye Security — See Everything. Miss Nothing.",
    description:
      "AI-powered surveillance solutions engineered for modern security.",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-white font-space antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
