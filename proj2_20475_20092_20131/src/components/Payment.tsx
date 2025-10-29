// src/components/Payment.tsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

type Product = { id: number; name: string; price: number; img?: string };
type Cart = Record<number, number>;

const formatTHB = (n: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(n);

type Props = {
  cart: Cart;
  products: Product[];
  onGoToTransport?: () => void; // ⬅️ ใส่ ?
};


const Payment: React.FC<Props> = ({ cart, products, onGoToTransport }) => {
  const navigate = useNavigate();

  const [method, setMethod] =
    useState<"visa" | "mastercard" | "paypal" | "promptpay">("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- ใช้ cart จาก props; ถ้า props ว่าง ค่อย fallback localStorage ----------
  const cartSource: Cart = useMemo(() => {
    if (cart && Object.keys(cart).length > 0) return cart;
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as Cart) : {};
    } catch {
      return {};
    }
  }, [cart]);

  // ---------- รวม cart + products เป็นบรรทัดเดียว (ใช้โชว์ + ใช้ยิง API) ----------
  const lines = useMemo(() => {
    return Object.entries(cartSource)
      .map(([sid, qty]) => {
        const id = Number(sid);
        const p = products.find((x) => x.id === id);
        return p
          ? { id, name: p.name, price: p.price, qty: Number(qty) }
          : null;
      })
      .filter(Boolean) as { id: number; name: string; price: number; qty: number }[];
  }, [cartSource, products]);

  // ---------- รวมยอด ----------
  const total = useMemo(
    () => lines.reduce((s, l) => s + l.price * l.qty, 0),
    [lines]
  );
  const totalDisplay = total > 0 ? formatTHB(total) : "฿0.00";

  // ---------- ตรวจบัตร (เฉพาะ visa/mastercard) ----------
  const validateCardIfNeeded = () => {
    if (method === "visa" || method === "mastercard") {
      const digits = cardNumber.replace(/[-\s]/g, "");
      if (!/^\d{12,19}$/.test(digits)) {
        setError("หมายเลขบัตรไม่ถูกต้อง");
        return false;
      }
      if (!/^\d{2}\s*\/\s*\d{2}$/.test(expiry.trim())) {
        setError("วันหมดอายุต้องเป็นรูปแบบ MM / YY");
        return false;
      }
      if (!/^\d{3,4}$/.test(cvc)) {
        setError("CVC ไม่ถูกต้อง");
        return false;
      }
    }
    return true;
  };

  // ---------- ส่งออเดอร์ ----------
  const handleContinue = async () => {
    setError(null);

    if (lines.length === 0) {
      setError("ยังไม่มีสินค้าในตะกร้า");
      return;
    }
    if (!validateCardIfNeeded()) return;

    try {
      setSubmitting(true);

      // ✅ ใช้ข้อมูลบรรทัดเดียวกันทั้งโชว์และยิง API
      const payloadItems = lines.map((l) => ({ productId: l.id, qty: l.qty }));
      await api.post("/orders", { method, items: payloadItems, total });

      // เก็บ draft ให้หน้า Delivery แสดงซ้ำ
      localStorage.setItem(
        "orderDraft",
        JSON.stringify({
          items: lines,    // มี name/price/qty ให้โชว์ได้ทันที
          subtotal: total,
          method,
        })
      );

      // ล้างตะกร้า
      localStorage.removeItem("cart");

      // ไปหน้าจัดส่ง
      onGoToTransport ? onGoToTransport() : navigate("/delivery");
    } catch (err: any) {
      const status = err?.response?.status;
      const rawMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      const msg = Array.isArray(rawMsg) ? rawMsg.join(", ") : String(rawMsg || "ไม่สามารถชำระเงินได้");
      setError(status === 401 ? "กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ" : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-green-50 px-4 py-12">
      <Link
        to="/"
        className="absolute right-8 top-8 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-pink-50 text-gray-700 transition-all duration-200 text-sm font-medium"
      >
        <span className="text-pink-500 text-lg">⬅</span> กลับหน้าแรก
      </Link>

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <h1 className="font-semibold text-lg text-gray-700">Bloom Plant Shop</h1>
          </div>
          <p className="text-sm text-gray-500">💳 การชำระเงินที่ปลอดภัย</p>
        </div>

        {/* Summary */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-green-700 mb-2">🪴 สรุปรายการต้นไม้ที่คุณเลือก</h2>

          {lines.length === 0 ? (
            <p className="text-gray-500 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            <ul className="text-gray-700 space-y-2">
              {lines.map((l) => (
                <li
                  key={l.id}
                  className="flex justify-between border-b border-dashed border-gray-100 pb-1"
                >
                  <span>{l.name} × {l.qty}</span>
                  <span className="text-gray-600">{formatTHB(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-right mt-3 font-bold text-pink-600">
            รวมทั้งหมด: {totalDisplay}
          </h3>
        </div>

        {/* Payment Methods */}
        <h2 className="text-md font-semibold text-gray-700 mb-2">เลือกช่องทางการชำระเงิน</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {(["visa", "mastercard", "paypal", "promptpay"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`border-2 rounded-lg p-2 transition flex justify-center items-center ${
                method === m ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={m}
            >
              {m === "visa" && (
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" />
              )}
              {m === "mastercard" && (
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/960px-Mastercard-logo.svg.png" />
              )}
              {m === "paypal" && (
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" />
              )}
              {m === "promptpay" && (
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png" />
              )}
            </button>
          ))}
        </div>

        {/* Card form */}
        {(method === "visa" || method === "mastercard") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
            className="space-y-4"
          >
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
              disabled={submitting || lines.length === 0}
              className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-pink-500 hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? "กำลังชำระเงิน..." : "ยืนยันการชำระเงิน"}
            </button>
          </form>
        )}

        {/* PromptPay / PayPal */}
        {(method === "promptpay" || method === "paypal") && (
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm mb-3">
              โปรดสแกน QR หรือไปที่หน้า {method === "promptpay" ? "PromptPay" : "PayPal"} เพื่อดำเนินการชำระเงิน
            </p>
            <button
              onClick={handleContinue}
              disabled={submitting || lines.length === 0}
              className="w-full py-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-green-400 to-pink-500 hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? "กำลังยืนยัน..." : "ยืนยันการชำระเงิน"}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Payment;
