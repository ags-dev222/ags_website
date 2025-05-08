/* eslint-disable no-unused-vars */
import { useState } from 'react';
import EventsContent from '../components/EventsContent';
import CreateEventWizard from '../components/CreateEventWizard';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [hasStartedCreating, setHasStartedCreating] = useState(false);

  return (
    <div className="p-8">
      <EventsContent
        events={events}
        setEvents={setEvents}
        setShowModal={setShowModal}
        hasStartedCreating={hasStartedCreating}
        setHasStartedCreating={setHasStartedCreating}
      />
      {showModal && (
        <CreateEventWizard
          onClose={() => setShowModal(false)}
          onFinish={(newEvent) => {
            setEvents([...events, newEvent]);
            setShowModal(false);
            setHasStartedCreating(true);
          }}
        />
      )}
    </div>
  );
};

export default EventPage;