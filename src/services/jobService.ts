import api from './api';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  job_url: string;
  logo_url: string;
  source: string;
  posted_date: string;
  skills: string[];
  job_type: string;
  seniority_level: string;
  salary_range: string;
}

export interface RelevantJob extends Job {
  relevance_score: number;
  matching_skills: string[];
}

export interface RecommendedJob extends Job {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
}

export interface JobsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[];
}

export interface RelevantJobsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RelevantJob[];
}

export interface RecommendedJobsResponse {
  recommendations: RecommendedJob[];
}

export const jobService = {
  /**
   * Get paginated job listings with optional filters
   */
  getJobs: async (
    page: number = 1,
    search?: string,
    location?: string,
    job_type?: string,
    source?: string,
    skill?: string
  ): Promise<JobsResponse> => {
    try {
      let url = `/jobs/?page=${page}`;
      
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (location) url += `&location=${encodeURIComponent(location)}`;
      if (job_type) url += `&job_type=${encodeURIComponent(job_type)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (skill) url += `&skill=${encodeURIComponent(skill)}`;
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  /**
   * Get details for a specific job
   */
  getJobDetails: async (jobId: number): Promise<Job> => {
    try {
      const response = await api.get(`/jobs/${jobId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job details for job ID ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Get jobs relevant to the user's profile
   */
  getRelevantJobs: async (page: number = 1): Promise<RelevantJobsResponse> => {
    try {
      const response = await api.get(`/jobs/relevant/?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching relevant jobs:', error);
      throw error;
    }
  },

  /**
   * Get AI-powered job recommendations
   */
  getRecommendedJobs: async (): Promise<RecommendedJobsResponse> => {
    try {
      const response = await api.post('/jobs/recommend/');
      return response.data;
    } catch (error) {
      console.error('Error fetching AI job recommendations:', error);
      throw error;
    }
  },

  /**
   * Trigger job scraping for specific keywords
   */
  scrapeJobs: async (
    keywords: string,
    location: string = '',
    limit: number = 25
  ): Promise<{ message: string; jobs_found: number; jobs_stored: number }> => {
    try {
      const response = await api.post('/jobs/scrape/', {
        keywords,
        location,
        limit
      });
      return response.data;
    } catch (error) {
      console.error('Error triggering job scrape:', error);
      throw error;
    }
  }
};

export default jobService; 