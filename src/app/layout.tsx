import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import IndexTask from "@/components/Layout/AddTask/IndexTask";
import MainSideBar from "@/components/UI/MainSideBar";
import { AddListProvider } from "@/store/AddListProvider";

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
      <AddListProvider>
        {/* <body className={`${gabarito.variable} antialiased`}> */}
        <body className="overflow-hidden">
          <IndexTask />
          <div className="flex">
            <aside className="w-[30%]">
              <MainSideBar />
            </aside>
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </AddListProvider>
    </html>
  );
}
