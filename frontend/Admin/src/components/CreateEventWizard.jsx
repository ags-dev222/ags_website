/* eslint-disable no-unused-vars */
import { useState } from 'react';

const CreateEventWizard = ({ onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [sponsorshipLink, setSponsorshipLink] = useState('');
  const [eventFlyer, setEventFlyer] = useState([]);
  const [section2Content, setSection2Content] = useState('');
  const [section3Content, setSection3Content] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const handleFinish = () => {
    if (
      !eventName ||
      !eventLocation ||
      !eventDate ||
      !eventTime ||
      !eventDescription ||
      !eventFlyer
    ) {
      setShowValidation(true);
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

    onFinish(newEvent);
    setStep(1);
    setEventName('');
    setEventLocation('');
    setEventDate('');
    setEventTime('');
    setEventDescription('');
    setRegistrationLink('');
    setSponsorshipLink('');
    setEventFlyer([]);
    setSection2Content('');
    setSection3Content('');
    setShowValidation(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">{step}/4</span>
          <h3 className="text-lg text-black font-bold">
            {step === 1
              ? 'Create an Event'
              : step === 2
              ? 'About Event'
              : step === 3
              ? 'Section 2'
              : 'Section 3'}
          </h3>
          <button
            onClick={() => {
              onClose();
              setStep(1);
            }}
            className="text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Step 1: Create an Event */}
        {step === 1 && (
          <>
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
                    ×
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
                    ×
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

        {/* Step 3: Section 2 */}
        {step === 3 && (
          <>
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
                    ×
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

        {/* Step 4: Section 3 */}
        {step === 4 && (
          <div className="max-h-screen bg-white flex flex-col items-center justify-start p-16">
            <div className="flex gap-8 mb-10">
              {/* Freeman Pekay Card */}
              <div className="bg-green-800 rounded-2xl p-4 text-white flex flex-col items-center w-40 relative">
                <div className="absolute top-3 right-3 bg-gray-100 p-1 rounded-full text-black -mt-16 text-sm">
                  ...
                </div>
                <div className="bg-yellow-400 rounded-full w-24 h-24 overflow-hidden -mt-16 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
                    alt="Freeman Pekay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-center text-sm uppercase">FREEMAN PEKAY</p>
                <p className="text-xs mt-1 text-center">
                  Project Manager At <br /> AGS
                </p>
                <p className="text-xs font-bold mt-1 text-center">Moderator</p>
              </div>

              {/* Placeholder Card 1 */}
              <div className="bg-gray-100 rounded-2xl p-4 text-center text-gray-600 flex flex-col items-center w-40 relative">
                <div className="absolute top-3 right-3 bg-gray-200 p-1 rounded-full text-black -mt-16 text-sm">
                  ...
                </div>
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
                <div className="absolute top-3 right-3 bg-gray-200 p-1 rounded-full text-black -mt-16 text-sm">
                  ...
                </div>
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
            <button className="border mt-4 -ml-80 mr-20 border-green-800 text-green-800 px-14 py-1 rounded-full text-xs hover:bg-green-50 transition">
              + Add
            </button>
          </div>
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
            <div></div>
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
              onClick={handleFinish}
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
  );
};

export default CreateEventWizard;