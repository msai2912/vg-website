import React from "react";

const AssessmentForm = ({ register, errors, watch }) => {
  const height = watch("assessment.height");
  const weight = watch("assessment.weight");

  const calculateBMI = () => {
    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (!bmi) return "";
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const bmi = calculateBMI();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Initial Assessment
        </h3>
        <p className="text-sm text-gray-600">
          Comprehensive student evaluation (optional)
        </p>
      </div>

      {/* Health Assessment */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Health Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("assessment.height", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.assessment?.height ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="150.5"
            />
            {errors.assessment?.height && (
              <p className="mt-1 text-sm text-red-600">
                {errors.assessment.height.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("assessment.weight", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.assessment?.weight ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="45.5"
            />
            {errors.assessment?.weight && (
              <p className="mt-1 text-sm text-red-600">
                {errors.assessment.weight.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BMI
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
              {bmi ? (
                <div>
                  <span className="font-semibold text-lg">{bmi}</span>
                  <span
                    className={`ml-2 text-sm px-2 py-1 rounded-full ${
                      getBMICategory(bmi) === "Normal"
                        ? "bg-green-100 text-green-800"
                        : getBMICategory(bmi) === "Underweight"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {getBMICategory(bmi)}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">Auto-calculated</span>
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Notes
            </label>
            <textarea
              {...register("assessment.healthNotes")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any health conditions, allergies, or medical notes"
            />
          </div>
        </div>
      </div>

      {/* Academic Skills Assessment */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-green-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Academic Skills (Score out of 100)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              General Knowledge
            </label>
            <input
              type="number"
              {...register("assessment.generalKnowledgeScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="85"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Speaking
            </label>
            <input
              type="number"
              {...register("assessment.englishSpeakingScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="75"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Reading
            </label>
            <input
              type="number"
              {...register("assessment.englishReadingScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="80"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Writing
            </label>
            <input
              type="number"
              {...register("assessment.englishWritingScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="70"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Soft Skills Assessment */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-purple-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Soft Skills & Leadership (Score out of 100)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leadership Skills
            </label>
            <input
              type="number"
              {...register("assessment.leadershipScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="65"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Skills
            </label>
            <input
              type="number"
              {...register("assessment.communicationScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="70"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teamwork Skills
            </label>
            <input
              type="number"
              {...register("assessment.teamworkScore", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="80"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creativity Skills
            </label>
            <input
              type="number"
              {...register("assessment.creativityScore", {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="75"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leadership Notes
          </label>
          <textarea
            {...register("assessment.leadershipNotes")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Observations about leadership potential, team participation, initiative, etc."
          />
        </div>
      </div>

      {/* Assessment Metadata */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Assessment Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Type
            </label>
            <select
              {...register("assessment.assessmentType")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="">Select Type</option>
              <option value="initial">Initial Assessment</option>
              <option value="quarterly">Quarterly Review</option>
              <option value="mid-year">Mid-Year Assessment</option>
              <option value="annual">Annual Assessment</option>
              <option value="special">Special Assessment</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Notes & Observations
            </label>
            <textarea
              {...register("assessment.overallNotes")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="General observations, strengths, areas for improvement, recommendations, etc."
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="flex-shrink-0 h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                All assessment fields are optional during registration. You can
                conduct detailed assessments later and update the student's
                profile. This initial assessment helps establish a baseline for
                tracking progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;
