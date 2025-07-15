import React, { useState, useEffect } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { FaHandHoldingHeart } from "react-icons/fa";
import writeImg from "../../../assets/write-us.svg";
export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll be in touch soon.");
  };

  return (
    <section className="bg-yellow-50 py-16 px-6">
      <div className="max-w-6xl mx-auto md:flex md:items-start md:space-x-12">
        {/* Left side intro + FAQ */}
        <div className="md:w-1/2 space-y-8">
          <div className="flex items-start space-x-6">
            <img
              src={writeImg}
              alt="Write to us illustration"
              className="w-24 h-24 object-contain"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Write To Us</h2>
              <p className="mt-2 text-gray-700">
                If you have any queries, visit our FAQs section or just send us
                a message and someone from our team will reach out to you.
                <br />
                <span className="font-semibold">
                  **For volunteering and internships please{" "}
                  <a
                    href="/volunteer"
                    className="text-yellow-600 underline hover:text-yellow-700"
                  >
                    click here
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* FAQ - Repositioned and styled better */}
          <div className="mt-10 pt-6 border-t border-gray-200 bg-white rounded-lg shadow-md p-6">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <BiHelpCircle className="h-7 w-7 text-yellow-600 mr-3" />
              Frequently Asked Questions
            </h3>
            <div className="mt-4 space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <a
                  href="/faq#donation"
                  className="block text-yellow-700 font-medium hover:text-yellow-800"
                >
                  Making A Donation
                </a>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <a
                  href="/faq#volunteer"
                  className="block text-yellow-700 font-medium hover:text-yellow-800"
                >
                  Volunteering & Internships
                </a>
              </div>
            </div>
          </div>

          {/* Donation Box with Animation */}
          <div
            className={`bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl shadow-lg p-6 border border-yellow-200 transition-all duration-1000 ease-out overflow-hidden ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-yellow-500 rounded-full mr-4 shadow-md animate-pulse">
                <FaHandHoldingHeart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-yellow-700">
                Support Our Cause
              </h3>
            </div>

            <p className="text-gray-700 mb-5">
              Your donation helps us continue our mission and create lasting
              impact in communities.
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {[100, 500, 1000, 5000].map((amount) => (
                <button
                  key={amount}
                  className="px-4 py-2 bg-white hover:bg-yellow-100 border border-yellow-300 rounded-full text-yellow-700 font-medium transition-all hover:shadow-md"
                >
                  ₹{amount}
                </button>
              ))}
              <button className="px-4 py-2 bg-white hover:bg-yellow-100 border border-yellow-300 rounded-full text-yellow-700 font-medium transition-all hover:shadow-md">
                Other
              </button>
            </div>

            <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center">
              <FaHandHoldingHeart className="mr-2" />
              Donate Now
            </button>

            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-2000 ease-out"
                style={{ width: isVisible ? "70%" : "0%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              70% towards our monthly goal
            </p>
          </div>
        </div>

        {/* Right side form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg mt-10 md:mt-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 outline-none transition-all"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                E-Mail*
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 outline-none transition-all"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 outline-none transition-all"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2 form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Subject*
              </label>
              <input
                type="text"
                required
                placeholder="What is your message about?"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2 form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Message*
              </label>
              <textarea
                required
                rows={5}
                placeholder="Please write your message here..."
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 outline-none transition-all resize-none"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            By sharing your details, you agree to receive stories and updates
            from us via mobile, WhatsApp, email and post. To change this, email{" "}
            <a
              href="mailto:contact@ngo.org"
              className="text-yellow-600 underline"
            >
              contact@ngo.org
            </a>
            .
          </p>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
