import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UserContext from "../context/UserContext";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiHome,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBookOpen,
  FiStar,
  FiEye,
  FiBarChart,
} from "react-icons/fi";

const centerSchema = z.object({
  name: z.string().min(2, "Center name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
});

const educatorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  centerId: z.number().min(1, "Please select a center"),
  qualifications: z.string().optional(),
  specialization: z.string().optional(),
});

const ProgramController = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [centers, setCenters] = useState([]);
  const [educators, setEducators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showCenterForm, setShowCenterForm] = useState(false);
  const [showEducatorForm, setShowEducatorForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const [editingEducator, setEditingEducator] = useState(null);

  const centerForm = useForm({
    resolver: zodResolver(centerSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      capacity: 50,
    },
  });

  const educatorForm = useForm({
    resolver: zodResolver(educatorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      centerId: undefined,
      qualifications: "",
      specialization: "",
    },
  });

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/centers",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCenters(data.centers);
      }
    } catch (error) {
      setMessage("Error fetching centers");
    } finally {
      setLoading(false);
    }
  };

  const fetchEducators = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/educators",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEducators(data.educators);
      }
    } catch (error) {
      setMessage("Error fetching educators");
    } finally {
      setLoading(false);
    }
  };

  const fetchCenterDetails = async (centerId) => {
    try {
      const response = await fetch(
        `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/centers/${centerId}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Center details:", data.center);
      }
    } catch (error) {
      console.error("Error fetching center details:", error);
      setMessage("Error fetching center details");
    }
  };

  useEffect(() => {
    if (user?.role === "program_manager") {
      fetchCenters();
      fetchEducators();
    }
  }, [user]);

  const handleCenterSubmit = async (data) => {
    setLoading(true);
    try {
      const url = editingCenter
        ? `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/centers/${editingCenter.id}`
        : "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/centers";
      const method = editingCenter ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage(
          `Center ${editingCenter ? "updated" : "created"} successfully!`
        );
        centerForm.reset();
        setShowCenterForm(false);
        setEditingCenter(null);
        fetchCenters();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error in handleCenterSubmit:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCenter = (center) => {
    setEditingCenter(center);
    centerForm.reset({
      name: center.name,
      address: center.address,
      phone: center.phone,
      email: center.email,
      capacity: center.capacity,
    });
    setShowCenterForm(true);
  };

  const handleDeleteCenter = async (centerId) => {
    if (!confirm("Are you sure you want to delete this center?")) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/centers/${centerId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setMessage("Center deleted successfully!");
        fetchCenters();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error in handleDeleteCenter:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEducatorSubmit = async (data) => {
    setLoading(true);
    try {
      const url = editingEducator
        ? `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/educators/${editingEducator.id}`
        : "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/educators/register";
      const method = editingEducator ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage(
          `Educator ${editingEducator ? "updated" : "registered"} successfully!`
        );
        educatorForm.reset();
        setShowEducatorForm(false);
        setEditingEducator(null);
        fetchEducators();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error in handleEducatorSubmit:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditEducator = (educator) => {
    setEditingEducator(educator);
    educatorForm.reset({
      name: educator.name,
      email: educator.email,
      password: "",
      phone: educator.phone,
      centerId: educator.centerId,
      qualifications: educator.qualifications || "",
      specialization: educator.specialization || "",
    });
    setShowEducatorForm(true);
  };

  const handleDeleteEducator = async (educatorId) => {
    if (!confirm("Are you sure you want to remove this educator?")) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/educators/${educatorId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setMessage("Educator removed successfully!");
        fetchEducators();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error in handleDeleteEducator:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "program_manager") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            This dashboard is only available for program managers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Program Controller Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "Program Manager"}
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-medium">
                  {centers.length} Centers
                </span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-green-800 font-medium">
                  {educators.length} Educators
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: FiBarChart },
              { id: "centers", label: "Centers", icon: FiHome },
              { id: "educators", label: "Educators", icon: FiUsers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-green-50 text-green-800 border border-green-200"
            }`}
          >
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Overview Cards */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiHome className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Total Centers
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {centers.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiUsers className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Total Educators
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {educators.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FiStar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Average Capacity
                  </h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {centers.length > 0
                      ? Math.round(
                          centers.reduce((sum, c) => sum + c.capacity, 0) /
                            centers.length
                        )
                      : 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Centers */}
            <div className="bg-white p-6 rounded-lg shadow-sm border md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Centers
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Center
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Educators
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {centers.slice(0, 5).map((center) => (
                      <tr key={center.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {center.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {center.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {center.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {center.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {
                            educators.filter((e) => e.centerId === center.id)
                              .length
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "centers" && (
          <div>
            {/* Centers Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Centers
              </h2>
              <button
                onClick={() => {
                  setEditingCenter(null);
                  centerForm.reset();
                  setShowCenterForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Center</span>
              </button>
            </div>

            {/* Center Form Modal */}
            {showCenterForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingCenter ? "Edit Center" : "Add New Center"}
                  </h3>
                  <form onSubmit={centerForm.handleSubmit(handleCenterSubmit)}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Center Name
                        </label>
                        <input
                          {...centerForm.register("name")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {centerForm.formState.errors.name && (
                          <p className="text-red-600 text-sm mt-1">
                            {centerForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <textarea
                          {...centerForm.register("address")}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {centerForm.formState.errors.address && (
                          <p className="text-red-600 text-sm mt-1">
                            {centerForm.formState.errors.address.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          {...centerForm.register("phone")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {centerForm.formState.errors.phone && (
                          <p className="text-red-600 text-sm mt-1">
                            {centerForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          {...centerForm.register("email")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {centerForm.formState.errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            {centerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Capacity
                        </label>
                        <input
                          type="number"
                          {...centerForm.register("capacity", {
                            valueAsNumber: true,
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {centerForm.formState.errors.capacity && (
                          <p className="text-red-600 text-sm mt-1">
                            {centerForm.formState.errors.capacity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCenterForm(false);
                          setEditingCenter(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Centers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {centers.map((center) => (
                <div
                  key={center.id}
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {center.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          fetchCenterDetails(center.id).then(() =>
                            setActiveTab("center-details")
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditCenter(center)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCenter(center.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{center.address}</span>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-2" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="w-4 h-4 mr-2" />
                      <span>{center.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="w-4 h-4 mr-2" />
                      <span>Capacity: {center.capacity}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Educators:</span>
                      <span className="font-medium">
                        {
                          educators.filter((e) => e.centerId === center.id)
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "educators" && (
          <div>
            {/* Educators Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Educators
              </h2>
              <button
                onClick={() => {
                  setEditingEducator(null);
                  educatorForm.reset();
                  setShowEducatorForm(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Educator</span>
              </button>
            </div>

            {/* Educator Form Modal */}
            {showEducatorForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-screen overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingEducator
                      ? "Edit Educator"
                      : "Register New Educator"}
                  </h3>
                  <form
                    onSubmit={educatorForm.handleSubmit(handleEducatorSubmit)}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          {...educatorForm.register("name")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {educatorForm.formState.errors.name && (
                          <p className="text-red-600 text-sm mt-1">
                            {educatorForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          {...educatorForm.register("email")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {educatorForm.formState.errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            {educatorForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Password
                          {editingEducator && (
                            <span className="text-gray-500 text-xs">
                              {" "}
                              (leave blank to keep current)
                            </span>
                          )}
                        </label>
                        <input
                          type="password"
                          {...educatorForm.register("password")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {educatorForm.formState.errors.password && (
                          <p className="text-red-600 text-sm mt-1">
                            {educatorForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          {...educatorForm.register("phone")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {educatorForm.formState.errors.phone && (
                          <p className="text-red-600 text-sm mt-1">
                            {educatorForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Assigned Center
                        </label>
                        <select
                          {...educatorForm.register("centerId", {
                            valueAsNumber: true,
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                          <option value="">Select a center</option>
                          {centers.map((center) => (
                            <option key={center.id} value={center.id}>
                              {center.name}
                            </option>
                          ))}
                        </select>
                        {educatorForm.formState.errors.centerId && (
                          <p className="text-red-600 text-sm mt-1">
                            {educatorForm.formState.errors.centerId.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Qualifications
                        </label>
                        <textarea
                          {...educatorForm.register("qualifications")}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          placeholder="Educational background, certifications, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Specialization
                        </label>
                        <input
                          {...educatorForm.register("specialization")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          placeholder="e.g., Mathematics, Science, Arts"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEducatorForm(false);
                          setEditingEducator(null);
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Educators List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Educator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Center
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {educators.map((educator) => (
                      <tr key={educator.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <FiUser className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {educator.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {educator.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {educator.centerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {educator.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {educator.specialization || "General"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditEducator(educator)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEducator(educator.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramController;
