import api from './api';

export interface ChatbotResponse {
  text: string;
  context: any;
  recommendations?: any[];
  skill_gap?: any;
  career?: any;
}

export interface TrainingResponse {
  success: string;
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
      // For unauthenticated users, always set useProfile to false
      const token = localStorage.getItem('token');
      const shouldUseProfile = token ? useProfile : false;

      const response = await api.post('/career/chatbot/', {
        message,
        context,
        use_profile: shouldUseProfile,
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Error in chatbot service:', error);
      // Return a friendly error message for unauthenticated users
      if (error.response?.status === 401) {
        return {
          text: "I can help you with general career information. For personalized recommendations, please sign in.",
          context: {
            last_intent: "fallback",
            mentioned_career: null,
            awaiting_skills: false,
            awaiting_career: false
          }
        };
      }
      throw error;
    }
  },

  /**
   * Train the chatbot with a new example
   */
  trainChatbot: async (
    message: string,
    intent: string,
    response?: string
  ): Promise<TrainingResponse> => {
    try {
      const payload: any = {
        message,
        intent
      };
      
      if (response) {
        payload.response = response;
      }
      
      const result = await api.post('/career/train_chatbot/', payload);
      return result.data;
    } catch (error) {
      console.error('Error training chatbot:', error);
      throw error;
    }
  },
  
  /**
   * Create a new intent for the chatbot
   */
  createIntent: async (
    tag: string,
    patterns: string[],
    responses: string[]
  ): Promise<TrainingResponse> => {
    try {
      const result = await api.post('/career/train_chatbot/', {
        new_intent: tag,
        patterns,
        responses
      });
      return result.data;
    } catch (error) {
      console.error('Error creating new intent:', error);
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