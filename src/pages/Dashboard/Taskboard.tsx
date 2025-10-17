import { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const projectsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get<Project[]>(
          "http://localhost:5000/projects"
        );
        const userProjects = res.data.filter((proj) =>
          proj.members.includes(userId)
        );
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };
    fetchProjects();
  }, []);

  const countTasks = (tasks: Task[]) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    return { total, completed, inProgress, pending };
  };

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
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your Projects
          </h1>

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
              <ArrowRight size={20}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Taskboard;
