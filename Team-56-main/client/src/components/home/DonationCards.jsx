import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const DonationCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const causes = [
    {
      id: 1,
      title: "POORI PADHAI, DESH KI BHALAI",
      subtitle: "Help girls complete their education",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      alt: "Three young girls in colorful traditional Indian clothing smiling at camera"
    },
    {
      id: 2,
      title: "SEND CHILDREN BACK TO SCHOOL",
      subtitle: "If not now they might never return",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80",
      alt: "Children in school uniforms sitting together"
    },
    {
      id: 3,
      title: "NOURISH TO FLOURISH",
      subtitle: "Help provide nutritious meals",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      alt: "Children receiving food and nutrition"
    },
    {
      id: 4,
      title: "CLEAN WATER FOR ALL",
      subtitle: "Provide access to safe drinking water",
      image: "https://images.unsplash.com/photo-1541919329513-35f7af297129?auto=format&fit=crop&w=600&q=80",
      alt: "Children accessing clean water from a well"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % causes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + causes.length) % causes.length);
  };

  return (
    <div className="bg-gradient-to-b from-white via-yellow-50 to-yellow-100 min-h-[600px] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-20">
        
        {/* Main Content - Side by Side Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              How do you want to{' '}
              <span className="text-yellow-400 font-handwriting">help children</span>{' '}
              today?
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Your smallest contribution makes a big difference to children's lives. 
              We count on the generosity of people like you to be able to create 
              real change for India's children!
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Donate For Happier Childhoods!
            </button>
          </div>

          {/* Right Side - Cards Carousel */}
          <div className="flex-1 lg:max-w-3xl w-full">
            <div className="relative bg-white rounded-xl shadow-xl p-6">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                  {causes.map((cause) => (
                    <div key={cause.id} className="w-72 flex-shrink-0 px-2">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 border">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={cause.image}
                            alt={cause.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-yellow-500 text-sm font-semibold tracking-wide mb-2">
                            {cause.title}
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">
                            {cause.subtitle}
                          </h3>
                          <div className="h-1 bg-yellow-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {causes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics Section */}
        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-yellow-500 mb-2">₹50</div>
              <div className="text-gray-600">Can provide a meal for 5 children</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-yellow-500 mb-2">₹500</div>
              <div className="text-gray-600">Can fund school supplies for a month</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-yellow-500 mb-2">₹1000</div>
              <div className="text-gray-600">Can support a child's education</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DonationCards;