import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import SideBar from "./utils/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mahasiswa Center",
  description:
    "Boost produktivitasmu! Kelola tugas, catatan, dan jadwal harian dengan gaya yang keren dan simpel.",
};

export default function RootLayout({ children }) {
  return (
    <html className="hydrated" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>

        <main className="flex-1 bg-neutral-100">{children}</main>
      </body>
    </html>
  );
}
