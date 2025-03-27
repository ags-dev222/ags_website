import { useState, useEffect } from "react";
import { fetchEvents } from "../api/api";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import EventFilter from "../components/EventFilter";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setFilteredEvents(data);
    });
  }, []);

  useEffect(() => {
    let filtered = events;

    if (filter !== "all") {
      filtered = events.filter(event => event.category === filter);
    }

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [searchQuery, filter, events]);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Add Event</button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <EventFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
