import PropTypes from "prop-types";
import { useState } from "react";

const startups = [
  {
    name: "Zeepay",
    location: "Accra Digital Center",
    category: "Fintech company",
    funding: "Seed funding",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nisl ut vitae mattis nec eleifend id interdum. Rhoncus sem nunc facilisis enim.",
  },
  {
    name: "Zeepay",
    location: "Accra Digital Center",
    category: "Fintech company",
    funding: "Seed funding",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nisl ut vitae mattis nec eleifend id interdum. Rhoncus sem nunc facilisis enim.",
  },
  {
    name: "Zeepay",
    location: "Accra Digital Center",
    category: "Fintech company",
    funding: "Seed funding",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nisl ut vitae mattis nec eleifend id interdum. Rhoncus sem nunc facilisis enim.",
  },
];

const Button = ({ children, isSelected, onClick }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all";
  const selectedStyles = isSelected ? "bg-green-600 text-white" : "bg-gray-200 text-black hover:bg-green-600 hover:text-white";
  
  return (
    <button onClick={onClick} className={`${baseStyles} ${selectedStyles}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default function StartupsAccordion() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Startups");
  const startupsPerPage = 6;
  const totalPages = Math.ceil(startups.length / startupsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const displayedStartups = startups.slice(
    (currentPage - 1) * startupsPerPage,
    currentPage * startupsPerPage
  );

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-12 sm:mt-16 bg-gray-200">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">Explore Our Startups</h1>
      <p className="text-center text-gray-600 mt-2 text-xs sm:text-sm">
        Access a variety of templates, guides, and contracts designed to help
        you navigate the startup landscape
      </p>
      
      <div className="flex justify-center mt-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-12 sm:h-14 border border-gray-300 rounded-lg flex items-center px-4 bg-white">
          <input type="text" placeholder="What are you looking for?" className="flex-1 outline-none" />
          <span className="text-gray-500">🔍</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        {["All Startups", "Technology Startups", "Agriculture Startups", "Health Startups", "Others"].map(category => (
          <Button 
            key={category} 
            isSelected={selectedCategory === category} 
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        {displayedStartups.map((startup, index) => (
          <div key={index} className="flex flex-col w-full border rounded-lg p-4 bg-white">
            <div className="flex items-center">
              <div className="w-16 sm:w-20 h-12 sm:h-16 bg-gray-300 rounded"></div>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">{startup.name}</h2>
                <p className="text-sm text-gray-500">{startup.location}</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="bg-green-200 text-black px-2 py-1 rounded text-xs">{startup.category}</span>
              <span className="text-gray-500 text-xs">{startup.funding}</span>
            </div>
            <p className="text-gray-600 mt-2">{startup.description}</p>
            <div className="flex justify-center mt-4">
              <button className="w-full max-w-[10rem] sm:max-w-[12rem] h-10 sm:h-12 border border-black text-black bg-white rounded flex items-center justify-center text-xs sm:text-sm">
                Learn More ↗
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center items-center mt-6">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 border rounded disabled:opacity-50">◀</button>
        <span className="mx-4">{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 border rounded disabled:opacity-50">▶</button>
      </div>
    </div>
  );
}
