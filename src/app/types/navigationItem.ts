import { LayoutGrid, Building, Newspaper, Award, Album } from "lucide-react";
import { NavigationItem } from "./index";

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Organisasi",
    path: "/dashboard/organisasi",
    icon: Building,
  },
  // Add more navigation items as needed
  {
    label: "Berita",
    path: "/dashboard/berita",
    icon: Newspaper,
  },
  {
    label: "Prestasi",
    path: "/dashboard/prestasi",
    icon: Award,
  },
  {
    label: "Galeri",
    path: "/dashboard/galeri",
    icon: Album,
  },
];
