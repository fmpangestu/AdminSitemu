import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Komponen wrapper dengan Suspense
export function LoadingIndicator() {
  return (
    <Suspense fallback={null}>
      <LoadingContent />
    </Suspense>
  );
}

// Komponen yang berisi implementasi asli
function LoadingContent() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    setIsLoading(true);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="absolute w-auto md:ml-4 h-screen inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
}
