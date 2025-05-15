import api from './api';

export interface Feedback {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    name: string;
    role: string;
  };
  subject: string;
  message: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
  created_at: string;
  updated_at: string;
}

export interface FeedbackResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Feedback[];
}

export interface FeedbackCreate {
  subject: string;
  message: string;
}

export const feedbackService = {
  /**
   * Get all feedback (admin only)
   */
  getAllFeedback: async (page: number = 1): Promise<FeedbackResponse> => {
    try {
      const response = await api.get(`/feedback/?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all feedback:', error);
      throw error;
    }
  },

  /**
   * Get current user's feedback
   */
  getUserFeedback: async (page: number = 1): Promise<FeedbackResponse> => {
    try {
      const response = await api.get(`/feedback/user/?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user feedback:', error);
      throw error;
    }
  },

  /**
   * Create new feedback
   */
  createFeedback: async (feedback: FeedbackCreate): Promise<Feedback> => {
    try {
      const response = await api.post('/feedback/create/', feedback);
      return response.data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  },

  /**
   * Update feedback status (admin only)
   */
  updateFeedbackStatus: async (
    feedbackId: number, 
    status: 'PENDING' | 'REVIEWED' | 'RESOLVED'
  ): Promise<Feedback> => {
    try {
      const response = await api.put(`/feedback/update/${feedbackId}/`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating feedback status for ID ${feedbackId}:`, error);
      throw error;
    }
  }
}; 