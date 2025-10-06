"use client";
import React, { useState } from "react";

export default function AdminUploadPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [productsData, setProductsData] = useState({});

  const correctPassword = "123321"; // Change this

  const handleLogin = () => {
    if (password === correctPassword) setAuthenticated(true);
    else alert("Incorrect password!");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setProductsData(json);
        localStorage.setItem("uploadedProducts", JSON.stringify(json)); // save for /products page
        alert("JSON uploaded successfully!");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  if (!authenticated)
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload JSON File</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <div className="mt-4">
        Uploaded Products: {Object.keys(productsData).length}
      </div>
    </div>
  );
}
