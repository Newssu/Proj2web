import React from "react";
import type { Product } from "../lib/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onAddToCart: (id: number) => void;
  filter: "all" | "low" | "high";
  setFilter: (f: "all" | "low" | "high") => void;
};

const ProductsSection: React.FC<Props> = ({ products, onAddToCart, filter, setFilter }) => (
  <section id="products" className="py-6 sm:py-10">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">สินค้าแนะนำ</h2>
          <p className="text-gray-600 dark:text-gray-300">เลือกต้นไม้ที่ใช่ เพิ่มความสดชื่นให้มุมโปรด</p>
        </div>

        
        <div className="hidden sm:flex items-center gap-2">
          {(["all","low","high"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl border px-3 py-2 text-sm ${
                filter===f
                  ? "bg-emerald-100 dark:bg-emerald-700 border-emerald-300 dark:border-emerald-600"
                  : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {f==="all" ? "ทั้งหมด" : f==="low" ? "ราคาต่ำ" : "ราคาสูง"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}/>
        ))}
      </div>
    </div>
  </section>
);
export default ProductsSection;
