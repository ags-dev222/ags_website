import React, { useState } from "react";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); // Track the current step
  const [hasStartedCreating, setHasStartedCreating] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [sponsorshipLink, setSponsorshipLink] = useState("");
  const [eventFlyer, setEventFlyer] = useState([]);
  const [section2Content, setSection2Content] = useState(""); // Section 2 content
  const [section3Content, setSection3Content] = useState(""); // Section 3 content
  const [searchQuery, setSearchQuery] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const addEvent = () => {
    if (
      !eventName ||
      !eventLocation ||
      !eventDate ||
      !eventTime ||
      !eventDescription ||
      !eventFlyer
    ) {
      setShowValidation(true); // Show validation message
      setTimeout(() => setShowValidation(false), 3000);
      return;
    }

    const newEvent = {
      name: eventName,
      location: eventLocation,
      date: eventDate,
      time: eventTime,
      description: eventDescription,
      registrationLink,
      sponsorshipLink,
      flyer: eventFlyer,
    };

    setEvents([...events, newEvent]);
    setShowModal(false);
    setStep(1); // Reset to Step 1
    setEventName("");
    setEventLocation("");
    setEventDate("");
    setEventTime("");
    setEventDescription("");
    setRegistrationLink("");
    setSponsorshipLink("");
    setEventFlyer([]);
    setSection2Content("");
    setSection3Content("");
    setShowValidation(false);
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
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
            onClick={() => setHasStartedCreating(true)}
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm">{step}/4</span>
              <h3 className="text-lg text-black font-bold">
                {step === 1
                  ? "Create an Event"
                  : step === 2
                  ? "About Event"
                  : step === 3
                  ? "Section 2"
                  : "Section 3"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setStep(1); // Reset steps on close
                }}
                className="text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* Step 1: Create an Event */}
            {step === 1 && (
              <>
                {/* Upload Flyer Section */}
                <div className="flex items-center space-x-4 mb-4 flex-wrap">
                  {eventFlyer.map((flyer, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={flyer}
                        alt={`Flyer ${index + 1}`}
                        className="w-24 h-24 rounded"
                      />
                      <button
                        onClick={() =>
                          setEventFlyer(eventFlyer.filter((_, i) => i !== index))
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                    <span className="text-gray-400 text-xs text-center">
                      <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                      event flyer(s)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const newFlyers = files.map((file) => URL.createObjectURL(file));
                        setEventFlyer((prev) => [...prev, ...newFlyers]);
                      }}
                    />
                  </label>
                </div>

                {/* Event Name, Location, Date, and Time */}
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full p-2 text-xs text-black border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Location"
                />
                <div className="flex space-x-3 mb-3 text-xs">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-1/2 p-2 border text-black bg-gray-100 border-gray-300 rounded"
                  />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-1/2 p-2 border text-black bg-gray-100 border-gray-300 rounded"
                  />
                </div>

                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full p-2 border text-black text-xs bg-gray-100 border-gray-300 rounded mb-4"
                  placeholder="Event Description"
                />
                <input
                  type="text"
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  className="w-full p-2 text-xs text-black border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Registration Link"
                />
                <input
                  type="text"
                  value={sponsorshipLink}
                  onChange={(e) => setSponsorshipLink(e.target.value)}
                  className="w-full p-2 text-xs text-black border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Sponsorship Link"
                />
              </>
            )}

            {/* Step 2: About Event */}
            {step === 2 && (
              <>
                {/* Upload Flyer Section */}
                <div className="flex items-center space-x-4 mb-4 flex-wrap">
                  {eventFlyer.map((flyer, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={flyer}
                        alt={`Flyer ${index + 1}`}
                        className="w-24 h-24 rounded"
                      />
                      <button
                        onClick={() =>
                          setEventFlyer(eventFlyer.filter((_, i) => i !== index))
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                    <span className="text-gray-400 text-xs text-center">
                      <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                      event flyer(s)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const newFlyers = files.map((file) => URL.createObjectURL(file));
                        setEventFlyer((prev) => [...prev, ...newFlyers]);
                      }}
                    />
                  </label>
                </div>

                {/* Event Name, Location, Date, and Time */}
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Title"
                />
               
               

                
                <input
                  type="text"
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  className="w-full p-2 text-xs text-black border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Registration Link"
                />
                <input
                  type="text"
                  value={sponsorshipLink}
                  onChange={(e) => setSponsorshipLink(e.target.value)}
                  className="w-full p-2 text-xs text-black border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Sponsorship Link"
                />
              </>
            )}

            {/* Step 3: Section 3 */}
            {step === 3 && (
              <>
                {/* Upload Flyer Section */}
                <div className="flex items-center space-x-4 mb-4 flex-wrap">
                  {eventFlyer.map((flyer, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={flyer}
                        alt={`Flyer ${index + 1}`}
                        className="w-24 h-24 rounded"
                      />
                      <button
                        onClick={() =>
                          setEventFlyer(eventFlyer.filter((_, i) => i !== index))
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <label className="border-dashed border-2 border-gray-300 rounded w-40 h-24 flex items-center justify-center cursor-pointer">
                    <span className="text-gray-400 text-xs text-center">
                      <span className="font-bold text-lg">+</span> <br /> Click to attach <br />
                      event flyer(s)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const newFlyers = files.map((file) => URL.createObjectURL(file));
                        setEventFlyer((prev) => [...prev, ...newFlyers]);
                      }}
                    />
                  </label>
                </div>

                {/* Event Name, Location, Date, and Time */}
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full p-2 text-black text-xs border bg-gray-100 border-gray-300 rounded mb-3"
                  placeholder="Title"
                />
                             

                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full p-2 border text-black text-xs bg-gray-100 border-gray-300 rounded mb-4"
                  placeholder="Event Description"
                />
                
              </>
            )}

{step === 4 && (
  <>
  <div className="max-h-screen bg-white flex flex-col items-center justify-start p-16">
      <div className="flex gap-8 mb-10">
        {/* Freeman Pekay Card */}
        <div className="bg-green-800 rounded-2xl p-4 text-white flex flex-col items-center w-40 relative">
          <div className="absolute top-3 right-3 bg-gray-100 p-1 rounded-full text-black -mt-16 text-sm">...</div>
          <div className="bg-yellow-400 rounded-full w-24 h-24 overflow-hidden -mt-16 mb-2">
            <img
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
              alt="Freeman Pekay"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-bold text-center text-sm uppercase">FREEMAN PEKAY</p>
          <p className="text-xs mt-1 text-center">Project Manager At <br />AGS</p>
          <p className="text-xs font-bold mt-1 text-center">Moderator</p>
        </div>

        {/* Placeholder Card 1 */}
        <div className="bg-gray-100 rounded-2xl p-4 text-center text-gray-600 flex flex-col items-center w-40 relative">
          <div className="absolute top-3 right-3 bg-gray-200 p-1 rounded-full text-black -mt-16 text-sm">...</div>
          <div className="rounded-full bg-gray-300 w-24 h-24 flex items-center justify-center overflow-hidden -mt-16 mb-2">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1119.07 4.929M15 11a3 3 0 11-6 0 3 3 0 016 0zm-6 4a6 6 0 016 0"
              />
            </svg>
          </div>
          <p className="font-bold text-sm">FULL NAME</p>
          <p className="text-xs">Title</p>
          <p className="text-xs font-bold">Role</p>
        </div>

        {/* Placeholder Card 2 */}
        <div className="bg-gray-100 rounded-2xl p-4 text-center text-gray-600 flex flex-col items-center w-40 relative">
          <div className="absolute top-3 right-3  bg-gray-200 p-1 rounded-full text-black -mt-16 text-sm">...</div>
          <div className="rounded-full bg-gray-300 w-24 h-24 flex items-center justify-center overflow-hidden -mt-16 mb-2">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1119.07 4.929M15 11a3 3 0 11-6 0 3 3 0 016 0zm-6 4a6 6 0 016 0"
              />
            </svg>
          </div>
          <p className="font-bold text-sm">FULL NAME</p>
          <p className="text-xs">Title</p>
          <p className="text-xs font-bold">Role</p>
        </div>
      </div>

      {/* Add Button */}
      <button className="border mt-4 -ml-80 mr-20 border-green-800 text-green-800 px-14 py-1 rounded-full text-xs hover:bg-green-50 transition">
        + Add
      </button>
    </div>
    
  </>
)}


            {/* Navigation Buttons */}
            <div className="flex justify-between text-xs mt-12 text-black">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="border px-8 py-2 rounded-full hover:bg-green-500"
                >
                  Previous
                </button>
              ) : (
                <div></div> // empty placeholder for spacing when Previous doesn't show
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="border text-black px-8 py-2 rounded-full hover:bg-green-500"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={addEvent}
                  className="border text-black px-8 py-2 rounded-full hover:bg-green-500"
                >
                  Finish
                </button>
              )}

              
            </div>

            {showValidation && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md p-4 bg-red-100 border border-red-400 text-red-700 text-xs rounded shadow-lg">
                ⚠️ Please fill all fields before finishing!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
