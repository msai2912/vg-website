import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
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

const EditStudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { user, getCenters } = useContext(UserContext);
  const [centers, setCenters] = useState([]);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);

  const steps = [
    { id: 0, title: "Basic Information", component: "basic" },
    { id: 1, title: "Academic Records", component: "academic" },
    { id: 2, title: "Assessment", component: "assessment" },
    { id: 3, title: "Review & Update", component: "summary" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    const fetchStudentData = async () => {
      if (!studentId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const baseURL =
          "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000";

        const [studentResponse, academicsResponse, assessmentsResponse] =
          await Promise.all([
            fetch(`${baseURL}/api/students/${studentId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
            fetch(`${baseURL}/api/students/${studentId}/academics`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
            fetch(`${baseURL}/api/students/${studentId}/assessment`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
          ]);

        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          const student = studentData.student;

          setValue("name", student.name || "");
          setValue("age", student.age || undefined);
          setValue("contact", student.contact || "");
          setValue("caste", student.caste || "");
          setValue("grade", student.grade || undefined);
          setValue("school", student.school || "");
          setValue("address", student.address || "");
          setValue("centerId", student.centerId || undefined);
          setValue("guardianName", student.guardianName || "");
          setValue("guardianContact", student.guardianContact || "");
          setValue("familyProblems", student.familyProblems || "");

          setOriginalData(student);
        }

        if (academicsResponse.ok) {
          const academicsData = await academicsResponse.json();
          setValue("academicRecords", academicsData.records || []);
        }

        if (assessmentsResponse.ok) {
          const assessmentsData = await assessmentsResponse.json();
          const latestAssessment =
            assessmentsData.assessments?.[
              assessmentsData.assessments.length - 1
            ];
          if (latestAssessment) {
            setValue("assessment", {
              leadershipScore: latestAssessment.leadershipScore || undefined,
              leadershipNotes: latestAssessment.leadershipNotes || "",
              weight: latestAssessment.weight || undefined,
              height: latestAssessment.height || undefined,
              healthNotes: latestAssessment.healthNotes || "",
              generalKnowledgeScore:
                latestAssessment.generalKnowledgeScore || undefined,
              englishSpeakingScore:
                latestAssessment.englishSpeakingScore || undefined,
              englishReadingScore:
                latestAssessment.englishReadingScore || undefined,
              englishWritingScore:
                latestAssessment.englishWritingScore || undefined,
              communicationScore:
                latestAssessment.communicationScore || undefined,
              teamworkScore: latestAssessment.teamworkScore || undefined,
              creativityScore: latestAssessment.creativityScore || undefined,
              assessmentType: latestAssessment.assessmentType || "",
              overallNotes: latestAssessment.overallNotes || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setMessage("Error loading student data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId, setValue]);

  useEffect(() => {
    const fetchCenters = async () => {
      if (user) {
        const result = await getCenters();
        if (result.success) {
          setCenters(result.centers);
        }
      }
    };
    fetchCenters();
  }, [user, getCenters]);

  const onSubmit = async (data) => {
    console.log("Form submission started with data:", data);
    setIsSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const baseURL =
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000";

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

      console.log("Updating student data:", studentData);
      const response = await fetch(`${baseURL}/api/students/${studentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Student updated successfully:", result);

        setMessage("Student profile updated successfully!");

        setTimeout(() => {
          navigate(`/student-dashboard/${studentId}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("An error occurred during update. Please try again.");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-200 border-t-green-600 mb-4"></div>
          <p className="text-green-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-600 bg-red-50 px-6 py-4 rounded-lg border border-red-200">
          Please log in to edit student profiles.
        </div>
      </div>
    );
  }

  if (user.role !== "program_manager" && user.role !== "educator") {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-600 bg-red-50 px-6 py-4 rounded-lg border border-red-200">
          You don't have permission to edit student profiles.
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-2">
          Edit Student Profile
        </h2>
        <p className="text-green-600">
          Update student information, academic records, and assessments
        </p>
        {originalData && (
          <p className="text-sm text-gray-500 mt-2">
            Editing: {originalData.name} (ID: {studentId})
          </p>
        )}
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
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/student-dashboard/${studentId}`)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
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
          </div>

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
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStudentProfile;
