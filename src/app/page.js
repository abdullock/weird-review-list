// src/app/page.jsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to the Products Dashboard
      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Click below to view all products scraped from the backend.
      </p>

      <Link href="/products">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Products
        </button>
      </Link>
    </main>
  );
}
