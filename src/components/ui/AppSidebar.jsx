import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Home,
  Inbox,
  Settings,
  Calendar,
  NotebookText,
} from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const menu = [
    {
      name: "Dashboard",
      loc: "/pages",
      icon: LayoutDashboard,
    },
    {
      name: "Tugas",
      loc: "/pages/tugas",
      icon: Inbox,
    },
    {
      name: "Catatan",
      loc: "/pages/catatan",
      icon: NotebookText,
    },
    {
      name: "Setting",
      loc: "/pages/setting",
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-center font-bold text-2xl text-zinc-600">
          Mahasiswa Center
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((row) => (
                <SidebarMenuItem key={row.name}>
                  <SidebarMenuButton asChild>
                    <Link href={row.loc} className="flex items-center gap-2">
                      <row.icon className="w-4 h-4" />
                      {row.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
