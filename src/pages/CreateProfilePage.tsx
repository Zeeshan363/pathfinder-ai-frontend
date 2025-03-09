import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    about: '',
    technicalSkills: [] as string[],
    softSkills: [] as string[],
    languages: [] as string[],
    interests: [] as string[],
    careerGoals: '',
    education: [] as any[]
  });

  const [newSkill, setNewSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [error, setError] = useState('');

  const [educationForm, setEducationForm] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    major: ''
  });

  const createProfileMutation = useMutation({
    mutationFn: (profileData: any) => api.post('/profile', profileData),
    onSuccess: () => {
      toast.success('Profile created successfully');
      navigate('/dashboard');
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create profile. Please try again.');
      toast.error('Failed to create profile');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEducationForm(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (educationForm.degree && educationForm.institution && educationForm.startYear && educationForm.major) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, educationForm]
      }));
      setEducationForm({
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
        major: ''
      });
    }
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addTechnicalSkill = () => {
    if (newSkill && !formData.technicalSkills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s !== skill)
    }));
  };

  const addSoftSkill = () => {
    if (newSoftSkill && !formData.softSkills.includes(newSoftSkill)) {
      setFormData(prev => ({
        ...prev,
        softSkills: [...prev.softSkills, newSoftSkill]
      }));
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter(s => s !== skill)
    }));
  };

  const addLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const addInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createProfileMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-600 p-6 text-white">
            <h1 className="text-2xl font-semibold">Create Your Profile</h1>
            <p className="text-purple-100 mt-1">
              Let us know more about you to provide personalized career recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                About Me
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technical Skills
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="E.g., JavaScript, Python, SQL..."
                />
                <button
                  type="button"
                  onClick={addTechnicalSkill}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technicalSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeTechnicalSkill(skill)}
                      className="ml-2 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soft Skills
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="E.g., Communication, Leadership..."
                />
                <button
                  type="button"
                  onClick={addSoftSkill}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.softSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSoftSkill(skill)}
                      className="ml-2 text-green-800 hover:text-green-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="E.g., English, Spanish..."
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.languages.map((language, index) => (
                  <div 
                    key={index} 
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="ml-2 text-purple-800 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interests
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="E.g., Data Analysis, Web Design..."
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-2 text-yellow-800 hover:text-yellow-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700 mb-1">
                Career Goals
              </label>
              <textarea
                id="careerGoals"
                name="careerGoals"
                rows={3}
                value={formData.careerGoals}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What are your career aspirations?"
              ></textarea>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">Education</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={educationForm.degree}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="E.g., Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={educationForm.institution}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="E.g., University of Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Year
                    </label>
                    <input
                      type="text"
                      name="startYear"
                      value={educationForm.startYear}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="E.g., 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Year (or expected)
                    </label>
                    <input
                      type="text"
                      name="endYear"
                      value={educationForm.endYear}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="E.g., 2024 (leave blank if ongoing)"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major/Field of Study
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={educationForm.major}
                      onChange={handleEducationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="E.g., Computer Science"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                >
                  Add Education
                </button>
              </div>

              {formData.education.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Education History</h4>
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="mb-3 p-3 border border-gray-200 rounded-md bg-white flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {edu.degree} in {edu.major}
                        </p>
                        <p className="text-gray-600 text-sm">{edu.institution}</p>
                        <p className="text-gray-500 text-xs">
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end mt-8 space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createProfileMutation.isPending}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
              >
                {createProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfilePage;