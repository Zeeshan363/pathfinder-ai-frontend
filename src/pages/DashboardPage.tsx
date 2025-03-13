import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProfileSection from '../components/Dashboard/ProfileSection';
import RecommendationsSection from '../components/Dashboard/RecommendationSections';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Fetch user profile data
  const { 
    data: profileData, 
    isLoading: profileLoading,
    error: profileError 
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const response = await api.get('/profile/getProfileByJWT/');
        console.log('Profile data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching profile:', error);
        if ((error as any).response?.status === 404) {
          // Profile not found, but not an error for our UI
          return { profile: null };
        }
        throw error;
      }
    },
    retry: 1,
  });

  // Fetch career recommendations
  const { 
    data: recommendationsData, 
    isLoading: recommendationsLoading 
  } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      try {
        const response = await api.get('/recommendation/getCareerPaths/');
        console.log('Recommendations data:', response.data);
        return response.data; // The API directly returns the array of recommendations
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
      }
    },
    // Only fetch recommendations if we have a profile
    enabled: !!profileData && !!profileData.id,
    retry: 1,
  });

  const isLoading = profileLoading || (recommendationsLoading && !!profileData?.id);

  // Check if profile exists
  const hasProfile = !!profileData && !!profileData.id;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <ProfileSection profile={profileData} />
            </div>
            <div className="md:col-span-8">
              {hasProfile ? (
                recommendationsData && recommendationsData.length > 0 ? (
                  <RecommendationsSection recommendations={recommendationsData} />
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-purple-700 mb-4">No Recommendations Yet</h2>
                    <p className="text-gray-600">
                      We're working on generating personalized career recommendations for you.
                      This might take a moment, or you may need to add more skills and interests to your profile.
                    </p>
                  </div>
                )
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-purple-700 mb-4">Create Your Profile</h2>
                  <p className="text-gray-600 mb-4">
                    Please complete your profile to get personalized career recommendations.
                  </p>
                  <button
                    onClick={() => navigate('/profile/create')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                  >
                    Create Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;