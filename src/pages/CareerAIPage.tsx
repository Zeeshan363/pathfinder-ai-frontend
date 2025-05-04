import React, { useState, useEffect } from 'react';
import { chatbotService } from '../services/chatbotService';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavbar from '../components/AuthenticatedNavbar';

interface Career {
  id: number;
  title: string;
  description: string;
  required_skills: string[];
  education: string[];
  salary_range: string;
  growth_potential: string;
  industry: string;
  match_score?: number;
}

interface SkillGap {
  matching_skills: string[];
  missing_skills: string[];
  match_percentage: number;
  career: Career;
}

const CareerAIPage: React.FC = () => {
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [careers, setCareers] = useState<Career[]>([]);
  const [recommendations, setRecommendations] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');
  const navigate = useNavigate();

  // Get user profile skills/interests on load
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        // Get user skills from profile here if available
        const response = await fetch('http://localhost:8000/api/profile/getProfileByJWT/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.technical_skills && data.technical_skills.length > 0) {
            setUserSkills(data.technical_skills);
          }
          if (data.interests && data.interests.length > 0) {
            setUserInterests(data.interests);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    getUserProfile();
  }, [navigate]);

  // Get all available careers
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const careerData = await chatbotService.getCareers();
        setCareers(careerData);
      } catch (error) {
        console.error('Error fetching careers:', error);
      }
    };

    fetchCareers();
  }, []);

  // Handle adding skills
  const handleAddSkill = () => {
    if (skillInput.trim() && !userSkills.includes(skillInput.trim())) {
      setUserSkills([...userSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Handle adding interests
  const handleAddInterest = () => {
    if (interestInput.trim() && !userInterests.includes(interestInput.trim())) {
      setUserInterests([...userInterests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  // Handle removing skills
  const handleRemoveSkill = (skill: string) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  // Handle removing interests
  const handleRemoveInterest = (interest: string) => {
    setUserInterests(userInterests.filter(i => i !== interest));
  };

  // Get recommendations based on skills and interests
  const getRecommendations = async () => {
    if (userSkills.length === 0) {
      alert('Please add at least one skill before getting recommendations');
      return;
    }

    setIsLoading(true);
    try {
      const recommendations = await chatbotService.getRecommendations(
        userSkills,
        userInterests,
        10
      );
      setRecommendations(recommendations);
      setActiveTab('recommendations');
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze skill gap for selected career
  const analyzeSkillGap = async (career: Career) => {
    setSelectedCareer(career);
    setIsLoading(true);
    
    try {
      const skillGapData = await chatbotService.getSkillGap(career.title, userSkills);
      setSkillGap(skillGapData);
      setActiveTab('skillGap');
    } catch (error) {
      console.error('Error analyzing skill gap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Career AI Counselor</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          
          {/* Skills Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {userSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{skill}</span>
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill (e.g. Python, JavaScript)"
                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                onClick={handleAddSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Interests Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {userInterests.map((interest, index) => (
                <div 
                  key={index} 
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{interest}</span>
                  <button 
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add an interest (e.g. AI, Healthcare)"
                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
              />
              <button
                onClick={handleAddInterest}
                className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
          </div>
          
          <button
            onClick={getRecommendations}
            disabled={isLoading || userSkills.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Processing...' : 'Get Career Recommendations'}
          </button>
        </div>
        
        {/* Results Section */}
        {(recommendations.length > 0 || skillGap) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'recommendations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Recommendations
                </button>
                {skillGap && (
                  <button
                    onClick={() => setActiveTab('skillGap')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'skillGap'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Skill Gap Analysis
                  </button>
                )}
              </nav>
            </div>
            
            {activeTab === 'recommendations' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Career Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((career) => (
                    <div 
                      key={career.id} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => analyzeSkillGap(career)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-blue-800">{career.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {Math.round(career.match_score! * 100)}% Match
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">{career.description}</p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700">Required Skills:</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {career.required_skills.slice(0, 5).map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {career.required_skills.length > 5 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{career.required_skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            analyzeSkillGap(career);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Analyze Skill Gap →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'skillGap' && skillGap && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Skill Gap Analysis: {skillGap.career.title}
                </h2>
                
                <div className="mb-6">
                  <p className="text-gray-700">{skillGap.career.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-green-800 mb-3">Skills You Have</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGap.matching_skills.length > 0 ? (
                        skillGap.matching_skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-600">You don't have any matching skills yet.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-red-800 mb-3">Skills You Need</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGap.missing_skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Skills Match</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full" 
                      style={{ width: `${skillGap.match_percentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    You have {skillGap.match_percentage}% of the required skills for this career
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Career Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Education</h4>
                      <ul className="mt-1 list-disc list-inside text-gray-600">
                        {skillGap.career.education.map((edu, idx) => (
                          <li key={idx}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Salary Range</h4>
                      <p className="mt-1 text-gray-600">{skillGap.career.salary_range}</p>
                      
                      <h4 className="text-sm font-medium text-gray-700 mt-4">Growth Potential</h4>
                      <p className="mt-1 text-gray-600">{skillGap.career.growth_potential}</p>
                      
                      <h4 className="text-sm font-medium text-gray-700 mt-4">Industry</h4>
                      <p className="mt-1 text-gray-600">{skillGap.career.industry}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAIPage; 