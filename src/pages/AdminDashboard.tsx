import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import UsersTable from '../components/admin/UsersTable';
import ScrapeJobsSection from '../components/admin/ScrapeJobsSection';
import ScrapedJobsTable from '../components/admin/ScrapedJobsTable';
import FeedbackTable from '../components/admin/FeedbackTable';

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<'users' | 'scrape' | 'scraped' | 'feedback'>('users');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle direct navigation to /admin/feedback by setting the section
    if (location.pathname === '/admin/feedback') {
      setSection('feedback');
      navigate('/admin'); // Redirect to /admin but keep the feedback section active
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar section={section} setSection={setSection} />
        <main className="flex-1 p-8 bg-gray-50 min-h-0 overflow-y-auto">
          {section === 'users' && <UsersTable />}
          {section === 'scrape' && <ScrapeJobsSection onViewScrapedJobs={() => setSection('scraped')} />}
          {section === 'scraped' && <ScrapedJobsTable />}
          {section === 'feedback' && <FeedbackTable />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 