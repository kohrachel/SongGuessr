import { Sun, Leaf, Droplets, Wind, Candy } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Sunlight",
    url: "/",
    icon: Sun,
  },
  {
    title: "Chlorophyll",
    url: "/second",
    icon: Leaf,
  },
  {
    title: "Water",
    url: "/third",
    icon: Droplets,
  },
  {
    title: "Carbon Dioxide",
    url: "/fourth",
    icon: Wind,
  },
  {
    title: "Glucose",
    url: "/fifth",
    icon: Candy,
  },
  {
    title: "Oxygen",
    url: "/sixth",
    icon: Wind,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-950">
      <SidebarContent className="bg-purple-950 pl-1 pt-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-md text-white">
            SongGuessr
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center text-white">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
