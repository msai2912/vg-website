import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UserContext from "../context/UserContext";

const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name is too long"),
  age: z
    .number()
    .min(5, "Age must be at least 5")
    .max(25, "Age must be at most 25"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(20, "Contact number is too long"),
  caste: z.string().optional(),
  grade: z
    .number()
    .min(1, "Grade is required")
    .max(12, "Grade must be between 1-12"),
  school: z.string().optional(),
  address: z.string().optional(),
  centerId: z.number().min(1, "Please select a center"),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  familyProblems: z.string().optional(),
});

const StudentRegistration = () => {
  const { user, addStudent, getCenters } = useContext(UserContext);
  const [centers, setCenters] = useState([]);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      age: undefined,
      contact: "",
      caste: "",
      grade: undefined,
      school: "",
      address: "",
      centerId: undefined,
      guardianName: "",
      guardianContact: "",
      familyProblems: "",
    },
  });

  useEffect(() => {
    const fetchCenters = async () => {
      const result = await getCenters();
      if (result.success) {
        setCenters(result.centers);
        if (user?.role === "educator" && result.centers.length === 1) {
          setValue("centerId", result.centers[0].id);
        }
      } else {
        setMessage(`Error: ${result.message}`);
      }
    };

    if (user) {
      fetchCenters();
    }
  }, [user, getCenters, setValue]);

  const onSubmit = async (data) => {
    setMessage("");

    const result = await addStudent(data);

    if (result.success) {
      setMessage("Student registered successfully!");
      reset({
        name: "",
        age: undefined,
        contact: "",
        caste: "",
        grade: undefined,
        school: "",
        address: "",
        centerId:
          user?.role === "educator" && centers.length === 1
            ? centers[0].id
            : undefined,
        guardianName: "",
        guardianContact: "",
        familyProblems: "",
      });
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-600 bg-red-50 px-6 py-4 rounded-lg border border-red-200">
          Please log in to register students.
        </div>
      </div>
    );
  }

  if (user.role !== "program_manager" && user.role !== "educator") {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-600 bg-red-50 px-6 py-4 rounded-lg border border-red-200">
          You don't have permission to register students.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-green-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-2">
          Student Registration
        </h2>
        <p className="text-green-600">
          Add a new student to the after-school program
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border-l-4 ${
            message.includes("Error")
              ? "bg-red-50 text-red-700 border-red-400"
              : "bg-green-50 text-green-700 border-green-400"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {message.includes("Error") ? (
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">1</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-green-300 bg-white"
                }`}
                placeholder="Enter student's full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                {...register("age", { valueAsNumber: true })}
                min="5"
                max="25"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors ${
                  errors.age
                    ? "border-red-300 bg-red-50"
                    : "border-green-300 bg-white"
                }`}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                {...register("contact")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors ${
                  errors.contact
                    ? "border-red-300 bg-red-50"
                    : "border-green-300 bg-white"
                }`}
                placeholder="Enter contact number"
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contact.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Caste
              </label>
              <input
                type="text"
                {...register("caste")}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors bg-white"
                placeholder="Enter caste (if applicable)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Grade/Class *
              </label>
              <select
                {...register("grade", { valueAsNumber: true })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors ${
                  errors.grade
                    ? "border-red-300 bg-red-50"
                    : "border-green-300 bg-white"
                }`}
              >
                <option value="">Select Grade</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.grade.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                School Name
              </label>
              <input
                type="text"
                {...register("school")}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors bg-white"
                placeholder="Enter school name"
              />
            </div>
          </div>
        </div>

        {/* Center Assignment */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">2</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              Center Assignment
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              After School Center *
            </label>
            <select
              {...register("centerId", { valueAsNumber: true })}
              disabled={user?.role === "educator" && centers.length === 1}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors disabled:bg-green-100 disabled:cursor-not-allowed ${
                errors.centerId
                  ? "border-red-300 bg-red-50"
                  : "border-green-300 bg-white"
              }`}
            >
              <option value="">Select Center</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name} - {center.address}
                </option>
              ))}
            </select>
            {errors.centerId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.centerId.message}
              </p>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">3</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              Address Information
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Home Address
            </label>
            <textarea
              {...register("address")}
              rows={3}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors bg-white resize-none"
              placeholder="Enter complete home address"
            />
          </div>
        </div>

        {/* Guardian Information */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">4</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              Guardian Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Guardian Name
              </label>
              <input
                type="text"
                {...register("guardianName")}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors bg-white"
                placeholder="Enter guardian's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Guardian Contact
              </label>
              <input
                type="tel"
                {...register("guardianContact")}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors bg-white"
                placeholder="Enter guardian's contact"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-semibold text-sm">5</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              Additional Notes
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Family Problems/Issues (Optional)
            </label>
            <textarea
              {...register("familyProblems")}
              rows={3}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 transition-colors bg-white resize-none"
              placeholder="Note any family issues that might affect the student's progress..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <span className="flex items-center">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Register Student
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;
