import {
  BarChart3,
  LogOut,
  ListTodo,
  User2
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [name,setName] = useState<string | null>(null);
  const [jobTitle,setJobTitle] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedJobTitle = localStorage.getItem("jobTitle");
    setName(storedName);
    setJobTitle(storedJobTitle);
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-screen w-50 flex flex-col justify-between text-white bg-blue-900 shadow-lg">
      <div>
        <div className="p-5 border-b border-white/30 flex items-center justify-center gap-2">
          <img src="/images/note.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-2xl font-semibold text-center">Taskflow</h1>
        </div>

        <div className="flex flex-col items-center mt-5 mb-4 border-b border-white/20 pb-4">
          <User2 size={60} className="color-white bg-gray-500 rounded-full"/>
          <h2 className="text-lg font-semibold">{name || "User Name"}</h2>
          <p className="text-sm text-white-200">{jobTitle || "Job Title"}</p>
        </div>

        <nav className="mt-2 flex flex-col gap-1">
          <NavLink
            to="/dashboard/taskboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-r-full cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <ListTodo size={20} />
            Task Board
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

export default Sidebar;
