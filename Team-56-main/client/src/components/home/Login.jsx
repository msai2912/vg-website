import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import loginIllustration from "../../assets/Login.jpg";
import {
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiMail,
  FiLock,
  FiHash,
} from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useContext(UserContext);
  const [loginRole, setLoginRole] = useState("student");
  const [showEducatorPassword, setShowEducatorPassword] = useState(false);
  const [showManagerPassword, setShowManagerPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    contact: "",
    educatorEmail: "",
    educatorPassword: "",
    managerEmail: "",
    managerPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;

      if (loginRole === "student") {
        result = await login(null, null, "student", formData.contact);
      } else if (loginRole === "educator") {
        result = await login(
          formData.educatorEmail,
          formData.educatorPassword,
          "educator"
        );
      } else if (loginRole === "manager") {
        result = await login(
          formData.managerEmail,
          formData.managerPassword,
          "program_manager"
        );
      }

      setLoading(false);

      if (!result.success) {
        setError(
          result.message || "Login failed. Please check your credentials."
        );
      } else {
        navigate("/", { replace: true });
      }
    } catch {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden">
      {/* Left image panel - full height with no borders */}
      <div className="hidden md:block md:w-5/12 bg-[#001f3f]">
        <img
          src={loginIllustration}
          alt="Edu Hub"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right login form - with scrollable content if needed */}
      <div className="w-full md:w-7/12 flex flex-col justify-center px-6 md:px-8 lg:px-12 py-6 bg-gradient-to-br from-gray-50 to-blue-50 overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          <a
            href="/"
            className="flex items-center text-[#001f3f] mb-6 font-medium hover:underline group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>

          <h2 className="text-3xl font-bold text-[#001f3f] mb-4">
            Welcome to Vision Global Empowerment!
          </h2>
          <p className="text-gray-600 mb-5">
            Sign in to access your personalized dashboard
          </p>

          {/* Sample Credentials Info - Remove this section in production */}
          {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Sample Login Credentials:</h4>
            <div className="text-sm text-blue-700">
              <p><strong>Student:</strong> Contact: "1234567890" (10-digit number)</p>
              <p><strong>Educator:</strong> Email: "educator@example.com", Password: "password123"</p>
              <p><strong>Manager:</strong> Email: "manager@example.com", Password: "password123"</p>
            </div>
          </div> */}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Tabs - enhanced with better styling */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setLoginRole("student")}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all duration-200 ${
                loginRole === "student"
                  ? "bg-[#001f3f] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setLoginRole("educator")}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all duration-200 ${
                loginRole === "educator"
                  ? "bg-[#001f3f] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Educator
            </button>
            <button
              onClick={() => setLoginRole("manager")}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all duration-200 ${
                loginRole === "manager"
                  ? "bg-[#001f3f] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Manager
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Student Section */}
            {loginRole === "student" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <div className="relative">
                  <FiHash className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your 10-digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    maxLength="10"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Students login with their registered contact number only (no
                  password required)
                </p>
              </div>
            )}

            {/* Educator Section */}
            {loginRole === "educator" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="educatorEmail"
                      value={formData.educatorEmail}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type={showEducatorPassword ? "text" : "password"}
                      name="educatorPassword"
                      value={formData.educatorPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowEducatorPassword(!showEducatorPassword)
                      }
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showEducatorPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Program Manager Section */}
            {loginRole === "manager" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="managerEmail"
                      value={formData.managerEmail}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type={showManagerPassword ? "text" : "password"}
                      name="managerPassword"
                      value={formData.managerPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowManagerPassword(!showManagerPassword)
                      }
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showManagerPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 mt-6 shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#001f3f] text-white hover:bg-[#00294f] hover:shadow-xl transform hover:translate-y-[-2px]"
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            {/* Google Login for non-students */}
            {loginRole !== "student" && (
              <div className="text-center mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-br from-gray-50 to-blue-50 text-gray-500">
                      Or
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full mt-4 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
