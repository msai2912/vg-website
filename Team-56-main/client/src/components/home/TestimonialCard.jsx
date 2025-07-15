import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";

const TestimonialCard = ({
  name = "Anonymous",
  role = "",
  testimonial = "No testimonial provided",
  highlight = "",
  image = null,
  rating = 5,
  index = 0,
  language = "en",
}) => {
  const [imageError, setImageError] = useState(false);

  const getLocalizedText = (text, lang = "en") => {
    if (typeof text === "object" && text !== null) {
      return (
        text[lang] || text.en || text.english || Object.values(text)[0] || text
      );
    }
    return text || "";
  };

  const testimonialText = getLocalizedText(testimonial, language);
  const highlightText = getLocalizedText(highlight, language);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const quoteVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { delay: index * 0.1 + 0.3, duration: 0.5 },
    },
  };

  const starsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.1 + 0.4 + i * 0.1,
        duration: 0.3,
        ease: "backOut",
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100 overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>

      {/* Quote Icon and Rating */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <motion.div variants={quoteVariants}>
          <Quote className="h-8 w-8 text-blue-500 opacity-70" />
        </motion.div>
        <div className="flex">
          {[...Array(Math.max(0, Math.min(5, rating)))].map((_, i) => (
            <motion.div key={i} variants={starsVariants} custom={i}>
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonial Text */}
      <motion.div
        className="mb-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
      >
        <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
          "{testimonialText}"
        </p>

        {/* Highlighted Message */}
        {highlightText && (
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-r-lg relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
          >
            <p className="text-blue-800 font-medium italic text-sm">
              "{highlightText}"
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Author Info */}
      <motion.div
        className="flex items-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
      >
        <div className="flex-shrink-0">
          {image && !imageError ? (
            <img
              src={image}
              alt={name}
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-gray-200">
              {name && name.charAt(0) ? (
                <span className="text-white font-semibold text-lg">
                  {name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="h-6 w-6 text-white" />
              )}
            </div>
          )}
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
          {role && <p className="text-sm text-gray-500">{role}</p>}
        </div>
      </motion.div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
    </motion.div>
  );
};

export default TestimonialCard;
