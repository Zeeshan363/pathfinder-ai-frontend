import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Briefcase, Search, MapPin, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';
import AIJobRecommendations from '../components/Dashboard/AIJobRecommendations';
import { jobService, Job } from '../services/jobService';

const JobRecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch job listings
  const { 
    data: jobsData,
    isLoading: jobsLoading,
    isError: jobsError,
    error: jobsErrorData,
    refetch: refetchJobs
  } = useQuery({
    queryKey: ['jobs', currentPage, searchQuery, location],
    queryFn: async () => {
      return jobService.getJobs(
        currentPage,
        searchQuery || undefined,
        location || undefined
      );
    }
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetchJobs();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Job Recommendations</h1>
        </div>
        
        {/* AI Job Recommendations Section */}
        <section className="mb-8">
          <AIJobRecommendations />
        </section>
        
        {/* Job Search Section */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Search size={20} className="mr-2" />
              Search All Jobs
            </h2>
            
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title, Skills, or Keywords
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Frontend Developer, React, Data Science"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Remote, New York, San Francisco"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Job Results */}
            <div>
              {jobsLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-gray-100 h-32 rounded-lg"></div>
                  ))}
                </div>
              ) : jobsError ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  <p>Error loading jobs: {(jobsErrorData as Error)?.message || 'Please try again later.'}</p>
                </div>
              ) : jobsData?.results.length === 0 ? (
                <div className="text-center py-10">
                  <Briefcase size={40} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobsData?.results.map((job: Job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{job.location}</span>
                            {job.posted_date && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Posted {formatDate(job.posted_date)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <a
                          href={job.job_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-200 transition"
                        >
                          View Job
                        </a>
                      </div>
                      
                      {job.skills && job.skills.length > 0 && (
                        <div className="mt-3">
                          <div className="text-sm text-gray-500 mb-1">Skills:</div>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 5 && (
                              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                +{job.skills.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Pagination */}
                  {jobsData && (jobsData.next || jobsData.previous) && (
                    <div className="flex justify-center items-center mt-6 space-x-4">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!jobsData.previous}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </button>
                      <span className="text-gray-600">
                        Page {currentPage} of {Math.ceil(jobsData.count / 20)}
                      </span>
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!jobsData.next}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobRecommendationsPage; 