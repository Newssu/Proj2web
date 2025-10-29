// src/components/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api"; // ✅ ให้แน่ใจว่า baseURL ถูกต้อง (เช่น http://localhost:4000/api)

type RegisterResponse = {
    _id: string;
    username: string;
    email: string;
    token: string;
};

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [errorText, setErrorText] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorText(null);

        if (!agree) {
            setModalTitle("ต้องยอมรับเงื่อนไขก่อน");
            setModalMessage("โปรดอ่านและยอมรับ Terms & Conditions เพื่อดำเนินการต่อ");
            setModalVisible(true);
            return;
        }
        if (password.length < 6) {
            setErrorText("รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร");
            return;
        }

        try {
            setLoading(true);
            console.log("BASE_URL =", (api as any).defaults.baseURL); // ดูว่าโดน /api จริงไหม

            const { data } = await api.post<RegisterResponse>("/auth/register", {
                username: name,
                email,
                password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ _id: data._id, username: data.username, email: data.email }));
            setModalTitle("สมัครสมาชิกสำเร็จ!");
            setModalMessage("บัญชีของคุณถูกสร้างแล้ว จะพาไปหน้าแรก");
            setModalVisible(true);

            setTimeout(() => { setModalVisible(false); navigate("/"); }, 1200);
        } catch (err: any) {
            // ✅ ดึงข้อความจาก backend ให้ชัด
            const raw = err?.response?.data;
            let msg = raw?.message || raw?.error || err?.message || "สมัครสมาชิกไม่สำเร็จ กรุณาลองอีกครั้ง";
            if (Array.isArray(msg)) msg = msg.join(", ");
            console.error("Register error:", { status: err?.response?.status, data: raw });

            setErrorText(String(msg)); // ให้ข้อความแดงใต้ฟอร์มโชว์เหตุผลจริง เช่น Email already in use
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => setModalVisible(false);

    return (
        <div className="bg-gradient-to-br from-green-50 to-gray-100 min-h-screen flex items-center justify-center p-4 relative">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password (≥ 6)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-gray-400"
                            required
                            minLength={6}
                        />
                    </div>

                    {errorText && (
                        <p className="text-sm text-red-600 mb-3">{errorText}</p>
                    )}

                    {/* Terms */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                            I've read and agree to{" "}
                            <a href="#" className="text-green-700 hover:underline">
                                Terms & Conditions
                            </a>
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg text-white font-semibold bg-green-700 hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "กำลังสมัคร..." : "CREATE ACCOUNT"}
                    </button>

                    <p className="text-center mt-6 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/app" className="font-semibold text-green-700 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>

            {/* Modal */}
            {modalVisible && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{modalTitle}</h3>
                        <p className="text-gray-700 mb-6">{modalMessage}</p>
                        <button
                            onClick={() => { closeModal(); navigate("/"); }}
                            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
