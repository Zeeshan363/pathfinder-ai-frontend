import React from 'react';

interface RecommendationsSectionProps {
  recommendations: any[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-600 p-6 text-white">
        <h2 className="text-xl font-semibold">Career Recommendations</h2>
        <p className="text-purple-100 mt-1">
          Based on your profile, these career paths might be a good fit for you
        </p>
      </div>

      <div className="p-6">
        {recommendations.map((career) => (
          <div
            key={career.id}
            className="mb-6 p-5 border border-gray-100 rounded-lg hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{career.name}</h3>
              <div className="flex items-center">
                <div 
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    career.matchScore >= 80
                      ? 'bg-green-100 text-green-800'
                      : career.matchScore >= 60
                      ? 'bg-blue-100 text-blue-800'
                      : career.matchScore >= 40
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {career.matchScore}% Match
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{career.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {career.requiredSkills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Related Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {career.relatedInterests.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            {/* <button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Learn More
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;