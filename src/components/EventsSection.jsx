const events = [
  {
    id: 1,
    title: "Freshers General Meeting onsite",
    date: "26.08.2024 | 6:00 PM",
    description:
      "Explore the diverse clubs at CITSA, where students connect, develop new skills, and collaborate on exciting projects. Join today to make the most of your university experience!",
    image: "event1.jpg", // Replace with your actual image path
    link: "#",
  },
  {
    id: 2,
    title: "Freshers General Meeting onsite",
    date: "26.08.2024 | 6:00 PM",
    description:
      "Explore the diverse clubs at CITSA, where students connect, develop new skills, and collaborate on exciting projects. Join today to make the most of your university experience!",
    image: "event2.jpg", // Replace with your actual image path
    link: "#",
  },
];

const EventsSection = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Other Events Schedules</h2>
        <p className="text-gray-400 font-sm mb-16">
          Our Major Upcoming Events With Dates And Brief Descriptions.
        </p>
        <div className="space-y-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="flex-none w-full sm:w-1/3 bg-gray-700 p-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 sm:h-full object-cover rounded-md"
                />
              </div>

              {/* Text Content */}
              <div className="flex-grow p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-yellow-400 font-medium mb-4">{event.date}</p>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <a
                  href={event.link}
                  className="text-blue-400 hover:underline text-sm font-medium"
                >
                  Event Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
