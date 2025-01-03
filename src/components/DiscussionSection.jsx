
const DiscussionSection = () => {
  const discussionPoints = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  const speaker = {
    name: "Freeman Pekay",
    title: "Project Manager at AGS",
    role: "Moderator",
    image: "path-to-speaker-image",
  };

  const partners = [
    { name: "NEIP", logo: "path-to-logo1" },
    { name: "Partner 2", logo: "path-to-logo2" },
    { name: "Partner 3", logo: "path-to-logo3" },
    { name: "Ghana Digital Centres Limited", logo: "path-to-logo4" },
  ];

  return (
    <div className="bg-white py-12 px-8">
      {/* Focus Discussion Section */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        {/* Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 md:pr-8">
          <div className="w-64 h-80 bg-gray-200 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
            <span className="text-gray-500">Placeholder</span>
          </div>
        </div>
        {/* Discussion Points */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Focus Discussion</h2>
          <ul className="space-y-4">
            {discussionPoints.map((point) => (
              <li key={point.id} className="flex items-start">
                <div className="mr-4 text-lg font-semibold">{point.id}.</div>
                <div>
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Who's Speaking Section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold mb-0">Who’s Speaking?</h2>
        <p className="mb-24">A group of seasoned investors with quality and rich experience</p>
        <div className="flex justify-center space-x-8">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative bg-green-200 text-center py-4 px-6 rounded-t-full shadow-md w-48"
            >
              {/* Stacked Circle Placeholder with Image */}
              <div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden shadow-md"
              >
                <img
                  src={speaker.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Speaker Details */}
              <div className="mt-20">
                <h3 className="text-lg font-semibold">{speaker.name}</h3>
                <p className="text-gray-700">{speaker.title}</p>
                <p className="text-green-700 font-medium">{speaker.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="max-w-4xl mx-auto mt-28  flex justify-between items-center">
        {/* Left-aligned text */}
        <div className="text-between">
          <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
          <p className="text-gray-600 mb-6">
            We are proud to collaborate with these outstanding organizations that share our vision
            and values.
          </p>
        </div>

        {/* Right-aligned logos with gap */}
        <div className="flex space-x-6 ml-16">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.logo}
              alt={partner.name}
              className="h-12"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionSection;
