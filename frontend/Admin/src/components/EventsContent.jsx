import { useState } from 'react';

const EventsContent = ({
  events,
  setEvents,
  setShowModal,
  hasStartedCreating,
  setHasStartedCreating,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {hasStartedCreating || events.length > 0 ? (
        <div className="flex justify-between items-center -mt-9 mb-4">
          <div className="relative w-1/3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-10 py-2 border text-black bg-gray-100 rounded w-full pl-10"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-green-600 px-12 py-3 hover:bg-yellow-400 rounded-full border"
          >
            New Event
          </button>
        </div>
      ) : null}

      {filteredEvents.length === 0 && !hasStartedCreating ? (
        <div className="flex flex-col items-center justify-center h-64">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="Empty Box"
            className="w-24 h-24 mb-4 opacity-50"
          />
          <p className="text-gray-600 text-lg font-semibold mb-4">Nothing Here Yet</p>
          <button
            onClick={() => {
              setHasStartedCreating(true);
              setShowModal(true);
            }}
            className="text-sm text-gray-600 px-6 py-3 hover:bg-yellow-400 rounded-full border"
          >
            + Create New Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEvents.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              {event.flyer && (
                <img
                  src={event.flyer}
                  alt="Event Flyer"
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <h4 className="text-lg font-bold text-gray-700">{event.name}</h4>
              <p className="text-sm text-gray-500">
                {event.date} - {event.time}
              </p>
              <p className="text-gray-500">{event.location}</p>
              <p className="text-gray-600 mt-2">{event.description}</p>
              <button
                onClick={() => deleteEvent(index)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EventsContent;