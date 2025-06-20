import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
    <html
      data-theme="dark"
      suppressHydrationWarning
      className="hydrated "
      lang="en"
    >
      <head>
        <link rel="manifest" href="/app.webmanifest" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>

        <main className="flex-1 dark:bg-gray-950 dark:text-gray-50">
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
