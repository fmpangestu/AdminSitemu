"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./globals.css";
import { navigationItems } from "./types/navigationItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { LoadingIndicator } from "@/components/loaderUI";
import { useRouter } from "next/navigation";

function AuthSynchronizer() {
  useEffect(() => {
    // Sinkronkan token dari localStorage ke cookie untuk middleware
    const syncAuthState = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
      } else {
        document.cookie =
          "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    };

    // Jalankan saat komponen mount
    syncAuthState();

    // Tambahkan event listener untuk storage changes (jika user logout di tab lain)
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  return null;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthSynchronizer />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleSidebar = (e?: { stopPropagation: () => void }) => {
    if (e) e.stopPropagation();
    setTimeout(() => {
      setIsSidebarCollapsed((prev) => !prev);
    }, 10);
  };
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {isDashboardRoute ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-blue-700 to-sky-500 text-white p-4">
            <h1 className="text-xl font-bold">Mimin Sitemu</h1>
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <aside
            className={`bg-gradient-to-r from-blue-700 to-sky-500 text-white p-4 md:fixed md:h-screen md:overflow-y-auto transition-all duration-300 
            ${isSidebarCollapsed ? "md:w-20 " : "md:w-64 "} 
            ${isMobileSidebarOpen ? "fixed inset-0 z-50" : "hidden md:flex"} 
            md:flex md:flex-col md:justify-between`}
          >
            <nav className="relative">
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden cursor-pointer z-[60]  absolute top-0 right-0 p-2 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
                className="hidden md:flex cursor-pointer absolute -right-3 -bottom-10 bg-gradient-to-r from-blue-700 to-sky-500 text-white p-1 rounded-full border border-blue-600 hover:bg-blue-800 "
              >
                {isSidebarCollapsed ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>

              <div className="h-12 mb-6 relative">
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-1000 ease-in-out ${
                    isSidebarCollapsed
                      ? "md:transform -translate-x-50"
                      : "md:transform translate-x-0"
                  }`}
                >
                  <h1 className="text-xl font-bold">Mimin Sitemu</h1>
                </div>
                <div
                  className={`absolute inset-0 hidden md:flex items-center justify-center transition-all duration-1000 ease-in-out ${
                    isSidebarCollapsed
                      ? "md:transform translate-x-0"
                      : "md:transform -translate-x-50"
                  }`}
                >
                  <h1 className="text-xl italic font-bold">MS</h1>
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
                        className={`relative block overflow-hidden p-2 rounded group hover:text-blue-700 hover:font-semibold transition duration-300 ${
                          isActive ? "text-blue-700 font-semibold" : ""
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
                          className={`absolute inset-0 bg-gradient-to-r from-white to-sky-500 transition-all duration-300 ${
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
                onClick={() => {
                  localStorage.removeItem("authToken");
                  document.cookie =
                    "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                  router.push("/");
                }}
                className={`${
                  isSidebarCollapsed
                    ? "transform -translate-x-40 transition-all duration-600 ease-in-out"
                    : "md:flex transition-all duration-1000 ease-in-out"
                } mt-6 items-center text-center justify-center gap-4 w-full bg-red-600 hover:bg-red-700 transition cursor-pointer`}
              >
                <LogOut />
                <p className="text-sm">Keluar</p>
              </Button>
            </div>
          </aside>

          <main
            className={`relative flex-1 p-6 transition-all duration-300 ${
              isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
            }`}
          >
            {children}
            <LoadingIndicator />
          </main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
