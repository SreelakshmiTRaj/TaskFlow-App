import { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
}

interface Project {
  id: string;
  name: string;
  members: string[];
  tasks: Task[];
}

const Dashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");
    setUserName(name || "");

    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>("/api/projects");
        const userProjects = response.data.filter((proj) =>
          proj.members.includes(userId || " ")
        );
        setProjectCount(userProjects.length);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome back, <span className="text-blue-700">{userName}</span>
        </h1>

        <div className="bg-white border rounded p-4 w-50">
          <h2 className="text-lg font-medium mb-2">Your Projects</h2>
          <p className="text-gray-700 mb-4">
            You are part of {projectCount}{" "}
            {projectCount === 1 ? "project" : "projects"}.
          </p>

          <button
            onClick={() => navigate("/dashboard/taskboard")}
            className="bg-blue-900 text-white px-3 py-1 rounded transition space-around cursor-pointer"
          >
            Jump back to projects <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
