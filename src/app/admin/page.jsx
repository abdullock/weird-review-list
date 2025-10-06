"use client";

import { useState } from "react";

export default function UploadJSONPage() {
  const [fileName, setFileName] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setJsonData(json);
        localStorage.setItem("uploadedProducts", JSON.stringify(json));

        setMessage(
          "✅ JSON loaded! You can now preview and download it to update Vercel."
        );
      } catch (err) {
        setMessage("❌ Invalid JSON file!");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  // Download JSON file
  const downloadJSON = () => {
    if (!jsonData) return;

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Upload & Download Products JSON</h1>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {fileName && <p>File: {fileName}</p>}
      {message && <p className="mt-2">{message}</p>}

      {jsonData && (
        <button
          onClick={downloadJSON}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
        >
          📥 Download JSON for Vercel
        </button>
      )}

      <p className="mt-4 text-sm text-gray-600">
        ⚠️ Note: This allows you to download the JSON file that you can replace
        in <code>/public/products.json</code> in your Vercel project.
      </p>
    </main>
  );
}
