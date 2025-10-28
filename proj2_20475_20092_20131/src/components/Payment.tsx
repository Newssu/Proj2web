import React, { useState } from "react";
import type { Cart, Product } from "../lib/types";
import { formatTHB } from "../lib/utils";

type Props = {
  cart: Cart;
  products: Product[];
};

const Payment: React.FC<Props> = ({ cart, products }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const entries = Object.entries(cart);
  const total = entries.reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const handlePay = () => {
    alert(`✅ ชำระเงินสำเร็จ ${formatTHB(total)} (ตัวอย่างเท่านั้น)`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md md:max-w-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💗</span>
            <h1 className="font-semibold text-lg text-gray-700">Heartbeat</h1>
          </div>
          <p className="text-sm text-gray-500">💳 Secure Payment</p>
        </div>

        {/* Total */}
        <div className="text-right mb-4">
          <p className="text-gray-600 text-sm">ยอดรวมทั้งหมด</p>
          <h2 className="text-xl font-bold text-pink-600">{formatTHB(total)}</h2>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-around items-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png"
            alt="Mastercard"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="h-8"
          />
        </div>

        {/* Card Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePay();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              หมายเลขบัตร (Card Number)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0000-0000-0000-0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                วันหมดอายุ (Expiry Date)
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                CVC
              </label>
              <input
                type="password"
                placeholder="•••"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-pink-400 to-pink-600 hover:opacity-90 transition"
          >
            บริจาค / ชำระเงิน
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
