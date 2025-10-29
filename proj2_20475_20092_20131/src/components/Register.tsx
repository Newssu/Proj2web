import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      setModalTitle("Action Required");
      setModalMessage("Please read and agree to the Terms & Conditions.");
      setModalVisible(true);
      return;
    }

    setModalTitle("Registration Successful!");
    setModalMessage("Your account has been successfully created.");
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <div className="bg-gradient-to-br from-green-50 to-gray-100 min-h-screen flex items-center justify-center p-4 relative">
      {/* Form Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-600 
                         focus:border-transparent placeholder:text-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-600 
                         focus:border-transparent placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 text-gray-700 shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-600 
                         focus:border-transparent placeholder:text-gray-400"
              required
            />
          </div>

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
            className="w-full py-3 rounded-lg text-white font-semibold bg-green-700 
                       hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            CREATE ACCOUNT
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/app"
              className="font-semibold text-green-700 hover:underline "
              > Sign In
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {modalTitle}
            </h3>
            <p className="text-gray-700 mb-6">{modalMessage}</p>
            
            <Link
              onClick={closeModal}
              to="/app"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold 
                         py-2 px-6 rounded-lg transition-all duration-300"
            >
              OK
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
