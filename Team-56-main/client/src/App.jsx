import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import Home from "./components/home/Home";
import About from "./components/home/About/About";
import Contact from "./components/home/Contact/Contact";
import User from "./components/home/Users/User";
import Github from "./components/home/Github";
import Dashboard from "./components/home/Dashboard";
import Donor from "./components/home/Donor";
import Programs from "./components/home/Programs";
import Login from "./components/home/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import SyncStatusIndicator from "./components/SyncStatusIndicator";
import UserContext from "./context/UserContext";
import Header from "./components/home/Header";
import StudentRegistration from "./components/StudentRegistration";
import EnhancedStudentRegistration from "./components/EnhancedStudentRegistration";
import EditStudentProfile from "./components/EditStudentProfile";
import ProgramController from "./components/ProgramController";
import StudentDashboard from "./components/StudentDashboard";
import StudentList from "./components/StudentList";
import MyDashboard from "./components/MyDashboard";
import TamilNaduTreeMap from "./components/TamilNaduTreeMap";
import Footer from "./components/home/Footer";

function App() {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/github" element={<Github />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/programs" element={<Programs />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-registration"
          element={
            <ProtectedRoute>
              <StudentRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enhanced-registration"
          element={
            <ProtectedRoute>
              <EnhancedStudentRegistration />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<StudentRegistration />} />
        <Route
          path="/program-controller"
          element={
            <ProtectedRoute>
              <ProgramController />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-dashboard"
          element={
            <ProtectedRoute>
              <MyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/:studentId"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/:studentId/edit"
          element={
            <ProtectedRoute>
              <EditStudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trees"
          element={
            <ProtectedRoute>
              <TamilNaduTreeMap />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />

      {/* Sync Status Indicator - only show when user is logged in */}
      {user && <SyncStatusIndicator />}
    </>
  );
}

export default App;
