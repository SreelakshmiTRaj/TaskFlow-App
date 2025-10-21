import { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import axios from "axios";
import { ArrowLeft, ArrowRight, ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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

const Taskboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState<string | null>(null);
  const projectsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = "http://localhost:5000/projects";

  // Fetching data from JSON server
  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    setUserRole(role);

    if (!userId) {
      return;
    }

    try {
      const response = await axios.get<Project[]>(API_URL);
      if (role === "admin") {
        setProjects(response.data);
      } else {
        const userProjects = response.data.filter((proj) =>
          proj.members.includes(userId)
        );
        setProjects(userProjects);
      }
    } catch (error) {
      console.log("Error fetching projects: ", error);
    }
  };

  // Rendering projects
  useEffect(() => {
    fetchProjects();
  }, [location]);

  const countTasks = (tasks: Task[]) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    return { total, completed, inProgress, pending };
  };

  // Adding projects by manager
  const handleAddProject = async () => {
    navigate("/manager-dashboard/add-project");
  };

  // Deleting projects by manager
  const handleDeleteProject = async (projectId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${projectId}`);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.log("Error deleting project: ", error);
    }
  };

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <ChevronLeft
            size={30}
            className="cursor-pointer mr-3 text-gray-600 hover:text-gray-800"
            onClick={() =>
              navigate(userRole === "admin" ? "/admin-dashboard" : "/dashboard")
            }
          />
          <h1 className="text-2xl font-bold text-gray-800">Your Projects</h1>

          {(userRole === "manager" || userRole === "admin") && (
            <button
              onClick={handleAddProject}
              className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Add Project
            </button>
          )}
        </div>

        <div className="flex-1">
          {projects.length === 0 ? (
            <p className="text-gray-600">No projects assigned yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProjects.map((project) => {
                const { total, completed, inProgress, pending } = countTasks(
                  project.tasks
                );
                return (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="bg-white border border-gray-300 rounded-lg p-4 cursor-pointer shadow-lg hover:translate-y-0.5 transition-all"
                  >
                    {(userRole === "manager" || userRole === "admin") && (
                      <button
                        className="top-2 right-2 text-gray-900 hover:text-red-500 cursor-pointer bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">
                      {project.name}
                    </h2>
                    <p className="text-gray-700 text-sm">
                      Total Tasks: {total}
                    </p>
                    <p className="text-green-700 text-sm">
                      Completed: {completed}
                    </p>
                    <p className="text-yellow-600 text-sm">
                      In Progress: {inProgress}
                    </p>
                    <p className="text-red-700 text-sm">Pending: {pending}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {projects.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-6 py-4 border-t border-gray-300">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              <ArrowLeft size={20} />
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Taskboard;
