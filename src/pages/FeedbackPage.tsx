import React from 'react';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import UserFeedbackList from '../components/Feedback/UserFeedbackList';
import { Link } from 'react-router-dom';

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold text-purple-600">Pathfinder</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-purple-700">
            Back to Dashboard
          </Link>
        </div>
      </nav>
      
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