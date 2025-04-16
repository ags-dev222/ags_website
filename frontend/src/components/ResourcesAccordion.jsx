import { useState } from "react";
import PropTypes from 'prop-types';


const AccordionItem = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-green-700 font-semibold text-lg"
      >
        <span className="flex items-center">
          <img src="document-icon.png" alt="Document Icon" className="h-6 w-6 mr-3" />
          {title}
        </span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>More information about {title} will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const sections = [
    "Business Plan Template",
    "Investor Pitch Deck Guide",
    "Contract Templates",
    "Startup Financing 101",
    "Marketing Strategies for Startups",
    "Legal Essentials for Startups",
    "Innovator’s Journey",
    "Investor Insights",
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">General Download Document</h1>
          <p className="mt-4 text-gray-600">
            Access a variety of templates, guides, and contracts designed to help you navigate the startup landscape.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {[
              "All Document",
              "Startup Files",
              "For Investors",
              "For Support Organization",
            ].map((category) => (
              <button
                key={category}
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-4">
          {sections.map((section) => (
            <AccordionItem key={section} title={section} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
            Load More Document
          </button>
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Accordion;

