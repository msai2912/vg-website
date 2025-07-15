import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserContext from "../context/UserContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";
import {
  User,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  Target,
  Award,
  Brain,
  Users,
  Heart,
  Shield,
  Lightbulb,
  RefreshCw,
  Edit,
} from "lucide-react";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [studentData, setStudentData] = useState(null);
  const [academicRecords, setAcademicRecords] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllData = useCallback(async () => {
    try {
      setRefreshing(true);
      const token = localStorage.getItem("token");
      const baseURL =
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000";

      const [
        studentResponse,
        academicsResponse,
        assessmentsResponse,
        aiResponse,
      ] = await Promise.all([
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
        fetch(`${baseURL}/api/students/${studentId}/ai-analysis`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        setStudentData(studentData.student);
      }

      if (academicsResponse.ok) {
        const academicsData = await academicsResponse.json();
        setAcademicRecords(academicsData.records || []);
      }

      if (assessmentsResponse.ok) {
        const assessmentsData = await assessmentsResponse.json();
        setAssessments(assessmentsData.assessments || []);
      }

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        setAiAnalysis(aiData);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching student data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      fetchAllData();
    }
  }, [studentId, fetchAllData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-blue-600 text-lg font-medium">
            Loading AI Analysis...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center"
        >
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchAllData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (
    !aiAnalysis &&
    !studentData &&
    academicRecords.length === 0 &&
    assessments.length === 0
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-blue-600 text-lg">No data available</p>
      </div>
    );
  }

  const analysis = aiAnalysis?.analysis;

  const criteriaData = analysis
    ? [
        {
          name: "Academic Performance",
          score:
            analysis.scholarshipEligibility?.criteria?.academicPerformance
              ?.score || 0,
          status:
            analysis.scholarshipEligibility?.criteria?.academicPerformance
              ?.status || "unknown",
        },
        {
          name: "Skill Development",
          score:
            analysis.scholarshipEligibility?.criteria?.skillDevelopment
              ?.score || 0,
          status:
            analysis.scholarshipEligibility?.criteria?.skillDevelopment
              ?.status || "unknown",
        },
        {
          name: "Overall Progress",
          score:
            analysis.scholarshipEligibility?.criteria?.overallProgress?.score ||
            0,
          status:
            analysis.scholarshipEligibility?.criteria?.overallProgress?.trend ||
            "unknown",
        },
      ]
    : [];

  const priorityData = analysis
    ? [
        {
          name: "High Priority",
          immediate:
            analysis.actionPlan?.immediate?.filter(
              (item) => item.priority === "high"
            ).length || 0,
          shortTerm:
            analysis.actionPlan?.shortTerm?.filter(
              (item) => item.priority === "high"
            ).length || 0,
          longTerm:
            analysis.actionPlan?.longTerm?.filter(
              (item) => item.priority === "high"
            ).length || 0,
        },
        {
          name: "Medium Priority",
          immediate:
            analysis.actionPlan?.immediate?.filter(
              (item) => item.priority === "medium"
            ).length || 0,
          shortTerm:
            analysis.actionPlan?.shortTerm?.filter(
              (item) => item.priority === "medium"
            ).length || 0,
          longTerm:
            analysis.actionPlan?.longTerm?.filter(
              (item) => item.priority === "medium"
            ).length || 0,
        },
        {
          name: "Low Priority",
          immediate:
            analysis.actionPlan?.immediate?.filter(
              (item) => item.priority === "low"
            ).length || 0,
          shortTerm:
            analysis.actionPlan?.shortTerm?.filter(
              (item) => item.priority === "low"
            ).length || 0,
          longTerm:
            analysis.actionPlan?.longTerm?.filter(
              (item) => item.priority === "low"
            ).length || 0,
        },
      ]
    : [];

  const riskData =
    analysis?.riskFactors?.map((risk) => ({
      factor: risk.factor,
      probability:
        risk.probability === "high" ? 3 : risk.probability === "medium" ? 2 : 1,
      impact: risk.impact?.length || 0,
    })) || [];

  const severityColors = {
    high: "#dc2626",
    medium: "#f59e0b",
    low: "#10b981",
  };

  const concernsData =
    analysis?.areasOfConcern?.map((concern) => ({
      name: concern.area,
      value:
        concern.severity === "high" ? 3 : concern.severity === "medium" ? 2 : 1,
      fill: severityColors[concern.severity] || "#6b7280",
    })) || [];

  const COLORS = ["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {studentData ? studentData.name : "Student Dashboard"}
                </h1>
                <p className="text-gray-600">
                  {studentData && (
                    <>
                      Age: {studentData.age} | Grade: {studentData.grade} |
                      School: {studentData.school}
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  Student ID: {studentId}
                  {aiAnalysis &&
                    ` | AI Analysis: ${new Date(
                      aiAnalysis.generatedAt
                    ).toLocaleString()}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Edit Button - Only for non-student users */}
              {user && user.role !== "student" && (
                <button
                  onClick={() =>
                    navigate(`/student-dashboard/${studentId}/edit`)
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
              <button
                onClick={fetchAllData}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Student Profile Card */}
        {studentData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Student Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Personal Info</h3>
                  <p className="text-sm text-gray-600">
                    Name: {studentData.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Age: {studentData.age}
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: {studentData.contact || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Caste: {studentData.caste || "N/A"}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">
                    Academic Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    Grade: {studentData.grade}
                  </p>
                  <p className="text-sm text-gray-600">
                    School: {studentData.school}
                  </p>
                  <p className="text-sm text-gray-600">
                    Center ID: {studentData.centerId}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">
                    Guardian Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    Name: {studentData.guardianName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: {studentData.guardianContact || "N/A"}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Address</h3>
                  <p className="text-sm text-gray-600">
                    {studentData.address || "N/A"}
                  </p>
                  {studentData.familyProblems && (
                    <p className="text-sm text-red-600 mt-2">
                      Family Issues: {studentData.familyProblems}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Academic Records Section */}
        {academicRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Academic Performance
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Academic Records Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Subject-wise Performance
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={academicRecords.map((record) => ({
                          subject: record.subjectName,
                          percentage: (record.marks / record.maxMarks) * 100,
                          marks: record.marks,
                          maxMarks: record.maxMarks,
                          term: record.term,
                          year: record.academicYear,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="subject"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "percentage"
                              ? `${value.toFixed(1)}%`
                              : value,
                            name === "percentage" ? "Percentage" : name,
                          ]}
                          labelFormatter={(label) => `Subject: ${label}`}
                        />
                        <Bar
                          dataKey="percentage"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Academic Records Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recent Records</h3>
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left p-2">Subject</th>
                          <th className="text-left p-2">Marks</th>
                          <th className="text-left p-2">%</th>
                          <th className="text-left p-2">Term</th>
                        </tr>
                      </thead>
                      <tbody>
                        {academicRecords.slice(-10).map((record, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">
                              {record.subjectName}
                            </td>
                            <td className="p-2">
                              {record.marks}/{record.maxMarks}
                            </td>
                            <td className="p-2">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  (record.marks / record.maxMarks) * 100 >= 80
                                    ? "bg-green-100 text-green-800"
                                    : (record.marks / record.maxMarks) * 100 >=
                                      60
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {(
                                  (record.marks / record.maxMarks) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </td>
                            <td className="p-2">
                              {record.term} {record.academicYear}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Assessments Section */}
        {assessments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Brain className="h-6 w-6 mr-2 text-blue-600" />
                Skills Assessment
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Skills Radar Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills Profile</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={(() => {
                          const latestAssessment =
                            assessments[assessments.length - 1];
                          return [
                            {
                              skill: "Leadership",
                              score: latestAssessment.leadershipScore || 0,
                            },
                            {
                              skill: "General Knowledge",
                              score:
                                latestAssessment.generalKnowledgeScore || 0,
                            },
                            {
                              skill: "English Speaking",
                              score: latestAssessment.englishSpeakingScore || 0,
                            },
                            {
                              skill: "English Reading",
                              score: latestAssessment.englishReadingScore || 0,
                            },
                            {
                              skill: "English Writing",
                              score: latestAssessment.englishWritingScore || 0,
                            },
                            {
                              skill: "Communication",
                              score: latestAssessment.communicationScore || 0,
                            },
                            {
                              skill: "Teamwork",
                              score: latestAssessment.teamworkScore || 0,
                            },
                            {
                              skill: "Creativity",
                              score: latestAssessment.creativityScore || 0,
                            },
                          ];
                        })()}
                      >
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis
                          dataKey="skill"
                          tick={{ fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 10]}
                          tick={{ fontSize: 10 }}
                        />
                        <Radar
                          name="Skills"
                          dataKey="score"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Assessment Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Assessment Timeline
                  </h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {assessments.map((assessment, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-blue-800">
                            {assessment.assessmentType || "General Assessment"}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              assessment.assessmentDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {assessment.weight && assessment.height && (
                            <p className="text-gray-600">
                              BMI:{" "}
                              {(
                                assessment.weight /
                                (assessment.height / 100) ** 2
                              ).toFixed(1)}
                            </p>
                          )}
                          <p className="text-gray-600">
                            Avg Score:{" "}
                            {(
                              (assessment.leadershipScore +
                                assessment.generalKnowledgeScore +
                                assessment.englishSpeakingScore +
                                assessment.englishReadingScore +
                                assessment.englishWritingScore +
                                assessment.communicationScore +
                                assessment.teamworkScore +
                                assessment.creativityScore) /
                              8
                            ).toFixed(1)}
                            /10
                          </p>
                        </div>
                        {assessment.healthRemarks && (
                          <p className="text-sm text-gray-700 mt-2">
                            Health: {assessment.healthRemarks}
                          </p>
                        )}
                        {assessment.behaviorRemarks && (
                          <p className="text-sm text-gray-700">
                            Behavior: {assessment.behaviorRemarks}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Academic Summary */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Academic Records
                </h3>
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {academicRecords.length}
              </div>
              <p className="text-sm text-gray-600">
                {academicRecords.length > 0 && (
                  <>
                    Avg:{" "}
                    {(
                      academicRecords.reduce(
                        (sum, record) =>
                          sum + (record.marks / record.maxMarks) * 100,
                        0
                      ) / academicRecords.length
                    ).toFixed(1)}
                    %
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Assessments Summary */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Assessments
                </h3>
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {assessments.length}
              </div>
              <p className="text-sm text-gray-600">
                {assessments.length > 0 && (
                  <>
                    Latest:{" "}
                    {new Date(
                      assessments[assessments.length - 1].assessmentDate
                    ).toLocaleDateString()}
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* AI Analysis Status */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  AI Analysis
                </h3>
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {aiAnalysis ? "✓" : "✗"}
              </div>
              <p className="text-sm text-gray-600">
                {aiAnalysis ? "Available" : "Not Available"}
              </p>
            </div>
          </motion.div>

          {/* Overall Status */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Overall Status
                </h3>
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {(() => {
                  const hasData =
                    studentData ||
                    academicRecords.length > 0 ||
                    assessments.length > 0;
                  return hasData ? "✓" : "✗";
                })()}
              </div>
              <p className="text-sm text-gray-600">
                Profile{" "}
                {studentData &&
                academicRecords.length > 0 &&
                assessments.length > 0
                  ? "Complete"
                  : "Incomplete"}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Analysis Section - Scholarship Eligibility Overview */}
        {aiAnalysis && analysis && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div
              className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
                analysis.scholarshipEligibility?.eligible
                  ? "border-green-500 bg-gradient-to-r from-green-50 to-white"
                  : "border-red-500 bg-gradient-to-r from-red-50 to-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-blue-600" />
                  AI Scholarship Eligibility Analysis
                </h2>
                <div className="flex items-center space-x-2">
                  {analysis.scholarshipEligibility?.eligible ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      analysis.scholarshipEligibility?.eligible
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {analysis.scholarshipEligibility?.eligible
                      ? "Eligible"
                      : "Not Eligible"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-2">
                    <strong>Confidence:</strong>{" "}
                    {analysis.scholarshipEligibility?.confidence}
                  </p>
                  <p className="text-gray-700">
                    {analysis.scholarshipEligibility?.reasoning}
                  </p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={criteriaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="score"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Dashboard Grid - AI Analysis */}
        {aiAnalysis && analysis && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
          >
            {/* Action Plan Priority Chart */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Action Plan Priority Distribution
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priorityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="immediate"
                        stackId="a"
                        fill="#3b82f6"
                        name="Immediate"
                      />
                      <Bar
                        dataKey="shortTerm"
                        stackId="a"
                        fill="#1d4ed8"
                        name="Short Term"
                      />
                      <Bar
                        dataKey="longTerm"
                        stackId="a"
                        fill="#1e40af"
                        name="Long Term"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Areas of Concern Pie Chart */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
                  Areas of Concern
                </h3>
                {concernsData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={concernsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {concernsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p>No areas of concern identified</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Risk Factors Radar Chart */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Risk Assessment
                </h3>
                {riskData.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={riskData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis
                          dataKey="factor"
                          tick={{ fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 3]}
                          tick={{ fontSize: 10 }}
                        />
                        <Radar
                          name="Risk Level"
                          dataKey="probability"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Shield className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p>No significant risk factors identified</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-600" />
                  Key Strengths
                </h3>
                <div className="space-y-3">
                  {analysis.strengths?.slice(0, 5).map((strength, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400"
                    >
                      <h4 className="font-semibold text-blue-800">
                        {strength.area}
                      </h4>
                      <p className="text-sm text-blue-600">
                        {strength.description}
                      </p>
                    </motion.div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">
                      No strengths data available
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Action Plans and Recommendations - AI Analysis */}
        {aiAnalysis && analysis && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Immediate Actions */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-red-600" />
                  Immediate Actions
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {analysis.actionPlan?.immediate?.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border-l-4 ${
                        action.priority === "high"
                          ? "bg-red-50 border-red-400"
                          : action.priority === "medium"
                          ? "bg-yellow-50 border-yellow-400"
                          : "bg-green-50 border-green-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            action.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : action.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {action.priority}
                        </span>
                        <span className="text-xs text-gray-500">
                          {action.timeline}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800">
                        {action.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        {action.expectedOutcome}
                      </p>
                    </motion.div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">
                      No immediate actions required
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                  Recommendations
                </h3>
                <div className="space-y-4">
                  {analysis.recommendations?.forStudent && (
                    <div>
                      <h4 className="font-semibold text-blue-800 flex items-center mb-2">
                        <BookOpen className="h-4 w-4 mr-1" />
                        For Student
                      </h4>
                      <ul className="space-y-1">
                        {analysis.recommendations.forStudent
                          .slice(0, 3)
                          .map((rec, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <span className="text-blue-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {analysis.recommendations?.forEducator && (
                    <div>
                      <h4 className="font-semibold text-green-800 flex items-center mb-2">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        For Educator
                      </h4>
                      <ul className="space-y-1">
                        {analysis.recommendations.forEducator
                          .slice(0, 3)
                          .map((rec, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <span className="text-green-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {analysis.recommendations?.forFamily && (
                    <div>
                      <h4 className="font-semibold text-purple-800 flex items-center mb-2">
                        <Heart className="h-4 w-4 mr-1" />
                        For Family
                      </h4>
                      <ul className="space-y-1">
                        {analysis.recommendations.forFamily
                          .slice(0, 3)
                          .map((rec, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <span className="text-purple-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Detailed Areas of Concern - AI Analysis */}
        {analysis &&
          analysis.areasOfConcern &&
          analysis.areasOfConcern.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Detailed Areas of Concern
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.areasOfConcern.map((concern, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        concern.severity === "high"
                          ? "bg-red-50 border-red-500"
                          : concern.severity === "medium"
                          ? "bg-yellow-50 border-yellow-500"
                          : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {concern.area}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            concern.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : concern.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {concern.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {concern.description}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Impact:</strong> {concern.impact}
                      </p>
                      {concern.recommendations && (
                        <div>
                          <p className="text-sm font-medium text-gray-800 mb-1">
                            Recommendations:
                          </p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {concern.recommendations
                              .slice(0, 2)
                              .map((rec, recIndex) => (
                                <li key={recIndex} className="flex items-start">
                                  <span className="text-gray-400 mr-1">•</span>
                                  {rec}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
      </div>
    </div>
  );
};

export default StudentDashboard;
