import React, { useState, useCallback } from "react";

// ✅ Inline SVG Icon (ไม่ต้องใช้ lucide-react ก็ได้)
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08v1.84a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ✅ Modal แจ้งสมัครสำเร็จ
const SuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4 transition-opacity duration-300">
    {/* Modal Box */}
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center transform transition-all scale-100 ease-out">
      <div className="flex justify-center mb-6">
        {/* Icon */}
        <div className="p-4 rounded-full bg-emerald-100 text-emerald-600 shadow-lg">
          <CheckCircleIcon className="w-10 h-10" />
        </div>
      </div>
      <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
        ยินดีด้วย! 🎉 (Congratulations!)
      </h3>
      <p className="text-gray-600 mb-6">
        คุณได้รับส่วนลด 10% แล้ว! โปรดตรวจสอบอีเมลของคุณเพื่อรับคูปอง
      </p>
      <button
        onClick={onClose}
        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition"
      >
        ปิด
      </button>
    </div>
  </div>
);

// ✅ คอมโพเนนต์ Newsletter หลัก
const Newsletter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setIsModalOpen(true);
      setEmail("");
    },
    [email]
  );

  return (
    <section className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-600 text-white p-8 sm:p-10 shadow-xl grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-extrabold">รับคูปองส่วนลด 10%</h3>
            <p className="mt-1 text-white/90">สมัครรับข่าวสาร โปรดี ๆ มีทุกสัปดาห์</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-xl px-4 py-3 text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-white text-emerald-700 font-semibold px-5 py-3 hover:shadow"
            >
              สมัคร
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && <SuccessModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default Newsletter;
