"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/amazon_data.json"); // <-- Load JSON from public folder
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
    <>
    <Header />
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
                  <span className="font-semibold">SKU:</span>{" "}
                  {/* You can add SKU mapping here */}
                  {getSKU(product.ASIN)}
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
    </>
    
  );
}
/* ✅ SKU mapping function */
function getSKU(productID) {
  const skuMap = {
    B0B919D52V: "WW-TL-108",
    B0BXT1HKF4: "WW-TL-011",
    B0D8Q3Z8QL: "WW-TL-015",
    B0F678285F: "WW-IK-200-B",
    B0F4MZBC74: "WW-IK-008-B",
    B0DRL3YW3G: "WW-IK-100-A",
    B0F9Y8TDZW: "WW-IK-100-B2",
    B0F4MWK1PQ: "WW-IK-005-B",
    B0DRLDTRFP: "WW-IK-150-A",
    B0F9Y3RBL5: "WW-IK-150-B2",
    B0DFWBT7B9: "WW-MR-052-1",
    B0DFWDZ3B3: "WW-MR-053",
    B0C3XV4CGJ: "WW-MR-043",
    B0D8449YD5: "WW-MR-051-1",
    B0CFLG25Y5: "WW-MR-045",
    B0CJ52B5TK: "WW-MR-047",
    B0DRLCTB7T: "WW-MR-047-A",
    B0CF598GJG: "WW-MR-042",
    B0DRL99KSB: "WW-MR-042-A",
    B0F5WX93PH: "WW-MR-060",
    B0FCMV3DBM: "WW-MR-060-A",
    B0DBDZ7CDS: "WW-MR-043-PK02",
    B0D7CZJ533: "WW-MR-044"

  };

  return skuMap[productID] || "N/A";
}
