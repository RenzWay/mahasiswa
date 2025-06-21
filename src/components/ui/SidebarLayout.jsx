"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLayout({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // hanya set saat client
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const hideSidebar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/auth");

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className=" min-h-screen">
      <SidebarProvider>
        {!hideSidebar && <AppSidebar />}
        <main className="flex-1 dark:bg-gray-950 dark:text-gray-50">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
