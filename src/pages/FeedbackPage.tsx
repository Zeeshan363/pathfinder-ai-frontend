import React from 'react';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import UserFeedbackList from '../components/Feedback/UserFeedbackList';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-purple-600 dark:text-purple-400">
          Feedback Center
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <FeedbackForm />
          </div>
          <div>
            <UserFeedbackList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage; 