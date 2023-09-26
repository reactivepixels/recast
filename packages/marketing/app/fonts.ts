import { IBM_Plex_Sans, PT_Mono } from "next/font/google";

const mono = PT_Mono({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const sans = IBM_Plex_Sans({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fonts = {
  mono,
  sans,
};
