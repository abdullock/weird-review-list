"use client";

import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products_data.json"); // <-- Load JSON from public folder
        const data = await res.json();
        setProductsData(data);
      } catch (err) {
        console.error("Failed to load products JSON:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!productsData || Object.keys(productsData).length === 0)
    return <div>No products available</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Amazon Products Review Listing
      </h1>

      {/* Loop through categories */}
      {Object.keys(productsData).map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 capitalize text-black">
            {category.replace("_", " ")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData[category].map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transition"
              >
                <h3 className="text-lg font-semibold text-sky-600">
                  {product.Title || "N/A"}
                </h3>
                <p className="text-gray-500">
                  <span className="font-semibold">ASIN:</span> {product.ASIN}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Rating:</span> {product.Rating}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Reviews:</span>{" "}
                  {product["Review Count"]}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Sponsored:</span>{" "}
                  {product.Sponsored}
                </p>
                <p className="text-gray-400 mt-2">
                  <span className="font-semibold">Index:</span> {product.Index}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
