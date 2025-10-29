// src/components/Delivery.tsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type DraftItem = { productId: number; name: string; price: number; qty: number };
type OrderDraft = {
  items: DraftItem[];
  subtotal?: number;    // เราเซฟจาก Payment แล้ว (ถ้ามี)
  method?: "visa" | "mastercard" | "paypal" | "promptpay";
  taxes?: number;       // ไม่บังคับ
};

const fmt = (n: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(n);

const Delivery: React.FC = () => {
  const navigate = useNavigate();

  // ----- โหลด draft ที่บันทึกจากหน้า Payment -----
  const draft: OrderDraft | null = useMemo(() => {
    try {
      const raw = localStorage.getItem("orderDraft");
      return raw ? (JSON.parse(raw) as OrderDraft) : null;
    } catch {
      return null;
    }
  }, []);

  // ----- ถ้าไม่มี draft ให้บอกผู้ใช้และพากลับหน้าแรก -----
  if (!draft || !Array.isArray(draft.items) || draft.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 text-gray-800">
        <h2 className="text-2xl font-semibold">ไม่มีคำสั่งซื้อรอจัดส่ง</h2>
        <p className="text-gray-600">กรุณาเลือกสินค้าและชำระเงินก่อนดำเนินการจัดส่ง</p>
        <Link
          to="/"
          className="rounded-lg bg-green-500 px-4 py-3 text-white font-semibold hover:bg-green-600"
        >
          กลับไปเลือกสินค้า
        </Link>
      </div>
    );
  }

  // ----- ตัวเลือกขนส่ง -----
  const [selected, setSelected] = useState<{ id: string; cost: number; time: string }>({
    id: "standard",
    cost: 50,
    time: "5-7 Business Days",
  });

  // ----- ยอดเงินจาก draft -----
  const subtotal = useMemo(() => {
    // ถ้า Payment เซฟ subtotal มาแล้ว ใช้อันนั้น; ไม่งั้นคำนวณจาก items
    if (typeof draft.subtotal === "number") return draft.subtotal;
    return draft.items.reduce((s, it) => s + it.price * it.qty, 0);
  }, [draft]);

  // ภาษี: ถ้า Payment เซฟภาษีมาก็ใช้เลย; ไม่งั้นคิด 7% เป็นตัวอย่าง
  const taxes = useMemo(() => {
    if (typeof draft.taxes === "number") return draft.taxes;
    return Math.round(subtotal * 0.07 * 100) / 100;
  }, [draft, subtotal]);

  const total = useMemo(() => subtotal + taxes + selected.cost, [subtotal, taxes, selected]);

  // ----- กดยืนยันขนส่ง -----
  const [showSuccess, setShowSuccess] = useState(false);
  const confirmShipping = () => {
    // ถ้ามี endpoint ยืนยันขนส่ง สามารถ call API ที่นี่
    // await api.post('/orders/confirm-shipping', { shipping: selected, ... })
    setShowSuccess(true);

    // ตัวอย่าง: ล้าง draft หลังยืนยัน (หรือจะย้ายไปล้างตอนกลับหน้าแรก)
    try { localStorage.removeItem("orderDraft"); } catch {}
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sarabun">
      {/* Success Modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">Shipping Confirmed!</h3>
            <p className="mt-3 text-gray-600">
              เรากำลังดำเนินการจัดส่งให้คุณ หมายเลขติดตามพัสดุจะถูกส่งไปที่อีเมลของคุณ
            </p>
            <Link
              to="/"
              onClick={() => setShowSuccess(false)}
              className="mt-6 inline-block w-full rounded-lg bg-green-500 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-green-600"
            >
              Done
            </Link>
          </div>
        </div>
      )}

      {/* Navbar (ย่อส่วน) */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2" />
            </svg>
            <span className="text-2xl font-bold">Bloom</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600">Delivery Location</button>
            <Link to="/" className="text-gray-600 hover:text-green-500 text-sm font-medium">Back to Shop</Link>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Choose Your Delivery</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your payment was successful. Please select a shipping method to complete your order.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Methods */}
          <section className="w-full lg:w-2/3 space-y-6">
            <h2 className="text-2xl font-semibold border-b border-gray-200 pb-3">Available Methods</h2>

            {[
              { id: "standard", name: "Standard Shipping", cost: 50,  time: "5-7 Business Days" },
              { id: "express",  name: "Express Shipping",  cost: 150, time: "2-3 Business Days" },
              { id: "sameday",  name: "Same-Day Delivery", cost: 300, time: "Today by 8:00 PM" },
            ].map(o => (
              <label
                key={o.id}
                className={`flex items-center p-6 bg-white border-2 rounded-xl shadow-lg cursor-pointer transition ${
                  selected.id === o.id ? "border-green-500 shadow-green-100 -translate-y-0.5" : "border-gray-200"
                }`}
                onClick={() => setSelected(o)}
              >
                <div className="ml-5 flex-grow">
                  <h3 className="text-lg font-semibold">{o.name}</h3>
                  <p className="text-gray-600">Est. {o.time}</p>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-xl font-bold">{fmt(o.cost)}</span>
                </div>
              </label>
            ))}

            {/* รายการสินค้าที่เพิ่งจ่ายเงิน */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold border-b border-gray-200 pb-4">Items</h2>
              <ul className="divide-y divide-gray-100">
                {draft.items.map(it => (
                  <li key={it.productId} className="py-3 flex justify-between">
                    <span>{it.name} × {it.qty}</span>
                    <span className="text-gray-700">{fmt(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Order Summary */}
          <aside className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold border-b border-gray-200 pb-4">Order Summary</h2>
              <div className="space-y-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (Est.)</span>
                  <span className="font-medium">{fmt(taxes)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{fmt(selected.cost)}</span>
                </div>
                <p className="text-sm text-gray-500 -mt-2">Est. {selected.time}</p>
                <div className="flex justify-between items-center border-t-2 border-gray-800 pt-4 mt-4">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold">{fmt(total)}</span>
                </div>
              </div>

              <button
                onClick={confirmShipping}
                className="mt-6 w-full rounded-lg bg-green-500 px-4 py-3 text-lg font-semibold text-white shadow-md hover:bg-green-600"
              >
                Confirm Shipping
              </button>
            </div>

            {/* Shipping address (ตัวอย่าง) */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">Shipping To</h3>
                <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700">Edit</a>
              </div>
              <address className="text-gray-600 not-italic space-y-1">
                <span className="font-medium block">Jane Doe</span>
                <span>123 Market St.</span>
                <span>Suite 450</span>
                <span>San Francisco, CA 94105</span>
                <span>United States</span>
              </address>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-gray-600 text-sm flex flex-col sm:flex-row justify-between gap-4">
          <p>&copy; 2025 Bloom, Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-600">Terms of Service</a>
            <a href="#" className="hover:text-green-600">Privacy Policy</a>
            <a href="#" className="hover:text-green-600">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Delivery;
