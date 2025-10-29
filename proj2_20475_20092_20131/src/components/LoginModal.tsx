import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSubmit: (email: string, pass: string) => Promise<void>;
};
const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLoginSubmit }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");
      await onLoginSubmit(email, pass);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-96 shadow-xl space-y-3"
      >
        <h3 className="text-xl font-bold">เข้าสู่ระบบ</h3>
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="อีเมล"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="รหัสผ่าน"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        
        <Link
              onClick={() => {onClose();}}
              to="/register"
              className="text-red-400 text-sm underline text-right cursor-pointer"
            >
              สมัครสมาชิก
        </Link>
        <div className="flex gap-2">
          <button
            disabled={loading}
            className="flex-1 rounded-xl bg-emerald-600 text-white py-2 font-semibold"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginModal;
