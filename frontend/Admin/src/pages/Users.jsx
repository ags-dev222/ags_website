import { useState, useEffect } from "react";
import { fetchUsers } from "../api/api";
import UserRow from "../components/UserRow";
import SearchBar from "../components/SearchBar";
import UserFilter from "../components/UserFilter";
import Pagination from "../components/Pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  useEffect(() => {
    let filtered = users;

    if (filter !== "all") {
      filtered = users.filter(user => user.role === filter);
    }

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [searchQuery, filter, users]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Add User</button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <UserFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={filteredUsers.length}
        itemsPerPage={usersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Users;
