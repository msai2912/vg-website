import React, { useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Send,
} from "lucide-react";
import image7 from "../../assets/image7.jpg";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim()) {
      console.log("Email submitted:", email);
      setEmail("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-800 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={image7}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-yellow-500/80 to-blue-800/90"></div>
      </div>

      {/* Textured background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform skew-y-2"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white to-transparent transform -skew-y-2"></div>
      </div>

      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-10 w-16 h-16 bg-yellow-300 rounded-full"></div>
        <div className="absolute top-6 right-20 w-12 h-12 bg-blue-300 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-4 left-32 w-14 h-14 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-6 right-10 w-18 h-18 bg-blue-400 rounded-lg transform -rotate-45"></div>
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Main horizontal layout */}
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Left section - Newsletter header */}
            <div className="text-white lg:text-left text-center">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Mail className="w-8 h-8 text-yellow-300 mr-3" />
                <h2 className="text-2xl lg:text-3xl font-bold">
                  Stay Connected
                </h2>
              </div>
              <p className="text-blue-100 text-base leading-relaxed">
                Join our community for the latest updates, events, and
                initiatives
              </p>
            </div>

            {/* Center section - Newsletter form */}
            <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white/90 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-800 placeholder-gray-600 font-medium"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send size={16} />
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right section - Social media */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-white text-lg font-semibold mb-4">
                  Follow Us
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-blue-900 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram size={18} />
                  </a>

                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook size={18} />
                  </a>

                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-blue-900 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>

                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Follow us on YouTube"
                  >
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
