import Link from "next/link";

export default function Organisasi() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Organisasi</h1>
      <p className="text-lg mb-4">Welcome to the Organisasi Page!</p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
