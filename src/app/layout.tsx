import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/UI/sidebar";
import IndexTask from "@/components/Layout/AddTask/IndexTask";

const gabarito = localFont({
  src: "../fonts/Gabarito-Regular.ttf",
  variable: "--font-gabarito",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Note App",
  description: "Note app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${gabarito.variable} antialiased`}> */}
      <body className="overflow-hidden">
        <IndexTask />
        <div className="flex">
          <aside className="w-[30%]">
            <Sidebar />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
