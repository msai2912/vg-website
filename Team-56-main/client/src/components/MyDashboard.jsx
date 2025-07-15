import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import LoadingSpinner from "./LoadingSpinner";

const MyDashboard = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "student" && user.id) {
        navigate(`/student-dashboard/${user.id}`);
      } else if (user.role === "student" && user.entityId) {
        navigate(`/student-dashboard/${user.entityId}`);
      } else if (user.role !== "student") {
        if (user.role === "program_manager" || user.role === "educator") {
          navigate("/program-controller");
        } else {
          navigate("/profile");
        }
      } else {
        console.error("Student user missing ID:", user);
        navigate("/?error=missing-student-id");
      }
    } else if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Redirecting to your dashboard...
        </h2>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default MyDashboard;
