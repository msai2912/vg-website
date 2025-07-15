import React from "react";

const RegistrationSummary = ({ data, centers }) => {
  const selectedCenter = centers.find((center) => center.id === data.centerId);

  const calculateBMI = (height, weight) => {
    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getScoreColor = (score) => {
    if (!score) return "text-gray-500";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const calculateAverageScore = (scores) => {
    const validScores = scores.filter(
      (score) => score !== undefined && score !== null && score !== ""
    );
    if (validScores.length === 0) return null;
    const sum = validScores.reduce((acc, score) => acc + score, 0);
    return (sum / validScores.length).toFixed(1);
  };

  const academicScores = [
    data.assessment?.generalKnowledgeScore,
    data.assessment?.englishSpeakingScore,
    data.assessment?.englishReadingScore,
    data.assessment?.englishWritingScore,
  ];

  const softSkillScores = [
    data.assessment?.leadershipScore,
    data.assessment?.communicationScore,
    data.assessment?.teamworkScore,
    data.assessment?.creativityScore,
  ];

  const academicAverage = calculateAverageScore(academicScores);
  const softSkillAverage = calculateAverageScore(softSkillScores);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Registration Summary
        </h3>
        <p className="text-gray-600">
          Please review all information before submitting
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Basic Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{data.name || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Age:</span>
            <span className="text-gray-900">{data.age || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Grade:</span>
            <span className="text-gray-900">
              {data.grade ? `Grade ${data.grade}` : "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Contact:</span>
            <span className="text-gray-900">
              {data.contact || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">School:</span>
            <span className="text-gray-900">
              {data.school || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Caste:</span>
            <span className="text-gray-900">
              {data.caste || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between md:col-span-2">
            <span className="font-medium text-gray-700">Center:</span>
            <span className="text-gray-900">
              {selectedCenter?.name || "Not selected"}
            </span>
          </div>
          {data.address && (
            <div className="flex justify-between md:col-span-2">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="text-gray-900">{data.address}</span>
            </div>
          )}
        </div>

        {(data.guardianName || data.guardianContact) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-medium text-gray-700 mb-2">
              Guardian Information
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {data.guardianName && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Guardian Name:
                  </span>
                  <span className="text-gray-900">{data.guardianName}</span>
                </div>
              )}
              {data.guardianContact && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Guardian Contact:
                  </span>
                  <span className="text-gray-900">{data.guardianContact}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {data.familyProblems && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-medium text-gray-700 mb-2">
              Family Problems/Notes
            </h5>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
              {data.familyProblems}
            </p>
          </div>
        )}
      </div>

      {/* Academic Records */}
      {data.academicRecords && data.academicRecords.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-600"
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
            Academic Records ({data.academicRecords.length} subjects)
          </h4>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Term
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.academicRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.subjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.marks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.maxMarks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-semibold ${
                          record.marks && record.maxMarks
                            ? (record.marks / record.maxMarks) * 100 >= 80
                              ? "text-green-600"
                              : (record.marks / record.maxMarks) * 100 >= 60
                              ? "text-yellow-600"
                              : "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {record.marks && record.maxMarks
                          ? `${((record.marks / record.maxMarks) * 100).toFixed(
                              1
                            )}%`
                          : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.term || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assessment Summary */}
      {data.assessment &&
        Object.keys(data.assessment).some(
          (key) =>
            data.assessment[key] !== undefined && data.assessment[key] !== ""
        ) && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Assessment Summary
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Health Information */}
              {(data.assessment.height || data.assessment.weight) && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">
                    Health Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    {data.assessment.height && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">Height:</span>
                        <span className="text-blue-900">
                          {data.assessment.height} cm
                        </span>
                      </div>
                    )}
                    {data.assessment.weight && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">Weight:</span>
                        <span className="text-blue-900">
                          {data.assessment.weight} kg
                        </span>
                      </div>
                    )}
                    {data.assessment.height && data.assessment.weight && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">BMI:</span>
                        <span className="text-blue-900 font-semibold">
                          {calculateBMI(
                            data.assessment.height,
                            data.assessment.weight
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Academic Skills */}
              {academicAverage && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">
                    Academic Skills
                  </h5>
                  <div className="space-y-2 text-sm">
                    {data.assessment.generalKnowledgeScore && (
                      <div className="flex justify-between">
                        <span className="text-green-700">
                          General Knowledge:
                        </span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.generalKnowledgeScore
                          )}`}
                        >
                          {data.assessment.generalKnowledgeScore}/100
                        </span>
                      </div>
                    )}
                    {data.assessment.englishSpeakingScore && (
                      <div className="flex justify-between">
                        <span className="text-green-700">
                          English Speaking:
                        </span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.englishSpeakingScore
                          )}`}
                        >
                          {data.assessment.englishSpeakingScore}/100
                        </span>
                      </div>
                    )}
                    {data.assessment.englishReadingScore && (
                      <div className="flex justify-between">
                        <span className="text-green-700">English Reading:</span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.englishReadingScore
                          )}`}
                        >
                          {data.assessment.englishReadingScore}/100
                        </span>
                      </div>
                    )}
                    {data.assessment.englishWritingScore && (
                      <div className="flex justify-between">
                        <span className="text-green-700">English Writing:</span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.englishWritingScore
                          )}`}
                        >
                          {data.assessment.englishWritingScore}/100
                        </span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-green-200">
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">
                          Average:
                        </span>
                        <span
                          className={`font-bold ${getScoreColor(
                            parseFloat(academicAverage)
                          )}`}
                        >
                          {academicAverage}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Soft Skills */}
              {softSkillAverage && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">
                    Soft Skills
                  </h5>
                  <div className="space-y-2 text-sm">
                    {data.assessment.leadershipScore && (
                      <div className="flex justify-between">
                        <span className="text-purple-700">Leadership:</span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.leadershipScore
                          )}`}
                        >
                          {data.assessment.leadershipScore}/100
                        </span>
                      </div>
                    )}
                    {data.assessment.communicationScore && (
                      <div className="flex justify-between">
                        <span className="text-purple-700">Communication:</span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.communicationScore
                          )}`}
                        >
                          {data.assessment.communicationScore}/100
                        </span>
                      </div>
                    )}
                    {data.assessment.teamworkScore && (
                      <div className="flex justify-between">
                        <span className="text-purple-700">Teamwork:</span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.teamworkScore
                          )}`}
                        >
                          {data.assessment.teamworkScore}/100
                        </span>
                      </div>
                    )}
                    {data.assessment.creativityScore && (
                      <div className="flex justify-between">
                        <span className="text-purple-700">Creativity:</span>
                        <span
                          className={`font-semibold ${getScoreColor(
                            data.assessment.creativityScore
                          )}`}
                        >
                          {data.assessment.creativityScore}/100
                        </span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-purple-200">
                      <div className="flex justify-between">
                        <span className="text-purple-700 font-medium">
                          Average:
                        </span>
                        <span
                          className={`font-bold ${getScoreColor(
                            parseFloat(softSkillAverage)
                          )}`}
                        >
                          {softSkillAverage}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Assessment Type */}
              {data.assessment.assessmentType && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">
                    Assessment Type
                  </h5>
                  <p className="text-sm text-gray-900 capitalize">
                    {data.assessment.assessmentType}
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="mt-4 space-y-4">
              {data.assessment.healthNotes && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">
                    Health Notes
                  </h5>
                  <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-md">
                    {data.assessment.healthNotes}
                  </p>
                </div>
              )}
              {data.assessment.leadershipNotes && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">
                    Leadership Notes
                  </h5>
                  <p className="text-sm text-gray-900 bg-purple-50 p-3 rounded-md">
                    {data.assessment.leadershipNotes}
                  </p>
                </div>
              )}
              {data.assessment.overallNotes && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">
                    Overall Notes
                  </h5>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {data.assessment.overallNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="flex-shrink-0 h-5 w-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Ready to Submit
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Please review all the information above. Once you click
                "Complete Registration", the student will be added to the system
                with all the provided details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSummary;
