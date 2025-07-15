import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { offlineStorageManager } from "../utils/offlineStorage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/auth/profile",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password, role, contact) => {
    try {
      const requestBody = { role };

      if (role === "student") {
        requestBody.contact = contact;
      } else {
        requestBody.email = email;
        requestBody.password = password;
      }

      const response = await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Login failed" }));
        console.error("Login failed:", errorData);
        return { success: false, message: errorData.message || "Login failed" };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const register = async (name, email, password, age) => {
    try {
      const response = await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password, age }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Registration failed" }));
        console.error("Registration failed:", errorData);
        return {
          success: false,
          message: errorData.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const registerProgramManager = async (name, email, password, phone) => {
    try {
      const response = await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/auth/register/program-manager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password, phone }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Registration failed" }));
        console.error("Program Manager registration failed:", errorData);
        return {
          success: false,
          message: errorData.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Error registering program manager:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const addStudent = async (studentData) => {
    try {
      const result = await offlineStorageManager.addStudent(studentData);
      return result;
    } catch (error) {
      console.error("Error adding student:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const getStudents = async () => {
    try {
      const result = await offlineStorageManager.getStudents();
      return result;
    } catch (error) {
      console.error("Error fetching students:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const getStudentById = async (studentId) => {
    try {
      const response = await fetch(
        `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/students/${studentId}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return { success: true, student: data.student };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to fetch student" }));
        return {
          success: false,
          message: errorData.message || "Failed to fetch student",
        };
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const getCenters = async () => {
    try {
      const response = await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/centers",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return { success: true, centers: data.centers };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to fetch centers" }));
        return {
          success: false,
          message: errorData.message || "Failed to fetch centers",
        };
      }
    } catch (error) {
      console.error("Error fetching centers:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const loginWithGoogle = () => {
    window.location.href =
      "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/auth/google";
  };

  const logout = async () => {
    try {
      await fetch(
        "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/auth/logout",
        {
          credentials: "include",
        }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        registerProgramManager,
        addStudent,
        getStudents,
        getStudentById,
        getCenters,
        logout,
        loginWithGoogle,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
