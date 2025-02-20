const investors = [
  {
    name: "Lious John",
    title: "Chief Executive Officer of ALX",
    image: "./images/investor.jpeg",
  },
  {
    name: "Lious John",
    title: "Chief Executive Officer of ALX",
    image: "./images/investor.jpeg",
  },
  {
    name: "Lious John",
    title: "Chief Executive Officer of ALX",
    image: "./images/investor.jpeg",
  },
  {
    name: "Lious John",
    title: "Chief Executive Officer of ALX",
    image: "./images/investor.jpeg",
  },
];

export default function InvestorsAccordion() {
  return (
    <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center relative overflow-hidden">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Meet Our Investors</h1>
      <p className="text-gray-600 mt-2 text-xs sm:text-sm">
        Access a variety of templates, guides, and contracts designed to help
        you navigate the startup landscape
      </p>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 relative">
        {investors.map((investor, index) => (
          <div
            key={index}
            className={`border rounded-lg p-3 sm:p-4 flex flex-col items-center shadow-md w-full h-auto sm:h-[250px] relative transform transition-transform duration-300 ease-in-out
            ${index % 2 === 1 ? "sm:translate-y-1/2" : "sm:translate-y-0"}`}>
            <div className="w-24 sm:w-32 h-24 sm:h-32 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src= "./images/investor.jpeg"
                alt={investor.name}
                className="w-full h-full object-cover-object-center"
              />
            </div>
            <h2 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4">{investor.name}</h2>
            <p className="text-gray-500 text-xs sm:text-sm">{investor.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
