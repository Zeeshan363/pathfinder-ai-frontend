import React from 'react';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 pt-8 min-h-screen">
      <ul className="list-none p-0 m-0">
        <li className="px-8 py-4 text-purple-800 font-semibold border-l-4 border-purple-800 bg-purple-50">Users</li>
      </ul>
    </aside>
  );
};

export default AdminSidebar; 