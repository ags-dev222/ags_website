const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />
    );
  };
  
  export default SearchBar;
  