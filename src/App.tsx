import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Dashboard/Analytics";
import Home from "./pages/Home/Home";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import AddProject from "./pages/ManagerDashboard/AddProject";
import Taskboard from "./pages/Dashboard/Taskboard";
import ProjectsPage from "./pages/Dashboard/ProjectsPage";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";
import AdminDashboard from "./pages/Admin/AdminDashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard/>}/>
        <Route path="/manager-dashboard/add-project" element={<AddProject/>} />
        <Route path="/dashboard/taskboard" element={<Taskboard/>}/>
        <Route path='/projects/:projectId' element={<ProjectsPage />} />
        <Route path="/dashboard/analytics" element={<Analytics/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
