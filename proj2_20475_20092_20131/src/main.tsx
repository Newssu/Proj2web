// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PlantDictionary from "./components/PlantDictionary"; // ← ตำแหน่งไฟล์ของคุณ

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dictionary" element={<PlantDictionary />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
