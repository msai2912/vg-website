import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import education from "../../assets/education.png";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-yellow-100/70 backdrop-blur-lg shadow-lg px-4 md:px-8 py-3 sticky top-0 z-50 transition-all duration-300 border-b border-yellow-200/40">
      <div className="flex justify-between items-center">
        {/* Logo + Tagline */}
        <Link
          to="/"
          className="flex items-center space-x-3 group"
          onClick={closeMenu}
        >
          <img
            src={education}
            alt="Pratham Logo"
            className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex items-center leading-tight">
            <span className="text-2xl md:text-3xl font-bold text-blue-600/90 mr-1"></span>
            <span className="text-2xl md:text-3xl font-bold text-blue-600/90"></span>
          </div>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden lg:inline-flex items-center space-x-8 bg-gradient-to-r from-blue-600/90 to-blue-400/90 rounded-full px-10 py-2 shadow-lg backdrop-blur-sm">
          <Link
            to="/"
            className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
          >
            About us
          </Link>
          <Link
            to="/programs"
            className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
          >
            Programs
          </Link>
          <Link
            to="/contact"
            className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
          >
            Contact us
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
              >
                Profile
              </Link>
              {user.role === "student" && (
                <Link
                  to="/my-dashboard"
                  className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
                >
                  My Dashboard
                </Link>
              )}
              {(user.role === "program_manager" ||
                user.role === "educator") && (
                <>
                  <Link
                    to="/students"
                    className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
                  >
                    Students
                  </Link>

                  <Link
                    to="/trees"
                    className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
                  >
                    🌳 Trees
                  </Link>

                  <Link
                    to="/enhanced-registration"
                    className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
                  >
                    Student Registration
                  </Link>
                  {user.role === "program_manager" && (
                    <Link
                      to="/program-controller"
                      className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                </>
              )}
              <button
                onClick={logout}
                className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white/95 text-lg font-medium hover:text-yellow-100 hover:scale-110 transition-transform duration-200"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/donor"
            className="bg-yellow-400/90 border-2 border-white/80 text-blue-700/90 text-lg font-bold px-7 py-1 rounded-full hover:bg-yellow-300 transform hover:scale-110 transition-all duration-300 shadow-xl"
          >
            Donate
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-yellow-100/95 backdrop-blur-lg shadow-lg border-t border-yellow-200/40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
          >
            About us
          </Link>
          <Link
            to="/programs"
            onClick={closeMenu}
            className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
          >
            Programs
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
          >
            Contact us
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
              >
                Profile
              </Link>
              {user.role === "student" && (
                <Link
                  to="/my-dashboard"
                  onClick={closeMenu}
                  className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
                >
                  My Dashboard
                </Link>
              )}
              {(user.role === "program_manager" ||
                user.role === "educator") && (
                <>
                  <Link
                    to="/students"
                    onClick={closeMenu}
                    className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
                  >
                    Students
                  </Link>
                  <Link
                    to="/trees"
                    onClick={closeMenu}
                    className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
                  >
                    🌳 Trees
                  </Link>
                  <Link
                    to="/student-registration"
                    onClick={closeMenu}
                    className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
                  >
                    Quick Registration
                  </Link>
                  <Link
                    to="/enhanced-registration"
                    onClick={closeMenu}
                    className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
                  >
                    Full Registration
                  </Link>
                  {user.role === "program_manager" && (
                    <Link
                      to="/program-controller"
                      onClick={closeMenu}
                      className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
                    >
                      Dashboard
                    </Link>
                  )}
                </>
              )}
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="block w-full text-left text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-200 py-2"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/donor"
            onClick={closeMenu}
            className="block bg-yellow-400/90 border-2 border-blue-600/80 text-blue-700/90 text-lg font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg text-center mt-4"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
}
