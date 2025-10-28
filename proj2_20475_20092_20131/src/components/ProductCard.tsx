import type { Product } from "../lib/types";
import { formatTHB } from "../lib/utils";

type Props = { product: Product; onAddToCart: (id: number) => void; };
const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => (
  <div className="rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-emerald-100/70 dark:border-gray-800 overflow-hidden hover:shadow-xl transition">
    <div className="aspect-square">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover"/>
    </div>
    <div className="p-3 space-y-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{product.name}</h4>
        <span className="text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5">{product.tag}</span>
      </div>
      <p className="font-bold">{formatTHB(product.price)}</p>
      <button className="w-full rounded-xl bg-emerald-600 text-white py-2 font-semibold hover:bg-emerald-700"
              onClick={() => onAddToCart(product.id)}>เพิ่มลงตะกร้า</button>
    </div>
  </div>
);
export default ProductCard;
