"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Amazon Products", path: "/products" },
    { name: "Flipkart Products", path: "/flipkart" },
  ];

  return (
    <header className="bg-gray-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Weird Wolf Dashboard</h1>

        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium ${
                pathname === item.path
                  ? "text-sky-600 border-b-2 border-sky-600"
                  : "text-white hover:text-sky-600"
              } transition`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
