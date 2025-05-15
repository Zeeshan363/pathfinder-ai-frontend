import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';

interface ProfileSectionProps {
  profile: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const navigate = useNavigate();

  if (!profile) return null;

  // Check if profile exists (has an ID)
  const hasProfile = !!profile && !!profile.id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-600 p-6 text-white flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile</h2>
        {hasProfile && (
          <button
            onClick={() => navigate('/profile/edit')}
            className="flex items-center text-white hover:text-purple-200 transition-colors"
          >
            <Pencil size={16} className="mr-1" />
            Edit
          </button>
        )}
      </div>

      <div className="p-6">
        {hasProfile ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-purple-600 text-4xl font-bold">
                    {profile.about ? profile.about.charAt(0).toUpperCase() : 'P'}
                  </span>
                )}
              </div>
            </div>

            {profile.about && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">About</h4>
                <p className="text-gray-700">{profile.about}</p>
              </div>
            )}

            {profile.technical_skills && profile.technical_skills.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.technical_skills.map((skill: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.soft_skills && profile.soft_skills.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.soft_skills.map((skill: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.languages && profile.languages.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((language: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.career_goals && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Career Goals</h4>
                <p className="text-gray-700">{profile.career_goals}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              You haven't created your profile yet.
            </p>
            <button
              onClick={() => navigate('/profile/create')}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Create Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;