import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AccordionLookup = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    { title: "AGS Ecosystem Metrics", content: "Details about ecosystem metrics." },
    { title: "AGS Corporate Partners", content: "Details about corporate partners." },
    // Add more items
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Here’s our Lookups</h2>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="border rounded-lg">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="font-semibold">{item.title}</h3>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === index && <div className="p-4 bg-white">{item.content}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccordionLookup;
