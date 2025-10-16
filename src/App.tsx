import "./index.css";
// import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTask from "./pages/Dashboard/AddTask";
import PendingTasks from "./pages/Dashboard/PendingTasks";
import CompletedTasks from "./pages/Dashboard/CompletedTasks";
import Analytics from "./pages/Dashboard/Analytics";
import Home from "./pages/Home/Home";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import AddProject from "./pages/ManagerDashboard/AddProject";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/manager-dashboard" element={<ManagerDashboard/>}/>
        <Route path="/dashboard/add-project" element={<AddProject/>}/>
        <Route path="/dashboard/add-task" element={<AddTask/>}/>
        <Route path="/dashboard/pending-tasks" element={<PendingTasks/>}/>
        <Route path="/dashboard/completed-tasks" element={<CompletedTasks/>}/>
        <Route path="/dashboard/analytics" element={<Analytics/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
