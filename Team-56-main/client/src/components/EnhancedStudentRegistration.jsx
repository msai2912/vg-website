import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UserContext from "../context/UserContext";
import { offlineStorageManager } from "../utils/offlineStorage";
import BasicInfoForm from "./registration/BasicInfoForm";
import AcademicRecordsForm from "./registration/AcademicRecordsForm";
import AssessmentForm from "./registration/AssessmentForm";
import RegistrationSummary from "./registration/RegistrationSummary";

const enhancedStudentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name is too long"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(5, "Age must be at least 5")
    .max(25, "Age must be at most 25"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(20, "Contact number is too long"),
  grade: z
    .number({
      required_error: "Grade is required",
      invalid_type_error: "Grade must be a number",
    })
    .min(1, "Grade is required")
    .max(12, "Grade must be between 1-12"),
  centerId: z
    .number({
      required_error: "Please select a center",
      invalid_type_error: "Please select a center",
    })
    .min(1, "Please select a center"),

  caste: z.string().optional(),
  school: z.string().optional(),
  address: z.string().optional(),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  familyProblems: z.string().optional(),

  academicRecords: z
    .array(
      z.object({
        subjectName: z.string().min(1, "Subject name is required"),
        marks: z
          .number()
          .min(0, "Marks must be positive")
          .max(1000, "Marks too high"),
        maxMarks: z
          .number()
          .min(1, "Max marks must be positive")
          .max(1000, "Max marks too high"),
        term: z.string().optional(),
        academicYear: z.string().optional(),
        remarks: z.string().optional(),
      })
    )
    .optional(),

  assessment: z
    .object({
      leadershipScore: z.number().min(0).max(100).optional(),
      leadershipNotes: z.string().optional(),

      weight: z.number().positive().optional(),
      height: z.number().positive().optional(),
      healthNotes: z.string().optional(),

      generalKnowledgeScore: z.number().min(0).max(100).optional(),
      englishSpeakingScore: z.number().min(0).max(100).optional(),
      englishReadingScore: z.number().min(0).max(100).optional(),
      englishWritingScore: z.number().min(0).max(100).optional(),
      communicationScore: z.number().min(0).max(100).optional(),
      teamworkScore: z.number().min(0).max(100).optional(),
      creativityScore: z.number().min(0).max(100).optional(),

      assessmentType: z.string().optional(),
      overallNotes: z.string().optional(),
    })
    .optional(),
});

const EnhancedStudentRegistration = () => {
  const { user, addStudent, getCenters } = useContext(UserContext);
  const [centers, setCenters] = useState([]);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 0, title: "Basic Information", component: "basic" },
    { id: 1, title: "Academic Records", component: "academic" },
    { id: 2, title: "Assessment", component: "assessment" },
    { id: 3, title: "Review & Submit", component: "summary" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
    control,
    trigger,
  } = useForm({
    resolver: zodResolver(enhancedStudentSchema),
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
      academicRecords: [],
      assessment: {},
    },
  });

  useEffect(() => {
    const fetchCenters = async () => {
      if (user) {
        const result = await getCenters();
        if (result.success) {
          setCenters(result.centers);
          if (user.role === "educator" && result.centers.length === 1) {
            setValue("centerId", result.centers[0].id);
          }
        }
      }
    };
    fetchCenters();
  }, [user, getCenters, setValue]);

  const onSubmit = async (data) => {
    console.log("Form submission started with data:", data);
    setIsSubmitting(true);
    setMessage("");
    try {
      const studentData = {
        name: data.name,
        age: data.age,
        contact: data.contact,
        caste: data.caste,
        grade: data.grade,
        school: data.school,
        address: data.address,
        centerId: data.centerId,
        guardianName: data.guardianName,
        guardianContact: data.guardianContact,
        familyProblems: data.familyProblems,
      };

      console.log("Submitting student data:", studentData);
      const result = await addStudent(studentData);
      console.log("Add student result:", result);

      if (result.success) {
        const studentId = result.student.id;
        console.log("Student created with ID:", studentId);

        if (data.academicRecords && data.academicRecords.length > 0) {
          console.log("Adding academic records:", data.academicRecords);
          for (const record of data.academicRecords) {
            if (record.subjectName && record.marks !== undefined) {
              const recordData = {
                ...record,
                grade: data.grade,
                academicYear:
                  record.academicYear ||
                  new Date().getFullYear() +
                    "-" +
                    (new Date().getFullYear() + 1),
              };

              const recordResult =
                await offlineStorageManager.addAcademicRecord(
                  studentId,
                  recordData
                );
              if (!recordResult.success) {
                console.error(
                  "Failed to add academic record:",
                  recordResult.message
                );
                setMessage(
                  `Warning: Failed to add academic record for ${record.subjectName}`
                );
              }
            }
          }
        }

        if (
          data.assessment &&
          Object.keys(data.assessment).some(
            (key) =>
              data.assessment[key] !== undefined && data.assessment[key] !== ""
          )
        ) {
          console.log("Adding assessment:", data.assessment);
          const assessmentData = {
            ...data.assessment,
            assessmentType: data.assessment.assessmentType || "initial",
          };

          if (data.assessment.height && data.assessment.weight) {
            const heightInMeters = data.assessment.height / 100;
            assessmentData.bmi = (
              data.assessment.weight /
              (heightInMeters * heightInMeters)
            ).toFixed(2);
          }

          const assessmentResult = await offlineStorageManager.addAssessment(
            studentId,
            assessmentData
          );
          if (!assessmentResult.success) {
            console.error(
              "Failed to add assessment:",
              assessmentResult.message
            );
            setMessage(
              "Warning: Student registered but assessment data could not be saved"
            );
          }
        }

        setMessage("Student registered successfully with all details!");
        reset();
        setCurrentStep(0);
      } else {
        console.error("Student creation failed:", result.message);
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      let fieldsToValidate = [];

      if (currentStep === 0) {
        fieldsToValidate = ["name", "age", "contact", "grade", "centerId"];
      }

      if (fieldsToValidate.length > 0) {
        const result = await trigger(fieldsToValidate);
        if (!result) {
          return;
        }
      }

      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];

    switch (currentStepData.component) {
      case "basic":
        return (
          <BasicInfoForm
            register={register}
            errors={errors}
            centers={centers}
          />
        );
      case "academic":
        return (
          <AcademicRecordsForm
            register={register}
            errors={errors}
            control={control}
            watch={watch}
          />
        );
      case "assessment":
        return (
          <AssessmentForm register={register} errors={errors} watch={watch} />
        );
      case "summary":
        return <RegistrationSummary data={getValues()} centers={centers} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-green-100">
      {/* Header */}
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
          Enhanced Student Registration
        </h2>
        <p className="text-green-600">
          Complete student profile with academic records and assessments
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep
                    ? "bg-green-600 border-green-600 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {index < currentStep ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-20 h-0.5 ml-4 ${
                    index < currentStep ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            message.includes("Error")
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-green-50 border-green-200 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-96">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          <div className="space-x-4">
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                onClick={() => {
                  console.log("Submit button clicked");
                  console.log("Current form values:", getValues());
                  console.log("Form errors:", errors);
                }}
              >
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnhancedStudentRegistration;
