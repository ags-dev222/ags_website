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
    <div className=" h-[700px] mx-auto p-6 text-center relative overflow-hidden">
      <h1 className="text-3xl font-bold">Meet Our Investors</h1>
      <p className="text-gray-600 mt-2">
        Access a variety of templates, guides, and contracts designed to help
        you navigate the startup landscape
      </p>

      {/* Investors Grid */}
      <div className="flex justify-center gap-6 mt-8 relative">
        {investors.map((investor, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 flex flex-col items-center shadow-md w-[200px] h-[250px] relative transform transition-transform duration-300 ease-in-out
            ${index % 2 === 1 ? "translate-y-1/2" : "translate-y-0"}`}>
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src= "./images/investor.jpeg"
                alt={investor.name}
                className="w-full h-full object-cover-object-center"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4">{investor.name}</h2>
            <p className="text-gray-500 text-sm">{investor.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
