import { useState } from "react";
import { Link } from "react-router-dom";
import BlogHeroSection from "../components/BlogHeroSection";
import Navbar from "../components/Navbar";

const newsData = [
  {
    id: 1,
    title: "Outstanding Startups Honored at 6th Young Entrepreneur Awards",
    description: "About 65 startups across the country were honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual ceremony celebrates ambitious entrepreneurs making significant impacts in Ghana's economy.",
    date: "December 25, 2024",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author: "AGS Editorial Team",
    category: "Awards",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Fintech Revolution: Ghana's Mobile Payment Surge",
    description: "Mobile money transactions in Ghana have reached unprecedented levels, with local fintech startups leading the charge in financial inclusion. New partnerships with banks are expanding access to rural communities.",
    date: "January 15, 2025",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author: "Kwame Asante",
    category: "Fintech",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "AgriTech Startups Transform Rural Farming",
    description: "Innovative agricultural technology companies are revolutionizing farming practices across Ghana, introducing smart irrigation systems and crop monitoring solutions that increase yields by up to 40%.",
    date: "January 20, 2025",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
    author: "Ama Osei",
    category: "Agriculture",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Women-Led Startups Break Funding Records",
    description: "Female entrepreneurs in Ghana secured over $50 million in funding last year, marking a 300% increase from 2023. This surge reflects growing investor confidence in women-led businesses across various sectors.",
    date: "January 28, 2025",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1388&q=80",
    author: "Efua Mensah",
    category: "Funding",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Sustainable Energy Startups Power Rural Communities",
    description: "Solar energy startups are bringing electricity to remote villages, impacting over 100,000 lives. These initiatives combine environmental sustainability with economic development in underserved areas.",
    date: "February 5, 2025",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80",
    author: "Kofi Danso",
    category: "Clean Energy",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "EdTech Platforms Bridge Learning Gaps",
    description: "Educational technology startups are addressing learning challenges in Ghana's education system, providing digital platforms that serve over 500,000 students and 10,000 teachers nationwide.",
    date: "February 12, 2025",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1422&q=80",
    author: "Akosua Frimpong",
    category: "Education",
    readTime: "4 min read"
  },
  {
    id: 7,
    title: "HealthTech Innovation Saves Lives in Rural Ghana",
    description: "Telemedicine platforms and mobile health applications are revolutionizing healthcare delivery in remote areas, connecting patients with specialists and reducing maternal mortality rates by 25%.",
    date: "February 18, 2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author: "Dr. Kwaku Boateng",
    category: "Healthcare",
    readTime: "8 min read"
  },
  {
    id: 8,
    title: "E-commerce Boom: Local Platforms Rival International Giants",
    description: "Ghanaian e-commerce startups are successfully competing with global platforms, offering localized solutions that understand the unique needs of West African consumers and businesses.",
    date: "February 25, 2025",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=80",
    author: "Nana Adjei",
    category: "E-commerce",
    readTime: "6 min read"
  },
  {
    id: 9,
    title: "Blockchain Startups Pioneer Digital Identity Solutions",
    description: "Innovative blockchain companies are developing secure digital identity systems for Ghana's growing digital economy, partnering with government agencies to enhance service delivery and reduce fraud.",
    date: "March 5, 2025",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80",
    author: "Yaw Oppong",
    category: "Blockchain",
    readTime: "7 min read"
  },
  {
    id: 10,
    title: "Circular Economy Startups Tackle Waste Management",
    description: "Innovative waste management startups are creating circular economy solutions, turning plastic waste into construction materials and organic waste into renewable energy, generating millions in revenue.",
    date: "March 12, 2025",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author: "Abena Gyasi",
    category: "Sustainability",
    readTime: "5 min read"
  },
  {
    id: 11,
    title: "Gaming Industry Emerges as Major Economic Driver",
    description: "Ghana's gaming startup ecosystem is flourishing, with local developers creating culturally relevant games that compete globally, attracting international publishers and generating significant export revenue.",
    date: "March 20, 2025",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    author: "Kwadwo Nkrumah",
    category: "Gaming",
    readTime: "6 min read"
  },
  {
    id: 12,
    title: "AI and Machine Learning Transform Business Operations",
    description: "Artificial intelligence startups are helping Ghanaian businesses optimize operations, from supply chain management to customer service, with local AI solutions tailored to African market needs.",
    date: "March 28, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80",
    author: "Adwoa Safo",
    category: "Artificial Intelligence",
    readTime: "8 min read"
  }
];

const NewsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const displayedNews = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar theme="transparent" />
      <BlogHeroSection />
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-2">
          Explore our current
        </h2>
        <p className="text-3xl font-bold text-gray-800 mb-10">
          Update in News and Blog
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
          {displayedNews.map((news) => (
            <Link 
              to={`/blog/${news.id}`} 
              key={news.id}
              className="group block bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-left group-hover:text-green-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-left line-clamp-3 leading-relaxed">
                  {news.description}
                </p>
                
                {/* Author and Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span>By {news.author}</span>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </div>
                  <span>{news.date}</span>
                </div>
                
                {/* Read More Button */}
                <div className="mt-4 flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                  <span className="text-sm font-medium mr-2">Read Article</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              currentPage === 1
                ? "border-gray-300 text-gray-300"
                : "border-black text-black hover:bg-gray-200"
            }`}
          >
            <span className="text-lg">{"<"}</span>
          </button>
          <span className="text-gray-800 font-medium text-lg">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-300"
                : "border-black text-black hover:bg-gray-200"
            }`}
          >
            <span className="text-lg">{">"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
