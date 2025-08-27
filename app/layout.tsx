import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components";

export const metadata: Metadata = {
  title: "Trello clone",
  description: "Trello clone built with Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="dark bg-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
