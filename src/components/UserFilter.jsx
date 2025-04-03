const UserFilter = ({ filter, setFilter }) => {
    return (
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-3 border rounded-lg"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>
    );
  };
  
  export default UserFilter;
  