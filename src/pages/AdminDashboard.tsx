import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import UsersTable from '../components/admin/UsersTable';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-gray-50 min-h-0 overflow-y-auto">
          <UsersTable />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 