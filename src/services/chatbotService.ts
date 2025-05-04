import api from './api';

export interface ChatbotResponse {
  text: string;
  context: any;
  recommendations?: any[];
  skill_gap?: any;
  career?: any;
}

export const chatbotService = {
  /**
   * Send a message to the chatbot and get a response
   */
  sendMessage: async (
    message: string,
    context: any = null,
    useProfile: boolean = true
  ): Promise<ChatbotResponse> => {
    try {
      const response = await api.post('/career/chatbot/', {
        message,
        context,
        use_profile: useProfile,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error in chatbot service:', error);
      throw error;
    }
  },

  /**
   * Get career recommendations based on skills and interests
   */
  getRecommendations: async (
    skills: string[],
    interests: string[] = [],
    limit: number = 5
  ) => {
    try {
      const response = await api.post('/career/recommend/', {
        skills,
        interests,
        limit,
      });
      
      return response.data.recommendations;
    } catch (error) {
      console.error('Error getting career recommendations:', error);
      throw error;
    }
  },

  /**
   * Get skill gap analysis for a specific career
   */
  getSkillGap: async (careerTitle: string, skills: string[] = []) => {
    try {
      const response = await api.post('/career/skill_gap/', {
        career_title: careerTitle,
        skills,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting skill gap analysis:', error);
      throw error;
    }
  },

  /**
   * Get all available careers
   */
  getCareers: async () => {
    try {
      const response = await api.get('/career/careers/');
      return response.data.careers;
    } catch (error) {
      console.error('Error getting careers:', error);
      throw error;
    }
  },
}; 