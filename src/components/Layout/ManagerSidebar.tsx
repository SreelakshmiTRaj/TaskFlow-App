import {
  ClipboardPlus,
  Clock,
  CheckCircle,
  BarChart3,
  LogOut,
  FolderPlus,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const ManagerSidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-50 flex flex-col justify-between text-white bg-blue-900 shadow-lg">
      <div>
        <div className="p-5 border-b border-white/30 flex items-center justify-center gap-2">
          <img src="/images/note.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-2xl font-semibold text-center">Taskflow</h1>
        </div>

        <nav className="mt-2 flex flex-col gap-1">
          <NavLink
            to="/dashboard/add-project"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <FolderPlus size={20} />
            Add Project
          </NavLink>
          <NavLink
            to="/dashboard/add-task"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <ClipboardPlus size={20} />
            Add Task
          </NavLink>

          <NavLink
            to="/dashboard/pending-tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <Clock size={20} />
            Pending Tasks
          </NavLink>

          <NavLink
            to="/dashboard/completed-tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <CheckCircle size={20} />
            Completed Tasks
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <BarChart3 size={20} />
            Analytics
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogOut}
        className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-blue-100 hover:bg-blue-800 hover:text-white transition-all duration-300 border-t border-white/30 cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default ManagerSidebar;
