// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import StudentCoursePage from "./Component/Students/Student";
import EnroledCourse from "./Component/Students/EnroledCourse";
import StudentProfile from "./Component/Students/StudentProfile";
import InstructorHome from "./Component/Instructor/InstructorHome";
import InstructorDashboard from "./Component/InstructorDashbard";
import PrivateRoute from "./utils/PrivateRoute";
import UserProfile from "./UserProfile";
import AdminHome from "./Component/Admin/AdminHome";
import VerifyUser from "./Component/Admin/AdminVerify"; 
import Announcements from "./Component/Admin/Announcements";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/instructorDashboard" element={<InstructorDashboard />}/>

        {/* Student Routes */}
        <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentCoursePage />} />
          <Route path="/enrolled" element={<EnroledCourse />} />
          {/* <Route path="/profile" element={<StudentProfile />} /> */}
        </Route>

        {/* Instructor Routes */}
        <Route element={<PrivateRoute allowedRoles={["instructor"]} />}>
          <Route path="/instructor" element={<InstructorHome />} />
  
          <Route path="/instructor/profile" element={<StudentProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/verifyUser" element={<VerifyUser />} />
          <Route path="/annoucement" element={<Announcements/>}/>
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

        {/* Default */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
