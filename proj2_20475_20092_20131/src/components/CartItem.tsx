import React from "react";
import type { Product } from "../lib/types";
import { formatTHB } from "../lib/utils";

type Props = {
  product: Product;
  qty: number;
  subtotal: number;
  onChangeQty: (delta: number) => void;
  onSetQty: (qty: number) => void;
  onRemove: () => void;
};

const CartItem: React.FC<Props> = ({
  product, qty, subtotal, onChangeQty, onSetQty, onRemove,
}) => (
  <div className="flex gap-3 items-center p-3 rounded-xl border border-emerald-100/70 dark:border-gray-800">
    <img src={product.img} className="w-16 h-16 rounded-lg object-cover" alt={product.name}/>
    <div className="flex-1">
      <p className="font-semibold">{product.name}</p>
      <p className="text-sm text-gray-500">{formatTHB(product.price)}</p>
      <div className="mt-2 flex items-center gap-2">
        <button className="px-2 rounded border" onClick={() => onChangeQty(-1)}>-</button>
        <input
          className="w-12 text-center rounded border"
          value={qty}
          onChange={(e)=>onSetQty(Number(e.target.value) || 1)}
        />
        <button className="px-2 rounded border" onClick={() => onChangeQty(1)}>+</button>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{formatTHB(subtotal)}</p>
      <button className="text-sm text-red-600 mt-1" onClick={onRemove}>ลบ</button>
    </div>
  </div>
);
export default CartItem;
