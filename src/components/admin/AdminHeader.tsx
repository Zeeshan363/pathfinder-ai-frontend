import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || 'Admin';
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    navigate('/signin');
  };

  return (
    <header className="flex justify-between items-center bg-[#5f28b8] text-white px-8 py-2 text-lg">
      <div className="font-bold cursor-pointer" onClick={() => navigate('/')}>Pathfinder</div>
      <div className="relative">
        <div className="flex items-center cursor-pointer px-4 py-2 rounded hover:bg-purple-700" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {adminName}
          <span className="ml-2 text-base">▼</span>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg min-w-[120px] z-10">
            <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-b" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader; 