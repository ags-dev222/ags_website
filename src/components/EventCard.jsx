import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={event.image} alt={event.title} className="rounded-lg mb-4 w-full h-40 object-cover" />
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p className="text-gray-500">{event.date} • {event.location}</p>
      <Link to={`/events/${event.id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
