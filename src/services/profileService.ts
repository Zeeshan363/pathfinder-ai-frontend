import api from './api';

export interface Education {
  id: number;
  degree: string;
  institution: string;
  start_year: string;
  end_year: string | null;
  major: string;
}

export interface Experience {
  id: number;
  company_name: string;
  total_years_experience: string;
}

export interface Profile {
  id: number;
  about: string | null;
  photo_url: string | null;
  technical_skills: string[];
  soft_skills: string[];
  languages: string[];
  interests: string[];
  career_goals: string | null;
  education: Education[];
  experience: Experience[];
}

export interface CreateProfileData {
  about?: string;
  photo_url?: string;
  technical_skills: string[];
  soft_skills: string[];
  languages: string[];
  interests: string[];
  career_goals?: string;
}

export interface UpdateProfileData extends CreateProfileData {}

export const profileService = {
  /**
   * Get the current user's profile
   */
  getProfile: async (): Promise<Profile> => {
    try {
      const response = await api.get('/profile/getProfileByJWT/');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  /**
   * Create a new profile
   */
  createProfile: async (profileData: CreateProfileData): Promise<Profile> => {
    try {
      const response = await api.post('/profile/createProfile/', profileData);
      return response.data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  },

  /**
   * Update an existing profile
   */
  updateProfile: async (profileData: UpdateProfileData): Promise<Profile> => {
    try {
      const response = await api.put('/profile/updateProfile/', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Add education to profile
   */
  addEducation: async (educationData: Omit<Education, 'id'>): Promise<Education> => {
    try {
      const response = await api.post('/profile/addEducationToProfile/', educationData);
      return response.data;
    } catch (error) {
      console.error('Error adding education:', error);
      throw error;
    }
  },

  /**
   * Delete education from profile
   */
  deleteEducation: async (educationId: number): Promise<void> => {
    try {
      await api.delete(`/profile/deleteEducationFromProfile/${educationId}/`);
    } catch (error) {
      console.error('Error deleting education:', error);
      throw error;
    }
  },

  /**
   * Add experience to profile
   */
  addExperience: async (experienceData: Omit<Experience, 'id'>): Promise<Experience> => {
    try {
      const response = await api.post('/profile/addExperienceToProfile/', experienceData);
      return response.data;
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
  },

  /**
   * Delete experience from profile
   */
  deleteExperience: async (experienceId: number): Promise<void> => {
    try {
      await api.delete(`/profile/deleteExperienceFromProfile/${experienceId}/`);
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }
};

export default profileService; 