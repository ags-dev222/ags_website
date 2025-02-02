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
    <div className="max-w-6xl mx-auto p-6 mt-22 bg-gray-200">
      <h1 className="text-3xl font-bold text-center">Explore Our Startups</h1>
      <p className="text-center text-gray-600 mt-2">
        Access a variety of templates, guides, and contracts designed to help
        you navigate the startup landscape
      </p>
      
      <div className="flex justify-center mt-4">
        <div className="w-[871px] h-[50px] border border-gray-300 rounded-lg flex items-center px-4 bg-white">
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
      
      <div className="grid grid-cols-3 gap-6 mt-8">
        {displayedStartups.map((startup, index) => (
          <div key={index} className="flex flex-col w-full border rounded-lg p-4 bg-white">
            <div className="flex items-center">
              <div className="w-[94px] h-[68px] bg-gray-300 rounded"></div>
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
              <button className="w-[174px] h-[50px] border border-black text-black bg-white rounded flex items-center justify-center">
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
