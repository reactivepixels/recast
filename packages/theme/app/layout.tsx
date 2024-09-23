import "./globals.css";

import { DM_Sans, Fira_Code } from "next/font/google";

import type { Metadata } from "next";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Recast Kit",
  description: "Recast default components and theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
