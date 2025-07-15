import React from "react";
import { useFieldArray } from "react-hook-form";

const AcademicRecordsForm = ({ register, errors, control, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicRecords",
  });

  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;

  const addSubject = () => {
    append({
      subjectName: "",
      marks: "",
      maxMarks: 100,
      term: "",
      academicYear: academicYear,
      remarks: "",
    });
  };

  const commonSubjects = [
    "Mathematics",
    "English",
    "Hindi",
    "Science",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Computer Science",
    "Physical Education",
    "Art",
    "Music",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Academic Records
        </h3>
        <p className="text-sm text-gray-600">
          Add previous academic performance (optional)
        </p>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="mt-2 text-sm font-medium text-gray-900">
            No academic records added
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a subject record
          </p>
          <button
            type="button"
            onClick={addSubject}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Subject Record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Subject {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove this subject"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm3 3a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Subject Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Name *
                  </label>
                  <select
                    {...register(`academicRecords.${index}.subjectName`)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.academicRecords?.[index]?.subjectName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Subject</option>
                    {commonSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.academicRecords?.[index]?.subjectName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.academicRecords[index].subjectName.message}
                    </p>
                  )}
                </div>

                {/* Marks Obtained */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks Obtained *
                  </label>
                  <input
                    type="number"
                    {...register(`academicRecords.${index}.marks`, {
                      valueAsNumber: true,
                    })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.academicRecords?.[index]?.marks
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter marks"
                    min="0"
                  />
                  {errors.academicRecords?.[index]?.marks && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.academicRecords[index].marks.message}
                    </p>
                  )}
                </div>

                {/* Maximum Marks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Marks *
                  </label>
                  <input
                    type="number"
                    {...register(`academicRecords.${index}.maxMarks`, {
                      valueAsNumber: true,
                    })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.academicRecords?.[index]?.maxMarks
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="100"
                    min="1"
                  />
                  {errors.academicRecords?.[index]?.maxMarks && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.academicRecords[index].maxMarks.message}
                    </p>
                  )}
                </div>

                {/* Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term/Exam
                  </label>
                  <select
                    {...register(`academicRecords.${index}.term`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Term</option>
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Mid-term">Mid-term</option>
                    <option value="Final">Final</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>

                {/* Academic Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    {...register(`academicRecords.${index}.academicYear`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="2024-25"
                    defaultValue={academicYear}
                  />
                </div>

                {/* Percentage Display */}
                <div className="flex items-center">
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentage
                    </label>
                    <div className="text-2xl font-bold text-green-600">
                      {(() => {
                        const marks = watch(`academicRecords.${index}.marks`);
                        const maxMarks = watch(
                          `academicRecords.${index}.maxMarks`
                        );
                        if (marks && maxMarks && maxMarks > 0) {
                          return `${((marks / maxMarks) * 100).toFixed(1)}%`;
                        }
                        return "-%";
                      })()}
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks/Comments
                  </label>
                  <textarea
                    {...register(`academicRecords.${index}.remarks`)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Teacher's comments or additional notes"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSubject}
            className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-700 hover:border-green-400 hover:bg-green-50 transition-colors duration-200"
          >
            <svg
              className="inline-block w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Another Subject
          </button>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="flex-shrink-0 h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Information</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Academic records are optional during registration. You can add
                them now or later from the student's profile. This helps track
                the student's academic progress over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicRecordsForm;
