import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import SidebarLayout from "@/components/ui/SidebarLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
    <html lang="en" suppressHydrationWarning className="hydrated">
      <head>
        <link rel="icon" href="/scholar.svg" />
        <link rel="manifest" href="/app.webmanifest" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarLayout>{children}</SidebarLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
