import React, { useState } from "react";
import type { Cart, Product } from "../lib/types";
import { formatTHB } from "../lib/utils";

type Props = { cart: Cart; products: Product[]; onGoToTransport?: () => void };


const Payment: React.FC<Props> = ({
  cart = {},
  products = [],
  onGoToTransport, // (แก้ไข) รับ prop ใหม่
}) => {
  const [method, setMethod] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // --- Calculate total ---
  // ... (ส่วนคำนวณราคายังเหมือนเดิม) ...
  const entries = Object.entries(cart);
  const total = entries.reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);
  const totalDisplay = total > 0 ? formatTHB(total) : "฿0.00";

  /**
   * (แก้ไข) เปลี่ยนชื่อฟังก์ชัน
   * และเปลี่ยนจากการ alert "ชำระเงินสำเร็จ"
   * เป็นการเรียก onGoToTransport() เพื่อไปหน้า transport
   */
  const handleContinue = () => {
    // ลบ alert("ชำระเงินสำเร็จ...") ออก
    // alert(`🌿 ชำระเงินสำเร็จ (${totalDisplay}) ด้วยช่องทาง: ${method.toUpperCase()}`);

    // เรียกฟังก์ชัน onGoToTransport ที่ส่งมาจาก Component แม่
    // เพื่อบอกให้ "ไปหน้า transport"
    if (onGoToTransport) {
      onGoToTransport();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-green-50 px-4">
      {/* ... (ปุ่มกลับหน้าแรกยังเหมือนเดิม) ... */}
      <a
        href="/"
        className="absolute right-8 top-8 flex items-center gap-2 px-4 py-2 
                   bg-white border border-gray-200 rounded-full shadow-sm 
                   hover:shadow-md hover:bg-pink-50 text-gray-700 
                   transition-all duration-200 text-sm font-medium"
      >
        <span className="text-pink-500 text-lg">⬅</span> กลับหน้าแรก
      </a>
      
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        {/* ... (Header และ Order Summary ยังเหมือนเดิม) ... */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <h1 className="font-semibold text-lg text-gray-700">
              Bloom Plant Shop
            </h1>
          </div>
          <p className="text-sm text-gray-500">💳 การชำระเงินที่ปลอดภัย</p>
        </div>

        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            🪴 สรุปรายการต้นไม้ที่คุณเลือก
          </h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            <ul className="text-gray-700 space-y-2">
              {entries.map(([id, qty]) => {
                const p = products.find((x) => x.id === Number(id));
                if (!p) return null;
                return (
                  <li
                    key={id}
                    className="flex justify-between border-b border-dashed border-gray-100 pb-1"
                  >
                    <span>
                      {p.name} × {qty}
                    </span>
                    <span className="text-gray-600">
                      {formatTHB(p.price * qty)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <h3 className="text-right mt-3 font-bold text-pink-600">
            รวมทั้งหมด: {totalDisplay}
          </h3>
        </div>
        
        {/* ... (ส่วนเลือกช่องทางชำระเงินยังเหมือนเดิม) ... */}
        <h2 className="text-md font-semibold text-gray-700 mb-2">
          เลือกช่องทางการชำระเงิน
        </h2>
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setMethod("visa")}
            className={`border-2 rounded-lg p-2 transition ${
              method === "visa"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-8"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </button>

          <button
            onClick={() => setMethod("mastercard")}
            className={`border-2 rounded-lg p-2 transition ${
              method === "mastercard"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/960px-Mastercard-logo.svg.png"
              alt="Mastercard"
              className="h-8"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </button>

          <button
            onClick={() => setMethod("paypal")}
            className={`border-2 rounded-lg p-2 transition ${
              method === "paypal"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-8"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </button>

          <button
            onClick={() => setMethod("promptpay")}
            className={`border-2 rounded-lg p-2 transition ${
              method === "promptpay"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png"
              alt="PromptPay"
              className="h-8"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </button>
        </div>


        {/* Card info only for Visa/MasterCard */}
        {(method === "visa" || method === "mastercard") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue(); // (แก้ไข) เรียก handleContinue
            }}
            className="space-y-4"
          >
            {/* ... (Input fields: Card Number, Expiry, CVC ยังเหมือนเดิม) ... */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                หมายเลขบัตร (Card Number)
              </label>
              <input
                type="text"
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
                  วันหมดอายุ (Expiry)
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

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-pink-500 hover:opacity-90 transition"
            >
              ยืนยันการชำระเงิน
            </button>
          </form>
        )}

        {/* PromptPay / PayPal notice */}
        {(method === "promptpay" || method === "paypal") && (
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm mb-3">
              โปรดสแกน QR หรือไปที่หน้า{" "}
              {method === "promptpay" ? "PromptPay" : "PayPal"}{" "}
              เพื่อดำเนินการชำระเงิน
            </p>
            <button
              onClick={handleContinue} // (แก้ไข) เรียก handleContinue
              className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-pink-500 hover:opacity-90 transition"
            >
              ยืนยันการชำระเงิน
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;

