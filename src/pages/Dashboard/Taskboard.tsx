import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Layout/Sidebar'
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
}

interface Project {
  id: string;
  name: string;
  members: string[];
  tasks: Task[];
}
const Taskboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchProjects = async() => {
      const userId = localStorage.getItem("userId");
      
      if(!userId){
        return;
      }

      try {
        const res =  await axios.get<Project[]>("http://localhost:5000/projects");
        const userProjects = res.data.filter((proj) => proj.members.includes(userId));
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects: ",error);
      }
    };
    fetchProjects();
  }, []);

  const countTasks = (tasks: Task[]) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    return { total,completed,inProgress,pending };
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Projects</h1>
        
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: Project) => {
              const { total, completed, inProgress, pending } = countTasks(project.tasks);
              return (
                <div
                  key={project.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 cursor-pointer shadow-lg"
                >
                  <h2 className="text-lg font-semibold text-blue-900 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-700 text-sm">Total Tasks: {total}</p>
                  <p className="text-green-700 text-sm">Completed: {completed}</p>
                  <p className="text-yellow-600 text-sm">In Progress: {inProgress}</p>
                  <p className="text-red-700 text-sm">Pending: {pending}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Taskboard