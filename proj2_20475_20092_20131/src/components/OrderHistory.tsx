import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

type OrderItem = {
  productId: number;
  name?: string;
  qty: number;
  unitPrice?: number;
  lineTotal?: number;
};

type Order = {
  _id: string;
  status: "pending" | "paid" | "cancelled";
  total: number;
  method: "visa" | "mastercard" | "paypal" | "promptpay";
  createdAt: string;
  items: OrderItem[];
};

type Paged<T> = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: T[];
};

const fmtTHB = (n: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(n);

const OrderHistory: React.FC = () => {
  const [data, setData] = useState<Paged<Order> | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = async (pg = 1) => {
    try {
      setLoading(true);
      setErr(null);
      const res = await api.get<Paged<Order>>("/orders/my", {
        params: { page: pg, limit: 10 },
      });
      setData(res.data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "โหลดรายการไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); }, [page]);

  const canPrev = useMemo(() => (data?.page ?? 1) > 1, [data]);
  const canNext = useMemo(() => (data?.page ?? 1) < (data?.pages ?? 1), [data]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Header + ปุ่มกลับหน้าแรก */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">คำสั่งซื้อของฉัน</h1>

          <div className="flex items-center gap-2">
            {/* ปุ่มกลับหน้าแรก */}
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              ← กลับหน้าแรก
            </Link>

            {/* ปุ่มรีเฟรช */}
            <button
              onClick={() => load(page)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              รีเฟรช
            </button>
          </div>
        </div>

        {/* สรุปรวม */}
        {data && (
          <div className="text-sm text-gray-500 mb-4">
            ทั้งหมด {data.total} รายการ • หน้า {data.page}/{data.pages}
          </div>
        )}

        {loading && <p className="text-gray-600">กำลังโหลด...</p>}
        {err && <p className="text-red-600">{err}</p>}

        {!loading && !err && data && data.items.length === 0 && (
          <div className="text-gray-500">
            ยังไม่มีคำสั่งซื้อ —{" "}
            <button
              className="underline"
              onClick={() => navigate("/")}
            >
              ไปเลือกซื้อเลย
            </button>
          </div>
        )}

        {!loading && !err && data && data.items.length > 0 && (
          <div className="space-y-4">
            {data.items.map((o) => (
              <div key={o._id} className="border rounded-xl p-4 hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm text-gray-500">
                      #{o._id.slice(-8).toUpperCase()} • {new Date(o.createdAt).toLocaleString()}
                    </div>
                    <div className="text-xs">
                      ชำระเงินด้วย <span className="font-medium">{o.method}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full 
                      ${o.status === "paid" ? "bg-green-100 text-green-700" :
                        o.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"}`}>
                      {o.status}
                    </span>
                    <div className="text-right font-semibold">{fmtTHB(o.total)}</div>
                  </div>
                </div>

                <div className="mt-3 border-t pt-3">
                  <ul className="text-sm text-gray-700 space-y-1">
                    {o.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{it.name ?? `#${it.productId}`} × {it.qty}</span>
                        <span>{fmtTHB(it.lineTotal ?? (it.unitPrice ?? 0) * it.qty)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!canPrev}
              >
                ← ก่อนหน้า
              </button>
              <div className="text-sm text-gray-600">
                หน้า {data.page} / {data.pages}
              </div>
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => setPage((p) => p + 1)}
                disabled={!canNext}
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
