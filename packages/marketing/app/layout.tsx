import { Footer, Navbar } from "./components/compounds";
import { fonts } from "./fonts";
import "./globals.scss";

export const metadata = {
  title: "Recast",
  description: "Build components once. Use everywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fonts.mono.variable} ${fonts.sans.variable} font-mono flex flex-col h-screen`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
