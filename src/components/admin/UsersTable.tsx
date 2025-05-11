import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  is_verified: boolean;
  is_profile_complete: boolean;
}

interface PaginatedResponse {
  results: User[];
  count: number;
  next: string | null;
  previous: string | null;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    axios.get<PaginatedResponse>(`${process.env.REACT_APP_LOCAL_BACKEND}/auth/getAllUsers/?page=${page}&page_size=${pageSize}`)
      .then(res => {
        setUsers(res.data.results);
        setCount(res.data.count);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-2 text-left font-semibold">ID</th>
              <th className="py-3 px-2 text-left font-semibold">Username</th>
              <th className="py-3 px-2 text-left font-semibold">Email</th>
              <th className="py-3 px-2 text-left font-semibold">Name</th>
              <th className="py-3 px-2 text-left font-semibold">Role</th>
              <th className="py-3 px-2 text-left font-semibold">Verified</th>
              <th className="py-3 px-2 text-left font-semibold">Profile Complete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b last:border-b-0">
                <td className="py-2 px-2">{user.id}</td>
                <td className="py-2 px-2">{user.username}</td>
                <td className="py-2 px-2">{user.email}</td>
                <td className="py-2 px-2">{user.name}</td>
                <td className="py-2 px-2">{user.role}</td>
                <td className="py-2 px-2">{user.is_verified ? 'Yes' : 'No'}</td>
                <td className="py-2 px-2">{user.is_profile_complete ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex items-center gap-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-purple-800 text-white rounded px-4 py-2 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="bg-purple-800 text-white rounded px-4 py-2 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed">Next</button>
      </div>
    </div>
  );
};

export default UsersTable; 