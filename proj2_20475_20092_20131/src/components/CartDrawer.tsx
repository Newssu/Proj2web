// CartDrawer.tsx
import React from "react";
import type { Cart, Product } from "../lib/types";
import { formatTHB } from "../lib/utils";
import CartItem from "./CartItem";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: Cart;
  products: Product[];
  onChangeQty: (id: number, delta: number) => void;
  onSetQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void; // ✅ add this prop
};

const CartDrawer: React.FC<Props> = ({
  open,
  onClose,
  cart,
  products,
  onChangeQty,
  onSetQty,
  onRemove,
  onCheckout,
}) => {
  const entries = Object.entries(cart);
  const total = entries.reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white dark:bg-gray-900 shadow-2xl border-l border-emerald-100/70 dark:border-gray-800 transition-transform duration-300 z-50 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-emerald-100/70 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-xl font-extrabold">ตะกร้าสินค้า</h3>
          <button
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {entries.length === 0 ? (
            <p className="text-center text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            entries.map(([id, qty]) => {
              const p = products.find((x) => x.id === Number(id));
              if (!p) return null;
              const sub = p.price * qty;
              return (
                <CartItem
                  key={id}
                  product={p}
                  qty={qty}
                  subtotal={sub}
                  onChangeQty={(d) => onChangeQty(p.id, d)}
                  onSetQty={(q) => onSetQty(p.id, q)}
                  onRemove={() => onRemove(p.id)}
                />
              );
            })
          )}
        </div>

        <div className="border-t border-emerald-100/70 dark:border-gray-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">ยอดรวม</span>
            <span className="text-lg font-extrabold">{formatTHB(total)}</span>
          </div>

          <button
            className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700"
            onClick={onCheckout} // ✅ use the prop
          >
            ชำระเงิน
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 ${
          open ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>
    </>
  );
};

export default CartDrawer;
