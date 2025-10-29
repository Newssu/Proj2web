// delivery.tsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const Delivery: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: "standard",
    cost: 50.0,
    time: "5-7 Business Days",
  });

  const subtotal = 4500.0;
  const taxes = 315.0;

  const totalCost = useMemo(
    () => subtotal + taxes + selectedOption.cost,
    [subtotal, taxes, selectedOption]
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);

  const selectOption = (id: string, cost: number, time: string) => {
    setSelectedOption({ id, cost, time });
  };

  const confirmShipping = () => {
    console.log("Shipping confirmed:", selectedOption);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sarabun">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              Shipping Confirmed!
            </h3>
            <p className="mt-3 text-gray-600">
              Your order is now being processed. You will receive a tracking
              number via email shortly.
            </p>
            <p className="mt-3 text-gray-600">
              
            </p>
            <br></br>
            <Link
              onClick={() => setShowSuccessModal(false)}
              to="/app"
              className="mt-6 w-full rounded-lg bg-green-500 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              > Done
            </Link>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h1M3 12H2m15.364 6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="ml-2 text-2xl font-bold text-gray-800">
                  Bloom
                </span>
              </div>

              <div className="ml-8 flex items-center w-96">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Search products..."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Delivery Location
              </button>
              <a
                href="#"
                className="text-gray-600 hover:text-green-500 text-sm font-medium"
              >
                Promotions
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-500 text-sm font-medium"
              >
                Login
              </a>
              <button className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Choose Your Delivery
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your payment was successful. Please select a shipping method to
            complete your order.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Methods */}
          <section className="w-full lg:w-2/3 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
              Available Methods
            </h2>

            {[
              {
                id: "standard",
                name: "Standard Shipping",
                cost: 50,
                time: "5-7 Business Days",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875c0-.621.504-1.125 1.125-1.125h13.5c.621 0 1.125.504 1.125 1.125v1.875m-17.25 4.5h16.5M6.375 6.375h11.25"
                  />
                ),
              },
              {
                id: "express",
                name: "Express Shipping",
                cost: 150,
                time: "2-3 Business Days",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.875L5.999 12zm0 0h7.5"
                  />
                ),
              },
              {
                id: "sameday",
                name: "Same-Day Delivery",
                cost: 300,
                time: "Today by 8:00 PM",
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                ),
              },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-6 bg-white border-2 rounded-xl shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  selectedOption.id === option.id
                    ? "border-green-500 shadow-green-100 translate-y-[-2px]"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  selectOption(option.id, option.cost, option.time)
                }
              >
                <div className="flex-shrink-0 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {option.icon}
                  </svg>
                </div>
                <div className="ml-5 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {option.name}
                  </h3>
                  <p className="text-gray-600">Est. {option.time}</p>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-xl font-bold text-gray-800">
                    {formatCurrency(option.cost)}
                  </span>
                </div>
              </label>
            ))}
          </section>

          {/* Order Summary */}
          <aside className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4">
                Order Summary
              </h2>
              <div className="space-y-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (Est.)</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(taxes)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(selectedOption.cost)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 -mt-2">
                  Est. {selectedOption.time}
                </p>
                <div className="flex justify-between items-center border-t-2 border-gray-800 pt-4 mt-4">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-gray-800">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>

              <button
                onClick={confirmShipping}
                className="mt-6 w-full rounded-lg bg-green-500 px-4 py-3 text-lg font-semibold text-white shadow-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirm Shipping
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  Shipping To
                </h3>
                <a
                  href="#"
                  className="text-sm font-medium text-green-600 hover:text-green-700 transition"
                >
                  Edit
                </a>
              </div>
              <address className="text-gray-600 not-italic space-y-1">
                <span className="font-medium text-gray-800 block">Jane Doe</span>
                <span>123 Market St.</span>
                <span>Suite 450</span>
                <span>San Francisco, CA 94105</span>
                <span>United States</span>
              </address>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.38446410313!2d-122.39999002410196!3d37.78131307198124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580630e68e439%3A0x1338d8f366e60f0!2s123%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sth!4v1730244158414!5m2!1sen!2sth"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-gray-600 text-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <p>&copy; 2025 Bloom, Inc. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-600">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-600">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-600">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Delivery;
