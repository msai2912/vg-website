import React from "react";

const BasicInfoForm = ({ register, errors, centers }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Basic Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter student's full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter age"
            min="5"
            max="25"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            {...register("contact")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.contact ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter contact number"
          />
          {errors.contact && (
            <p className="mt-1 text-sm text-red-600">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade/Class *
          </label>
          <select
            {...register("grade", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.grade ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Grade {i + 1}
              </option>
            ))}
          </select>
          {errors.grade && (
            <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
          )}
        </div>

        {/* Caste */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caste/Category
          </label>
          <input
            type="text"
            {...register("caste")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter caste/category (optional)"
          />
        </div>

        {/* School */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Name
          </label>
          <input
            type="text"
            {...register("school")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter school name (optional)"
          />
        </div>

        {/* Center Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Center *
          </label>
          <select
            {...register("centerId", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.centerId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Choose a center</option>
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

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            {...register("address")}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter complete address (optional)"
          />
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          Guardian Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian Name
            </label>
            <input
              type="text"
              {...register("guardianName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter guardian's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian Contact
            </label>
            <input
              type="tel"
              {...register("guardianContact")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter guardian's contact"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Family Problems/Notes
            </label>
            <textarea
              {...register("familyProblems")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Any family problems or special notes for mentors (optional)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
