import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Briefcase, ChevronRight, Target, Check, X } from 'lucide-react';
import { jobService, RecommendedJob } from '../../services/jobService';

const AIJobRecommendations: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedJob, setSelectedJob] = useState<RecommendedJob | null>(null);

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['jobRecommendations'],
    queryFn: async () => {
      const response = await jobService.getRecommendedJobs();
      return response;
    },
    retry: 1,
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setSelectedJob(null);
    }
  };

  const viewJobDetails = (job: RecommendedJob) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMatchScoreClass = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.6) return 'bg-blue-100 text-blue-800';
    if (score >= 0.4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatScore = (score: number) => {
    return `${Math.round(score * 100)}%`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
        <div className="space-y-3">
          <div className="h-12 bg-gray-200 rounded w-full"></div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Unable to load job recommendations</h2>
        <p className="text-gray-600">
          {(error as Error)?.message || 'An error occurred while fetching job recommendations.'}
        </p>
      </div>
    );
  }

  // If no recommendations or empty array
  if (!data?.recommendations || data.recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
        <h2 className="text-xl font-semibold text-yellow-700 mb-2">No AI Job Recommendations Yet</h2>
        <p className="text-gray-600">
          We're working on finding the perfect job matches for your skills and experience.
          Check back soon or update your profile with more skills to improve recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {selectedJob ? (
        // Job Detail View
        <div>
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
              <p className="text-indigo-100">{selectedJob.company} • {selectedJob.location}</p>
            </div>
            <button 
              onClick={closeJobDetails}
              className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className={`text-sm px-3 py-1 rounded-full font-medium ${getMatchScoreClass(selectedJob.match_score)}`}>
                {formatScore(selectedJob.match_score)} Match
              </div>
              {selectedJob.job_type && (
                <div className="text-sm px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-800">
                  {selectedJob.job_type}
                </div>
              )}
              {selectedJob.seniority_level && (
                <div className="text-sm px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-800">
                  {selectedJob.seniority_level}
                </div>
              )}
              {selectedJob.posted_date && (
                <div className="text-sm px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-800">
                  Posted: {formatDate(selectedJob.posted_date)}
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
              <div className="text-gray-600 whitespace-pre-line">{selectedJob.description}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-md font-semibold text-green-700 flex items-center mb-3">
                  <Check size={18} className="mr-2" /> 
                  Your Matching Skills ({selectedJob.matching_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.matching_skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-semibold text-red-700 flex items-center mb-3">
                  <X size={18} className="mr-2" /> 
                  Skills to Develop ({selectedJob.missing_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.missing_skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={closeJobDetails}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Back to List
              </button>
              
              <a
                href={selectedJob.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      ) : (
        // Jobs List View
        <>
          <div 
            className="bg-indigo-600 p-6 text-white flex justify-between items-center cursor-pointer"
            onClick={toggleExpand}
          >
            <div>
              <div className="flex items-center">
                <Briefcase className="mr-2" size={20} />
                <h2 className="text-xl font-semibold">AI-Powered Job Recommendations</h2>
              </div>
              <p className="text-indigo-100 mt-1">
                Personalized job matches using AI scoring of your skills and experience
              </p>
            </div>
            <ChevronRight 
              className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
              size={24} 
            />
          </div>

          {isExpanded && (
            <div className="p-6">
              <div className="space-y-4">
                {data.recommendations.slice(0, 5).map((job: RecommendedJob) => (
                  <div
                    key={job.id}
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition cursor-pointer"
                    onClick={() => viewJobDetails(job)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <div className={`text-sm px-3 py-1 rounded-full font-medium ${getMatchScoreClass(job.match_score)}`}>
                        {formatScore(job.match_score)} Match
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Check size={16} className="mr-1 text-green-600" />
                        <span>
                          <span className="font-medium">{job.matching_skills.length}</span> matching skills
                        </span>
                        <span className="mx-2">•</span>
                        <X size={16} className="mr-1 text-red-600" />
                        <span>
                          <span className="font-medium">{job.missing_skills.length}</span> skills to develop
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.matching_skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                        {job.matching_skills.length > 3 && (
                          <span className="bg-gray-50 text-gray-700 text-xs px-2 py-0.5 rounded">
                            +{job.matching_skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <button 
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewJobDetails(job);
                        }}
                      >
                        View Details <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {data.recommendations.length > 5 && (
                  <div className="text-center pt-2">
                    <button 
                      className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Could implement pagination or show all functionality here
                      }}
                    >
                      View All {data.recommendations.length} Jobs <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIJobRecommendations; 