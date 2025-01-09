import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/UI/sidebar";

const geistSans = Geist({
  variable: "--font-gabarito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="flex">
          <aside className="w-[30%]">
            <Sidebar />
          </aside>
          <main className="flex-1 p-4 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
