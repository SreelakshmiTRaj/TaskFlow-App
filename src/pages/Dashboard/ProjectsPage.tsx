import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
  members: string[];
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get<Project>(
          `http://localhost:5000/projects/${id}`
        );
        console.log("Fetched project: ",res.data);
        console.log("User ID from localStorage: ",userId);
        setProject(res.data);

        const filtered = res.data.tasks.filter(
          (task) => task.assignedTo === userId
        );
        console.log(filtered);
        setUserTasks(filtered);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id, userId]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || !project) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = userTasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: destination.droppableId as Task["status"] }
        : task
    );

    setUserTasks(updatedTasks);

    const updatedProjectTasks = project.tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: destination.droppableId as Task["status"] }
        : task
    );

    const updatedProject = { ...project, tasks: updatedProjectTasks };
    setProject(updatedProject);

    try {
      await axios.patch(`http://localhost:5000/projects/${id}`, updatedProject);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const getTasksByStatus = (status: Task["status"]) =>
    userTasks.filter((t) => t.status === status);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {project?.name || "Project"}
        </h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["pending", "in-progress", "completed"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-xl shadow-md p-4 min-h-[400px] border-2 transition-colors ${
                      snapshot.isDraggingOver
                        ? "border-green-600"
                        : "border-gray-200"
                    }`}
                  >
                    <h2 className="text-lg font-semibold capitalize mb-4 text-gray-700">
                      {status.replace("-", " ")}
                    </h2>

                    {getTasksByStatus(status as Task["status"]).length === 0 ? (
                      <p className="text-gray-500 text-sm">No tasks here</p>
                    ) : (
                      getTasksByStatus(status as Task["status"]).map(
                        (task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-gray-50 border border-gray-300 rounded-lg p-3 mb-3 text-gray-800 shadow-sm ${
                                  snapshot.isDragging
                                    ? "bg-green-50 border-green-400"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </div>
                            )}
                          </Draggable>
                        )
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectDetails;
