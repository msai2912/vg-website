import React from "react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image9 from "../../assets/image9.jpg";
import image10 from "../../assets/image10.jpg";
import image11 from "../../assets/image11.jpg";
import image12 from "../../assets/image12.jpg";
import image13 from "../../assets/image13.jpg";
import image from "../../assets/image.jpg";

export function Gallery() {
  const data = [
    {
      imgelink: image1,
      title: "Volunteer. Lead. Inspire.",
      subtitle:
        "Transforming Lives • Building Futures • Creating Hope for Every Child Across India",
      buttonText: "Discover Our Mission",
    },
    {
      imgelink: image2,
      title: "Building Tomorrow's Leaders",
      subtitle:
        "Nurturing Excellence • Fostering Innovation • Unlocking Unlimited Potential in Every Young Mind",
      buttonText: "Join the Movement",
    },
    {
      imgelink: image4,
      title: "Inspiring Young Minds",
      subtitle:
        "Igniting Passion • Sparking Creativity • Cultivating Tomorrow's Innovators and Changemakers",
      buttonText: "Become a Catalyst",
    },
    {
      imgelink: image5,
      title: "Transforming Communities",
      subtitle:
        "Unity in Action • Collective Impact • Creating Ripples of Change That Last Generations",
      buttonText: "Begin Your Legacy",
    },
    {
      imgelink: image9,
      title: "Empowering Through Knowledge",
      subtitle:
        "Sharing Wisdom • Creating Opportunities • Enabling Success Through Quality Education",
      buttonText: "Support Our Cause",
    },
    {
      imgelink: image10,
      title: "Learning Without Limits",
      subtitle:
        "Accessible Education • Innovative Methods • Reaching Every Corner of the Nation",
      buttonText: "Explore Programs",
    },
    {
      imgelink: image11,
      title: "Shaping Future Generations",
      subtitle:
        "Mentoring Excellence • Developing Character • Building a Stronger, Educated India",
      buttonText: "Partner With Us",
    },
    {
      imgelink: image12,
      title: "Inclusive Education For All",
      subtitle:
        "Diversity • Equality • Ensuring Every Child Has Access to Quality Learning Resources",
      buttonText: "Learn More",
    },
    {
      imgelink: image13,
      title: "Creating Lasting Impact",
      subtitle:
        "Sustainable Change • Measurable Results • Transforming Communities Through Education",
      buttonText: "Make A Difference",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [data.length, isHovered]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className="w-full mb-1">
      {/* Main image container with navigation */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main image - increased height for more impressive look */}
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
          <img
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            src={data[activeIndex].imgelink}
            alt={`Gallery image ${activeIndex + 1}`}
          />

          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Text overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
            <div className="max-w-xs md:max-w-sm text-white space-y-6 backdrop-blur-sm bg-black/10 p-6 rounded-lg shadow-2xl border border-white/20">
              <h1
                className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data[activeIndex].title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-95 leading-relaxed font-normal text-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {data[activeIndex].subtitle}
              </p>
              <button className="mt-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 px-7 md:py-4 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-base border-2 border-yellow-300">
                {data[activeIndex].buttonText}
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-3 text-white hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-3 text-white hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slide counter */}
          <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {activeIndex + 1} / {data.length}
          </div>
        </div>
      </div>

      {/* Image thumbnails row */}
      <div className="flex justify-center gap-2 md:gap-4 py-4 bg-gray-100">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer transition-all duration-300 ${
              activeIndex === index
                ? "border-2 border-yellow-500 scale-110"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={item.imgelink}
              alt={`Thumbnail ${index + 1}`}
              className="h-16 md:h-20 w-auto object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="w-full">
        <img
          src={image}
          alt="Featured image"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
