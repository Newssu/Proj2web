import React, { useState, useCallback } from 'react';

// Use lucide-react for a modern icon
// We will use inline SVG to avoid multiple files, since lucide-react might not be available in all environments.
const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// --- Success Message Modal Component ---
const SuccessModal = ({ onClose }) => (
  // Modal Backdrop
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4 transition-opacity duration-300">
    {/* Modal Content - Decorated Box */}
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center transform transition-all scale-100 ease-out">
      <div className="flex justify-center mb-6">
        {/* Decorative Circle Icon */}
        <div className="p-4 rounded-full bg-emerald-100 text-emerald-600 shadow-lg">
          <CheckCircleIcon className="w-10 h-10" />
        </div>
      </div>
      <h3 className="text-3xl font-extrabold text-gray-800 mb-3">
        ยินดีด้วย! (Congratulations!)
      </h3>
      <p className="text-gray-600 mb-6">
        คุณได้รับส่วนลด 10% แล้ว! โปรดตรวจสอบอีเมลของคุณเพื่อรับคูปอง
      </p>
      <button
        onClick={onClose}
        className="w-full rounded-xl bg-emerald-600 text-white font-semibold px-6 py-3 shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        ตกลง
      </button>
    </div>
  </div>
);

// --- Main Newsletter Component ---
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // --- Simulate API call or form processing delay ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    // --- End Simulation ---

    console.log(`Subscribing email: ${email}`);

    // On success:
    setEmail(''); // Clear input
    setShowSuccess(true); // Show the success message
    setIsSubmitting(false);

  }, [email, isSubmitting]);

  const handleCloseMessage = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <section className="py-16  font-sans">
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-emerald-600 text-white p-8 sm:p-10 shadow-2xl grid lg:grid-cols-2 gap-8 items-center border-4 border-emerald-400">

          {/* Left Side: Text Content */}
          <div>
            <h3 className="text-3xl font-extrabold leading-tight">
              รับคูปองส่วนลด 10%
            </h3>
            <p className="mt-2 text-emerald-100 text-lg">
              สมัครรับข่าวสาร โปรดี ๆ มีทุกสัปดาห์!
            </p>
          </div>

          {/* Right Side: Form */}
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition duration-150 shadow-inner"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-xl text-lg font-bold px-6 py-3.5 shadow-md transition duration-300
                ${isSubmitting
                  ? 'bg-emerald-200 text-emerald-600 cursor-not-allowed'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-lg'
                } focus:outline-none focus:ring-4 focus:ring-white/50`}
            >
              {isSubmitting ? 'กำลังดำเนินการ...' : 'สมัคร'}
            </button>
          </form>
        </div>
      </div>

      {/* Conditional Rendering of the Success Modal */}
      {showSuccess && <SuccessModal onClose={handleCloseMessage} />}
    </section>
  );
};

export default Newsletter;
