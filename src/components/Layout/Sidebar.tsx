import React from "react";
import { ClipboardPlus, Clock, CheckCircle, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="h-screen w-64 flex flex-col text-white bg-blue-800 shadow-lg">
      <div className="p-5 border-b border-white-700">
        <h1 className="text-2xl font-semibold text-center">
          Taskflow
        </h1>
      </div>

      <NavLink
        to="/dashboard/add-task"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full ${
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
        to="/dashboard/pending-task"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full ${
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
        to="/dashboard/completed-task"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full ${
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
          `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full ${
            isActive
              ? "bg-blue-700 text-white"
              : "text-blue-100 hover:bg-blue-800 hover:text-white"
          }`
        }
      >
        <BarChart3 size={20} />
        Analytics
      </NavLink>
    </div>
  );
};

export default Sidebar;
