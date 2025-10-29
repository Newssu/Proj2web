/* eslint-disable no-irregular-whitespace */
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
}) => {
    // Enhancement: Ensure that input is a valid positive number
    const handleSetQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const newQty = parseInt(value, 10);

        // If the input is empty, reset to 1 to prevent issues, otherwise use the parsed number.
        // The calling function (in App.tsx) should already handle setting a minimum of 1.
        if (isNaN(newQty) || newQty < 1) {
            onSetQty(1);
        } else {
            onSetQty(newQty);
        }
    };

    return (
        <div className="flex gap-3 items-center p-3 rounded-xl border border-emerald-100/70 dark:border-gray-800">
            <img
                src={product.imageUrl ?? product.img ?? ""}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">{formatTHB(product.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                    <button
                        className="px-2 rounded border"
                        onClick={() => onChangeQty(-1)}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <input
                        className="w-12 text-center rounded border"
                        value={qty}
                        // Use the enhanced handler
                        onChange={handleSetQtyChange}
                        type="number" // Add type="number" for better mobile usability
                        min="1" // Add min attribute for better accessibility
                    />
                    <button
                        className="px-2 rounded border"
                        onClick={() => onChangeQty(1)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold">{formatTHB(subtotal)}</p>
                <button className="text-sm text-red-600 mt-1" onClick={onRemove}>
                    ลบ
                </button>
            </div>
        </div>
    );
};
export default CartItem;