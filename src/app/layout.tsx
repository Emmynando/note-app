import type { Metadata } from "next";
import IndexTask from "@/components/Layout/AddTask/IndexTask";
import MainSideBar from "@/components/UI/MainSideBar";
import { AddListProvider } from "@/store/AddListProvider";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store/store";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ReduxClientWrapper from "@/components/UI/ReduxClientWrap";

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
      <ReduxClientWrapper>
        <AddListProvider>
          {/* <body className={`${gabarito.variable} antialiased`}> */}
          <body className="overflow-hidden">
            <IndexTask />
            <div className="flex">
              <aside className="w-[20%]">
                <MainSideBar />
              </aside>
              <main className="flex-1">{children}</main>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              closeOnClick={false}
              pauseOnHover
              newestOnTop
            />
          </body>
        </AddListProvider>
      </ReduxClientWrapper>
    </html>
  );
}
