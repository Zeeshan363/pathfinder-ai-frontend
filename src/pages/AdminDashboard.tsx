import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import UsersTable from '../components/admin/UsersTable';
import ScrapeJobsSection from '../components/admin/ScrapeJobsSection';
import ScrapedJobsTable from '../components/admin/ScrapedJobsTable';

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<'users' | 'scrape' | 'scraped'>('users');

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar section={section} setSection={setSection} />
        <main className="flex-1 p-8 bg-gray-50 min-h-0 overflow-y-auto">
          {section === 'users' && <UsersTable />}
          {section === 'scrape' && <ScrapeJobsSection onViewScrapedJobs={() => setSection('scraped')} />}
          {section === 'scraped' && <ScrapedJobsTable />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 