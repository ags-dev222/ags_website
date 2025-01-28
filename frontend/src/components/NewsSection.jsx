import { useState } from "react";
import BlogHeroSection from "./BlogHeroSection";

const newsData = [
  {
    id: 1,
    title: "Outstanding Startups honored at 6th Young Entrepreneur Awards",
    description:
      "About 65 Startups across the country have been honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual award ceremony is aimed at celebrating ambitious...",
    date: "Monday 25th Dec. 2024",
  },
  {
    id: 2,
    title: "Outstanding Startups honored at 6th Young Entrepreneur Awards",
    description:
      "About 65 Startups across the country have been honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual award ceremony is aimed at celebrating ambitious...",
    date: "Monday 25th Dec. 2024",
  },
  {
    id: 3,
    title: "Outstanding Startups honored at 6th Young Entrepreneur Awards",
    description:
      "About 65 Startups across the country have been honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual award ceremony is aimed at celebrating ambitious...",
    date: "Monday 25th Dec. 2024",
  },
  {
    id: 4,
    title: "Outstanding Startups honored at 6th Young Entrepreneur Awards",
    description:
      "About 65 Startups across the country have been honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual award ceremony is aimed at celebrating ambitious...",
    date: "Monday 25th Dec. 2024",
  },
  {
    id: 5,
    title: "Outstanding Startups honored at 6th Young Entrepreneur Awards",
    description:
      "About 65 Startups across the country have been honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual award ceremony is aimed at celebrating ambitious...",
    date: "Monday 25th Dec. 2024",
  },
  {
    id: 6,
    title: "Outstanding Startups honored at 6th Young Entrepreneur Awards",
    description:
      "About 65 Startups across the country have been honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual award ceremony is aimed at celebrating ambitious...",
    date: "Monday 25th Dec. 2024",
  },
  {
    id: 7,
    title: "Tech Innovations Awarded at Global Tech Summit",
    description:
      "Innovative technology solutions from around the globe were highlighted at the recent Global Tech Summit. Key players in the tech industry were present...",
    date: "Tuesday 10th Jan. 2025",
  },
  {
    id: 8,
    title: "Sustainable Energy Conference: Highlights of the Year",
    description:
      "The Sustainable Energy Conference brought together experts to discuss renewable energy initiatives and their future impact...",
    date: "Friday 20th Feb. 2025",
  },
  {
    id: 9,
    title: "Creative Minds at the Art & Design Expo 2025",
    description:
      "Artists and designers from diverse backgrounds showcased their creative projects at the Art & Design Expo held in New York...",
    date: "Wednesday 5th Mar. 2025",
  },
  {
    id: 10,
    title: "AI Revolution: What's Next for Technology",
    description:
      "Tech experts convene to discuss the rapid evolution of artificial intelligence and its implications for industries worldwide...",
    date: "Saturday 15th Apr. 2025",
  },
  {
    id: 11,
    title: "Global Health Summit: Innovations in Medicine",
    description:
      "The Global Health Summit featured cutting-edge medical research and advancements that promise to shape the future of healthcare...",
    date: "Thursday 22nd May. 2025",
  },
  {
    id: 12,
    title: "The Future of Work: Adapting to New Norms",
    description:
      "Leaders and professionals gather to explore trends in remote work, workplace diversity, and the gig economy...",
    date: "Monday 5th Jun. 2025",
  },
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
    <div className="bg-gray-50 py-12 px-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-16 mr-16">
          {displayedNews.map((news) => (
            <div
              key={news.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              {/* Placeholder Image */}
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-semibold">Placeholder</span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-left">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-left">{news.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-xs">{news.date}</p>
                  <button className="px-4 py-2 rounded-full border border-green-600 bg-green-600 text-white text-sm font-medium hover:bg-green-700 hover:text-white">
                    Read More
                  </button>
                </div>
              </div>
            </div>
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
