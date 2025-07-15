import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  HandHeart,
  Clock,
  TrendingUp,
  Star,
  Sparkles,
} from "lucide-react";

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    volunteers: 0,
    years: 0,
    children: 0,
  });
  const sectionRef = useRef(null);

  const stats = [
    {
      id: "volunteers",
      icon: Users,
      finalValue: 205901,
      label: "Volunteers Engaged",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600",
      glowColor: "shadow-yellow-200",
    },
    {
      id: "years",
      icon: Clock,
      finalValue: 18,
      label: "Years of Service",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600",
      glowColor: "shadow-yellow-200",
    },
    {
      id: "children",
      icon: TrendingUp,
      finalValue: 153616,
      label: "Lives Impacted",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600",
      glowColor: "shadow-yellow-200",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateNumber = (key, finalValue, duration = 2000) => {
      const startTime = Date.now();
      const startValue = 0;

      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(
          startValue + (finalValue - startValue) * easeOutQuart
        );

        setCounts((prev) => ({
          ...prev,
          [key]: currentValue,
        }));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    };

    setTimeout(() => animateNumber("volunteers", 205901, 2500), 200);
    setTimeout(() => animateNumber("years", 18, 1500), 400);
    setTimeout(() => animateNumber("children", 153616, 2800), 600);
  }, [isVisible]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="bg-gradient-to-b from-white via-yellow-50 to-white py-12 px-4 relative overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-2">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Our Impact Story
            </h2>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`relative ${stat.bgColor} rounded-3xl p-8 shadow-2xl ${stat.glowColor} transform transition-all duration-700 hover:scale-105 hover:shadow-3xl group cursor-pointer`}
                style={{
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(60px) scale(0.8)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 rounded-3xl`}
                ></div>

                {/* Floating Icon */}
                <div
                  className={`relative mb-6 flex justify-center transform transition-all duration-1000 ${
                    isVisible ? "rotate-0 scale-100" : "rotate-180 scale-75"
                  }`}
                >
                  <div
                    className={`p-4 bg-white rounded-2xl shadow-xl border-2 border-gray-100 transition-all duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                </div>

                {/* Animated Number */}
                <div className="text-center relative">
                  <div
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 relative transition-transform duration-300`}
                  >
                    {formatNumber(counts[stat.id])}
                  </div>

                  <p className="text-gray-700 font-semibold text-lg transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                {/* Progress Bar Animation */}
                <div className="mt-6 bg-white bg-opacity-70 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-2000 ease-out relative`}
                    style={{
                      width: isVisible ? "100%" : "0%",
                      transitionDelay: `${index * 300}ms`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-b from-white to-yellow-50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-yellow-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300"></div>
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-yellow-100 rounded-full opacity-40"></div>

          <Sparkles className="absolute top-6 right-10 w-6 h-6 text-yellow-400 opacity-70" />
          <Star className="absolute bottom-8 left-12 w-5 h-5 text-yellow-500 opacity-60" />

          <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-yellow-500 mb-4 relative">
            Ready to Make a Difference?
          </h3>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join our community of changemakers and help us create an
            <span className="font-semibold text-yellow-600">
              {" "}
              even greater impact
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              className={`bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200/50 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <HandHeart className="w-6 h-6 inline-block mr-3" />
              Start Your Journey
            </button>

            <button
              className={`bg-white text-yellow-600 hover:text-yellow-700 font-semibold py-3 px-8 rounded-full shadow-lg border-2 border-yellow-200 hover:border-yellow-300 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "1100ms" }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStats;
