import Link from "next/link";

export default function Dashboard({}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p className="text-lg mb-4">Welcome to the Admin Dashboard!</p>
      <Link
        href="/dashboard/users"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Users
      </Link>
    </div>
  );
}
