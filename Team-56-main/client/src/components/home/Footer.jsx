import React from "react";
import { Link } from "react-router-dom";
import education from "../../assets/education.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
          <div className="md:flex md:justify-between md:items-start">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center group">
                <img
                  src={education}
                  className="mr-2 h-8 transition-transform duration-300 group-hover:scale-105"
                  alt="Logo"
                />
                <span className="text-xl font-bold text-white">
                  Vision Global Empowerment
                </span>
              </Link>
              <p className="mt-2 text-gray-400 text-sm max-w-sm">
                Empowering communities through education and support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Programs
                </h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>
                    <Link
                      to="/education"
                      className="hover:text-white transition-colors"
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/scholarships"
                      className="hover:text-white transition-colors"
                    >
                      Scholarships
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/volunteer"
                      className="hover:text-white transition-colors"
                    >
                      Volunteer
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Support
                </h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>
                    <Link
                      to="/donate"
                      className="hover:text-white transition-colors"
                    >
                      Donate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">Legal</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>
                    <Link
                      to="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/reports"
                      className="hover:text-white transition-colors"
                    >
                      Reports
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-4 border-gray-700" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-400 mb-2 sm:mb-0">
              © 2025 Vision Global Empowerment NGO. All Rights Reserved.
            </span>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 8 19">
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.02 0C8.7 0 8.31.01 7.07.06 5.83.11 5.02.28 4.32.53c-.75.26-1.39.61-2.02 1.24C1.67 2.4 1.32 3.04 1.06 3.79c-.25.7-.42 1.51-.47 2.75C.54 7.79.53 8.18.53 11.5s.01 3.71.06 4.94c.05 1.24.22 2.05.47 2.75.26.75.61 1.39 1.24 2.02.63.63 1.27.98 2.02 1.24.7.25 1.51.42 2.75.47 1.24.05 1.63.06 4.94.06s3.71-.01 4.94-.06c1.24-.05 2.05-.22 2.75-.47.75-.26 1.39-.61 2.02-1.24.63-.63.98-1.27 1.24-2.02.25-.7.42-1.51.47-2.75.05-1.23.06-1.62.06-4.94s-.01-3.71-.06-4.94c-.05-1.24-.22-2.05-.47-2.75-.26-.75-.61-1.39-1.24-2.02C20.42 1.32 19.78.97 19.03.71c-.7-.25-1.51-.42-2.75-.47C15.04.01 14.65 0 11.34 0h.68zm0 2.16c3.24 0 3.62.01 4.9.07 1.18.05 1.82.25 2.25.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.07.41 2.25.06 1.28.07 1.66.07 4.9s-.01 3.62-.07 4.9c-.05 1.18-.25 1.82-.41 2.25-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.07.36-2.25.41-1.28.06-1.66.07-4.9.07s-3.62-.01-4.9-.07c-1.18-.05-1.82-.25-2.25-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.07-.41-2.25-.06-1.28-.07-1.66-.07-4.9s.01-3.62.07-4.9c.05-1.18.25-1.82.41-2.25.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.07-.36 2.25-.41 1.28-.06 1.66-.07 4.9-.07zm0 3.68c-3.39 0-6.14 2.75-6.14 6.14s2.75 6.14 6.14 6.14 6.14-2.75 6.14-6.14-2.75-6.14-6.14-6.14zm0 10.13c-2.2 0-3.99-1.79-3.99-3.99s1.79-3.99 3.99-3.99 3.99 1.79 3.99 3.99-1.79 3.99-3.99 3.99zm7.84-10.39c0 .79-.64 1.43-1.43 1.43s-1.43-.64-1.43-1.43.64-1.43 1.43-1.43 1.43.64 1.43 1.43z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
