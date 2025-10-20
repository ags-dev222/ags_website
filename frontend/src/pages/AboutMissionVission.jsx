import HeroVision from "../components/Herovision";
import DiscussVision from "../components/Discussvision";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

const MissionSection = () => {
  return (
    <div>
      <Navbar theme="light" />
      <div className="pt-20">
        <HeroVision />
        <DiscussVision />
        
        {/* Enhanced Mission & Vision Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-yellow-50 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Purpose & Direction</h1>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Driving Ghana's startup ecosystem towards global excellence through strategic partnerships and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Vision & Mission Cards */}
              <div className="space-y-6">
                {/* Vision Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To be <strong className="text-green-600">Africa's premier startup ecosystem</strong>, creating a thriving network that transforms innovative ideas into globally competitive enterprises.
                  </p>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      🎯 Building tomorrow's success stories today
                    </p>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To <strong className="text-yellow-600">empower entrepreneurs</strong> through strategic support, mentorship, and resources, building financially sound startups that drive economic transformation.
                  </p>
                  
                  {/* Mission Pillars */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
                      <span className="text-gray-700 text-sm">Foster innovation and entrepreneurial excellence</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
                      <span className="text-gray-700 text-sm">Provide strategic mentorship and resources</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
                      <span className="text-gray-700 text-sm">Build sustainable ecosystem partnerships</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
                      <span className="text-gray-700 text-sm">Drive economic growth through innovation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Section */}
              <div className="relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <img
                    src="./images/dart.jpeg"
                    alt="AGS Vision - Building Ghana's Startup Ecosystem"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold mb-1">Building Tomorrow's Leaders</h3>
                    <p className="text-gray-200 text-sm">
                      Nurturing innovative startups
                    </p>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">500+</div>
                    <div className="text-xs text-gray-600">Startups</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">50+</div>
                    <div className="text-xs text-gray-600">Success Stories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </div>
    </div>
  );
};

export default MissionSection;