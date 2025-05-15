import React from 'react';

interface AdminSidebarProps {
  section: 'users' | 'scrape' | 'scraped' | 'feedback';
  setSection: (section: 'users' | 'scrape' | 'scraped' | 'feedback') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ section, setSection }) => {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 pt-8 min-h-screen">
      <ul className="list-none p-0 m-0">
        <li className={`px-8 py-4 font-semibold border-l-4 cursor-pointer ${section === 'users' ? 'text-purple-800 border-purple-800 bg-purple-50' : 'text-gray-700 border-transparent'}`} onClick={() => setSection('users')}>Users</li>
        <li className={`px-8 py-4 font-semibold border-l-4 cursor-pointer ${section === 'scrape' ? 'text-purple-800 border-purple-800 bg-purple-50' : 'text-gray-700 border-transparent'}`} onClick={() => setSection('scrape')}>Scrape New Jobs</li>
        <li className={`px-8 py-4 font-semibold border-l-4 cursor-pointer ${section === 'scraped' ? 'text-purple-800 border-purple-800 bg-purple-50' : 'text-gray-700 border-transparent'}`} onClick={() => setSection('scraped')}>Scraped Jobs</li>
        <li className={`px-8 py-4 font-semibold border-l-4 cursor-pointer ${section === 'feedback' ? 'text-purple-800 border-purple-800 bg-purple-50' : 'text-gray-700 border-transparent'}`} onClick={() => setSection('feedback')}>Feedback</li>
      </ul>
    </aside>
  );
};

export default AdminSidebar; 