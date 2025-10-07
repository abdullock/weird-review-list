"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

export default function FlipkartPage() {
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/flipkart_products.json"); // <-- JSON file from public folder
        const data = await res.json();
        setProductsData(data);
      } catch (err) {
        console.error("Failed to load Flipkart JSON:", err);
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
        Flipkart Products Listing
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
                  <span className="font-semibold">Product ID:</span>{" "}
                  {product.ProductID}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Price:</span> {product.Price}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Reviews:</span>{" "}
                  {product.Reviews}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Stars:</span>{" "}
                  {product.Stars.join(" / ")}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">SKU:</span>{" "}
                  {/* You can add SKU mapping here */}
                  {getSKU(product.ProductID)}
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
    EIKH4BFDPNGEWQMQ: "WW-MR-1052",
    EIKH6GYPCJJQSPTA: "WW-MR-053",
    EIKH4B7KGHHKZ2DS: "WW-MR-1053",
    EIKGUVBAGQAPXU52: "WW-MR-1043",
    EIKH3YWUWH5FWMHN: "WW-MR-1051-1",
    EIKGTSFGDZBMN2U3: "WW-MR-045",
    EIKGSGNJGN7ZCJKA: "WW-MR-1045",
    EIKGTTJ7UTKZGEZB: "WW-MR-1044",
    EIKGWMEXM2GHHDBS: "WW-MR-1047-1",
    EIKGUVB7FF26VX8H: "WW-MR-1042",
    EIKHBXGEP3NWUHZM: "WW-MR-060",
    TLPGHGGW3BSVKKWT: "WW-TL-008",
    TLPGUZFTXMHAGHGZ: "WW-TL-3008",
    TLPGNM8FR2GGCW4J: "WW-TL-011",
    EIKH4DHPHAEAPPBE: "WW-IK-1200",
    EIKH4DHKGHZHZHWW: "WW-IK-1150",
    EIKH4DHKQY5EJFJZ: "WW-IK-1100"

  };

  return skuMap[productID] || "N/A";
}
