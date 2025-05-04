import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ThumbsUp, ThumbsDown, Info, CheckCircle } from 'lucide-react';
import { chatbotService, ChatbotResponse } from '../../services/chatbotService';
import './ChatBot.css';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasFeedback?: boolean;
  lastUserMessage?: string;
}

interface FeedbackData {
  messageId: string;
  userMessage: string;
  botMessage: string;
  intent: string;
  showForm: boolean;
  trainingResponse: string;
}

interface ChatBotProps {
  className?: string;
}

// List of available intents (simplified for the UI)
const INTENTS = [
  { value: 'greeting', label: 'Greeting' },
  { value: 'goodbye', label: 'Goodbye' },
  { value: 'thanks', label: 'Thanks' },
  { value: 'career_recommendation', label: 'Career Recommendation' },
  { value: 'skill_gap', label: 'Skill Gap' },
  { value: 'course_recommendation', label: 'Course Recommendation' },
  { value: 'career_information', label: 'Career Information' },
  { value: 'fallback', label: 'Fallback/Other' }
];

const ChatBot: React.FC<ChatBotProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! 👋 I\'m your career assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatContext, setChatContext] = useState<any>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [trainingSuccess, setTrainingSuccess] = useState<boolean | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastUserMessage = useRef<string>('');

  // Check if user is admin (has staff permissions)
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserIsAdmin(user.is_staff === true);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, feedback]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateMessageId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: generateMessageId(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    
    // Save the user message for potential training
    lastUserMessage.current = inputValue;
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response: ChatbotResponse = await chatbotService.sendMessage(
        userMessage.text,
        chatContext,
        true
      );
      
      const { text, context } = response;
      
      setChatContext(context);
      
      const botMessage: Message = {
        id: generateMessageId(),
        text: text,
        isBot: true,
        timestamp: new Date(),
        lastUserMessage: userMessage.text,
        hasFeedback: false
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      const errorMessage: Message = {
        id: generateMessageId(),
        text: 'Sorry, I encountered an error. Please try again later.',
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle feedback button click
  const handleFeedback = (messageId: string, isPositive: boolean, userMessage: string, botMessage: string) => {
    if (!isPositive && userIsAdmin) {
      // For negative feedback from admin users, show the training form
      setFeedback({
        messageId,
        userMessage,
        botMessage,
        intent: 'fallback', // Default intent
        showForm: true,
        trainingResponse: ''
      });
    } else if (!isPositive) {
      // For negative feedback from regular users, just mark as received
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, hasFeedback: true } : msg
      );
      setMessages(updatedMessages);
      
      // Optionally add a thank you message
      const thankYouMessage: Message = {
        id: generateMessageId(),
        text: "Thank you for your feedback! This helps me improve.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, thankYouMessage]);
    } else {
      // For positive feedback, just mark as received
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, hasFeedback: true } : msg
      );
      setMessages(updatedMessages);
    }
  };

  // Handle intent selection
  const handleIntentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (feedback) {
      setFeedback({
        ...feedback,
        intent: e.target.value
      });
    }
  };

  // Handle training response input
  const handleTrainingResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (feedback) {
      setFeedback({
        ...feedback,
        trainingResponse: e.target.value
      });
    }
  };

  // Submit training data
  const handleSubmitTraining = async () => {
    if (!feedback) return;
    
    try {
      await chatbotService.trainChatbot(
        feedback.userMessage,
        feedback.intent,
        feedback.trainingResponse || undefined
      );
      
      // Mark training as successful
      setTrainingSuccess(true);
      
      // Add a confirmation message
      const confirmationMessage: Message = {
        id: generateMessageId(),
        text: "Thanks for training me! I've learned from your feedback.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
      
      // Clear the feedback form after a short delay
      setTimeout(() => {
        setFeedback(null);
        setTrainingSuccess(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting training data:', error);
      setTrainingSuccess(false);
    }
  };

  // Cancel training
  const handleCancelTraining = () => {
    setFeedback(null);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${className || ''}`}>
      {/* Chatbot toggle button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Career Assistant</h3>
            <button 
              onClick={toggleChat} 
              className="chatbot-close"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.isBot ? 'bot' : 'user'}`}
              >
                <p>{message.text}</p>
                <small className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
                
                {/* Feedback buttons for bot messages only */}
                {message.isBot && message.id !== '1' && !message.hasFeedback && message.lastUserMessage && (
                  <div className="message-feedback">
                    <button 
                      onClick={() => handleFeedback(message.id, true, message.lastUserMessage!, message.text)}
                      className="feedback-button positive"
                      aria-label="Helpful response"
                      title="This was helpful"
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button 
                      onClick={() => handleFeedback(message.id, false, message.lastUserMessage!, message.text)}
                      className="feedback-button negative"
                      aria-label="Unhelpful response"
                      title="This wasn't helpful"
                    >
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                )}
                
                {/* Feedback received indicator */}
                {message.isBot && message.hasFeedback && (
                  <div className="feedback-received">
                    <small>Feedback received</small>
                    <CheckCircle size={12} />
                  </div>
                )}
              </div>
            ))}
            
            {/* Training form for admin users */}
            {feedback && feedback.showForm && (
              <div className="chatbot-training-form">
                <h4>Train ChatBot</h4>
                <p className="training-context">
                  <strong>User said:</strong> {feedback.userMessage}<br/>
                  <strong>Bot replied:</strong> {feedback.botMessage}
                </p>
                
                <div className="form-group">
                  <label htmlFor="intent-select">Select correct intent:</label>
                  <select 
                    id="intent-select"
                    value={feedback.intent}
                    onChange={handleIntentChange}
                    className="intent-select"
                  >
                    {INTENTS.map(intent => (
                      <option key={intent.value} value={intent.value}>
                        {intent.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="correct-response">Better response (optional):</label>
                  <textarea 
                    id="correct-response"
                    value={feedback.trainingResponse}
                    onChange={handleTrainingResponseChange}
                    className="training-response"
                    rows={3}
                    placeholder="Enter a better response for future similar questions..."
                  />
                </div>
                
                {trainingSuccess === true && (
                  <div className="training-success">
                    <CheckCircle size={14} />
                    <span>Training submitted successfully!</span>
                  </div>
                )}
                
                {trainingSuccess === false && (
                  <div className="training-error">
                    <Info size={14} />
                    <span>Error submitting training. Try again.</span>
                  </div>
                )}
                
                <div className="training-actions">
                  <button 
                    onClick={handleCancelTraining}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitTraining}
                    className="submit-button"
                  >
                    Submit Training
                  </button>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="chatbot-message bot loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="chatbot-input"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="chatbot-send-button"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 