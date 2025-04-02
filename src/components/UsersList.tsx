import { useState, useEffect } from "react";
import Filters from "./Filters";
import UsersTable from "./UsersTable";
import { User } from "../types";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    gender: undefined,
    status: undefined,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://gorest.co.in/public/v2/users`);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const applyFilters = (updatedFilters: typeof filters) => {
    let filtered = [...users];

    if (updatedFilters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(updatedFilters.name.toLowerCase())
      );
    }

    if (updatedFilters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(updatedFilters.email.toLowerCase())
      );
    }

    if (updatedFilters.gender) {
      filtered = filtered.filter(
        (user) => user.gender === updatedFilters.gender
      );
    }

    if (updatedFilters.status) {
      filtered = filtered.filter(
        (user) => user.status === updatedFilters.status
      );
    }

    setFilteredUsers(filtered);
  };

  const handleFilterChange = (name: string, value?: string) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl" style={{ maxWidth: "1200px" }}>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <UsersTable loading={loading} users={filteredUsers} />
      </div>
    </div>
  );
}
