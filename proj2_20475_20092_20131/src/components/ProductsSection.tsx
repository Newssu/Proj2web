import type { Product } from "../lib/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onAddToCart: (id: number) => void;
};

const ProductsSection: React.FC<Props> = ({ products, onAddToCart }) => (
  <section id="products" className="py-6 sm:py-10">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">สินค้าแนะนำ</h2>
        <p className="text-gray-600 dark:text-gray-300">เลือกต้นไม้ที่ใช่ เพิ่มความสดชื่นให้มุมโปรด</p>
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
