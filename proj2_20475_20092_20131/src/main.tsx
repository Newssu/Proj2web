import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Payment from "./components/Payment";
import { products as initialProducts } from "./lib/data";
import { loadLocalStorage, useLocalStorage } from "./hooks/useLocalStorage";
import type { Cart } from "./lib/types";
import PlantDictionary from "./components/PlantDictionary";
import "./index.css";

function RootRoutes() {
  const [cart, setCart] = useState<Cart>(() => loadLocalStorage<Cart>("cart", {}));
  useLocalStorage("cart", cart);

  const productList = useMemo(() => initialProducts, []);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/payment" element={<Payment cart={cart} products={productList} />} />
      <Route path="/dictionary" element={<PlantDictionary />} />
      {/* เส้นทางอื่น ๆ ที่ไม่ต้องใช้ props ใส่เพิ่มได้ */}

    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
