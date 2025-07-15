import React from "react";
import education from "../../assets/education.png";
import { motion } from "framer-motion";

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: "Youth Leadership Development",
      description:
        "Empowering young leaders with essential skills for community development and social change.",
      features: [
        "Leadership workshops and training",
        "Community project management",
        "Public speaking and communication skills",
        "Team building and collaboration",
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/57f59988893fc0a0690862ea/1475722118880-1RF42H5IB3UZTEEUIB90/IMG_5633.jpg?format=750w",
      category: "Leadership",
    },
    {
      id: 2,
      title: "Educational Support Initiative",
      description:
        "Providing quality educational resources and support to underprivileged children.",
      features: [
        "Free educational materials",
        "Tutoring and mentorship programs",
        "Digital literacy training",
        "Scholarship opportunities",
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/57f59988893fc0a0690862ea/1475722439553-RI5DDJASPMU1EKENPOPO/dream+magazine+5th+edition.png?format=750w",
      category: "Education",
    },
    {
      id: 3,
      title: "Community Development Projects",
      description:
        "Grassroots initiatives to improve living conditions and opportunities in local communities.",
      features: [
        "Infrastructure development",
        "Health and wellness programs",
        "Women empowerment initiatives",
        "Sustainable livelihood projects",
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/57f59988893fc0a0690862ea/1475722780462-YTU9LDKVCMNO1KGYJ48A/IMG_5647.JPG?format=750w",
      category: "Community",
    },
    {
      id: 4,
      title: "Technology & Innovation Hub",
      description:
        "Bridging the digital divide and fostering innovation among youth.",
      features: [
        "Computer literacy programs",
        "Coding and programming workshops",
        "Innovation challenges",
        "Digital entrepreneurship training",
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/57f59988893fc0a0690862ea/1475723103583-Z7BYQV7A2Q50PJBXMIN5/image-asset.jpeg?format=750w",
      category: "Technology",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#001f3f] to-[#003366] text-white py-16 rounded-lg shadow-lg mx-4 sm:mx-8 lg:mx-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Programs
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Empowering communities through education, leadership, and
              innovative solutions
            </p>
          </div>
        </div>
      </motion.div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-[#001f3f] mb-2">
              10,000+
            </div>
            <div className="text-gray-600">Youth Empowered</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-[#001f3f] mb-2">50+</div>
            <div className="text-gray-600">Communities Served</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-[#001f3f] mb-2">200+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold text-[#001f3f] mb-2">8+</div>
            <div className="text-gray-600">Years of Impact</div>
          </div>
        </motion.div>

        {/* Programs List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-3">
                    <span className="bg-[#e6f0ff] text-[#001f3f] text-xs font-semibold px-3 py-1 rounded-full">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#001f3f] mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>

                  <ul className="space-y-2">
                    {program.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="h-4 w-4 text-[#001f3f] mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-[#001f3f] to-[#003366] rounded-xl text-white p-8 text-center shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-6 opacity-90">
            Help us create lasting change in communities across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donor"
              className="bg-white text-[#001f3f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-md"
            >
              Support Our Programs
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#001f3f] transition-colors duration-300 shadow-md"
            >
              Get Involved
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Programs;
