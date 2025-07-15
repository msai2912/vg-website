import React from "react";
import ngo from "../../../assets/ngo.jpg";
import ngo2 from "../../../assets/ngo2.jpg";
import ngo3 from "../../../assets/ngo3.jpg";

export default function About() {
  return (
    <div className="py-16 bg-yellow-50">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <h1 className="text-7xl text-center font-bold text-yellow-400 font-handwriting mb-12">
          Our Journey
        </h1>

        {/* First section - left image */}
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 mb-20">
          <div className="md:5/12 lg:w-5/12">
            <img
              src={ngo}
              alt="Vision Global Empowerment founding"
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-navy-800 font-bold md:text-4xl bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-6">
              Founded with a Vision for Change
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-navy-700 leading-relaxed font-bold text-lg font-handwriting">
                  Vision Global Empowerment was established in 2005 with a
                  simple yet powerful vision: to make quality education
                  accessible to underserved communities worldwide. What began as
                  a small initiative with just three dedicated educators and a
                  single classroom has now grown into a global movement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-navy-700 leading-relaxed font-bold text-lg font-handwriting">
                  Our founders, Dr. Maria Chen and Professor James Wilson,
                  believed that education is not just a privilege but a
                  fundamental right. They dedicated their lives to breaking down
                  barriers to learning for children regardless of their
                  socioeconomic background.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second section - right image */}
        <div className="space-y-6 md:space-y-0 md:flex md:flex-row-reverse md:gap-6 lg:items-center lg:gap-12 mb-20">
          <div className="md:5/12 lg:w-5/12">
            <img
              src={ngo2}
              alt="Vision Global Empowerment growth"
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-navy-800 font-bold md:text-4xl bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-6">
              Growing Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-navy-700 leading-relaxed font-bold text-lg font-handwriting">
                  By 2010, Vision Global Empowerment had expanded its programs
                  to include not just academic education but also vocational
                  training, digital literacy, and community development
                  initiatives. Our scholarship program has helped over 5,000
                  talented students pursue higher education.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-navy-700 leading-relaxed font-bold text-lg font-handwriting">
                  The 2015 launch of our mobile learning platform marked a
                  turning point, allowing us to reach remote communities
                  previously untouched by educational resources. Today, our
                  network includes 120 physical learning centers and a digital
                  platform serving millions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Third section - left image */}
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src={ngo3}
              alt="Vision Global Empowerment future"
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-navy-800 font-bold md:text-4xl bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-6">
              Looking to the Future
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-navy-700 leading-relaxed font-bold text-lg font-handwriting">
                  As we look ahead, Vision Global Empowerment remains committed
                  to innovation in education. Our research department
                  continuously develops new teaching methodologies adapted to
                  diverse learning needs. We're pioneering the use of
                  AI-assisted personalized learning.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-navy-700 leading-relaxed font-bold text-lg font-handwriting">
                  With the support of our global community of donors,
                  volunteers, and partners, we aim to reach 100 million learners
                  by 2030. Every contribution helps us move closer to a world
                  where quality education is truly accessible to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
