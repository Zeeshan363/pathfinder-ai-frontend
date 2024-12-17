import React, { useState } from "react";
import { Camera, CheckCircle2, X, Plus } from "lucide-react";

interface FormData {
  about: string;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  education: {
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    major: string;
  }[];
  interests: string[];
  goals: string;
}

type SkillType = "technical" | "soft" | "languages";

const StudentProfileStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    about: "",
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
    education: [
      {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        major: "",
      },
    ],
    interests: [],
    goals: "",
  });

  // Handle adding new skill

  const handleSkillAdd = (
    type: SkillType,
    value: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ((e.key === "Enter" || e.key === ",") && value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [type]: [...prev.skills[type], value.trim()],
        },
      }));
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleSkillRemove = (type: SkillType, index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index),
      },
    }));
  };

  // Handle adding new education entry
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          startYear: "",
          endYear: "",
          major: "",
        },
      ],
    }));
  };

  // Handle education form change
  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Handle adding interest
  const handleInterestAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        interests: [
          ...prev.interests,
          (e.target as HTMLInputElement).value.trim(),
        ],
      }));
      (e.target as HTMLInputElement).value = "";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              About You
            </h2>
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-purple-50 flex items-center justify-center border-2 border-dashed border-purple-300 cursor-pointer hover:border-purple-500 transition-colors">
                <Camera className="w-8 h-8 text-purple-400" />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Upload your profile photo
              </p>
            </div>
            <textarea
              placeholder="Tell us about yourself..."
              rows={6}
              value={formData.about}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, about: e.target.value }))
              }
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Skills</h2>
            <div className="space-y-6">
              {Object.entries(formData.skills).map(([type, skills]) => (
                <div key={type}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Skills
                  </label>
                  <input
                    type="text"
                    placeholder={`Type and press Enter to add ${type} skills`}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleSkillAdd(
                        type as SkillType,
                        (e.target as HTMLInputElement).value,
                        e
                      )
                    }
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center gap-1"
                      >
                        {skill}
                        <X
                          className="w-4 h-4 cursor-pointer hover:text-purple-600"
                          onClick={() =>
                            handleSkillRemove(type as SkillType, index)
                          }
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Education Background
            </h2>
            <div className="max-h-96 overflow-y-auto space-y-6 pr-2">
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="space-y-4 p-4 border border-gray-200 rounded-xl"
                >
                  <input
                    type="text"
                    placeholder="Degree/Certificate"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Start Year"
                      value={edu.startYear}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "startYear",
                          e.target.value
                        )
                      }
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    />
                    <input
                      type="text"
                      placeholder="End Year"
                      value={edu.endYear}
                      onChange={(e) =>
                        handleEducationChange(index, "endYear", e.target.value)
                      }
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Major/Field of Study"
                    value={edu.major}
                    onChange={(e) =>
                      handleEducationChange(index, "major", e.target.value)
                    }
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleAddEducation}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Plus className="w-4 h-4" /> Add Another Education
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Interests
            </h2>
            <div>
              <input
                type="text"
                placeholder="Type and press Enter to add interests"
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                onKeyDown={handleInterestAdd}
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center gap-1"
                  >
                    {interest}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-purple-600"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          interests: prev.interests.filter(
                            (_, i) => i !== index
                          ),
                        }));
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Career Goals
            </h2>
            <textarea
              placeholder="Describe your career goals..."
              rows={6}
              value={formData.goals}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, goals: e.target.value }))
              }
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-700">
      <div className="relative">
        <div className="container mx-auto max-w-4xl pt-8 px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Pathfinder</h1>
          <p className="text-xl mb-8">
            Let's create your profile to start your journey towards success
          </p>

          <div className="relative mt-8 bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center 
                        ${
                          currentStep === step
                            ? "bg-purple-600 text-white"
                            : currentStep > step
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {currentStep > step ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step
                      )}
                    </div>
                    <div className="text-xs mt-2 text-gray-600">
                      {step === 1 && "About"}
                      {step === 2 && "Skills"}
                      {step === 3 && "Education"}
                      {step === 4 && "Interests"}
                      {step === 5 && "Goals"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
                <div
                  className="absolute top-0 h-1 bg-purple-600 transition-all duration-300"
                  style={{
                    width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex flex-col items-center">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 w-full max-w-lg">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep((current) => current - 1)}
                    className="flex-1 py-3 px-6 rounded-xl border border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={() => {
                    if (currentStep < totalSteps) {
                      setCurrentStep((current) => current + 1);
                    } else {
                      console.log("Form submitted!", formData);
                    }
                  }}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                >
                  {currentStep === totalSteps ? "Complete Profile" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileStepper;
