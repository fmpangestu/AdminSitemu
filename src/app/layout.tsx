"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./globals.css";
import { navigationItems } from "./types/navigationItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a client component feature, so we need to use it in a client component
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {isDashboardRoute ? (
        <div className="flex flex-col md:flex-row">
          {/* Sidebar - fixed position when scrolling */}
          <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
            <h1 className="text-xl font-bold">Mimin Sitemu</h1>
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-md hover:bg-gray-800"
            >
              {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <aside
            className={`bg-gray-900 text-white p-4 md:fixed md:h-screen md:overflow-y-auto transition-all duration-300 
            ${isSidebarCollapsed ? "md:w-20 " : "md:w-64 "} 
            ${isMobileSidebarOpen ? "fixed inset-0 z-50" : "hidden md:flex"} 
            md:flex md:flex-col md:justify-between`}
          >
            <nav className="relative">
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden absolute top-0 right-0 p-2 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <button
                onClick={toggleSidebar}
                className="hidden md:flex cursor-pointer absolute -right-3 -bottom-10 bg-gray-900 text-white p-1 rounded-full border border-gray-600 hover:bg-gray-800 "
              >
                {isSidebarCollapsed ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>

              <div className="h-12 mb-6 relative">
                {/* Title with absolute positioning */}
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-1000 ease-in-out ${
                    isSidebarCollapsed
                      ? "transform -translate-x-50"
                      : "transform translate-x-0"
                  }`}
                >
                  <h1 className="text-xl font-bold">Mimin Sitemu</h1>
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                    isSidebarCollapsed
                      ? "transform translate-x-0"
                      : "transform -translate-x-50"
                  }`}
                >
                  <h1 className="text-xl font-bold">MS</h1>
                </div>
              </div>
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    (item.path !== "/dashboard" &&
                      pathname?.startsWith(item.path));
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`relative block overflow-hidden p-2 rounded group hover:text-black hover:font-semibold transition duration-300 ${
                          isActive ? "text-black font-semibold" : ""
                        }`}
                      >
                        <span
                          className={`relative z-10 flex transition-all duration-600 ease-in-out ${
                            isSidebarCollapsed
                              ? "justify-center "
                              : "gap-5 items-center transform -translate-x-11"
                          }`}
                        >
                          {<item.icon />}
                          {!isSidebarCollapsed && item.label}
                        </span>
                        <span
                          className={`absolute inset-0 bg-gradient-to-r from-white to-gray-700 transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex relative ">
              <Button
                className={`${
                  isSidebarCollapsed
                    ? "transform translate-x-0 md:flex transition-all duration-1000 ease-in-out"
                    : "transform -translate-x-40 transition-all duration-600 ease-in-out"
                } absolute  mt-6 ml-1.5  items-center text-center justify-center gap-4 rounded-full w-9 bg-red-600 hover:bg-red-700  cursor-pointer`}
              >
                <LogOut />
              </Button>
              <Button
                className={`${
                  isSidebarCollapsed
                    ? "transform -translate-x-40 transition-all duration-600 ease-in-out  "
                    : "md:flex  transition-all duration-1000 ease-in-out"
                }  mt-6 items-center text-center justify-center gap-4 w-full bg-red-600 hover:bg-red-700 transition cursor-pointer`}
              >
                <LogOut />
                <p className="text-sm">Keluar</p>
              </Button>
            </div>
          </aside>

          {/* Main Content - add left padding on medium screens to account for fixed sidebar */}
          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
            }`}
          >
            {children}
          </main>
        </div>
      ) : (
        // For non-dashboard routes, just render the children without sidebar
        <main>{children}</main>
      )}
    </>
  );
}
