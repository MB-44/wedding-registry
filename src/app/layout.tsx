import type, { Metadata } from "next";
import NAVIGATION_BAR from "./components/navBar/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Registry",
  description: "Spa ceylon, Sri Lanka"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <NAVIGATION_BAR/>
        <main>{children}</main>
      </body>
    </html>
  );
}