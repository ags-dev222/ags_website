const EventFilter = ({ filter = "all", setFilter, categories = [] }) => {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter?.(e.target.value)} // ✅ Safe call
      className="p-3 border rounded-lg"
      aria-label="Filter events by category" // ✅ Accessibility
    >
      <option value="all">All Events</option>
      {/* ✅ Dynamic categories (fallback to default options) */}
      {(categories.length > 0 ? categories : ["workshop", "conference", "networking"]).map(
        (category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)} {/* ✅ Capitalized */}
          </option>
        )
      )}
    </select>
  );
};

export default EventFilter;
