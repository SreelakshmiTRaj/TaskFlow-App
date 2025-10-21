import { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  subtasks?: Subtask[];
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
  members: string[];
}

const ProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<{
    [key: string]: boolean;
  }>({});

  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API_URL}/projects/${projectId}`);
        setProject(res.data);
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [projectId]);

  const columns = {
    pending: tasks.filter((task) => task.status === "pending"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  // Adding tasks in pending column
  const addTask = async (status: Task["status"]) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: "Untitled Task",
      status,
      assignedTo: "user-id",
      subtasks: [],
    };
    try {
      await axios.post(`${API_URL}/tasks`, newTask);
      await axios.patch(`${API_URL}/projects/${projectId}`, {
        tasks: [...tasks, newTask],
      });

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Deleting task in pending column
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      const updatedTasks = tasks.filter((t) => t.id !== taskId);
      setTasks(updatedTasks);

      await axios.patch(`${API_URL}/projects/${projectId}`, {
        tasks: updatedTasks,
      });
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Renaming tasks 
  const renameTask = async (taskId: string, newTitle: string) => {
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}`, { title: newTitle });
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      );
      setTasks(updatedTasks);

      await axios.patch(`${API_URL}/projects/${projectId}`, {
        tasks: updatedTasks,
      });
    } catch (err) {
      console.error("Error renaming task:", err);
    }
  };

  
  const updateTask = async (updatedTask: Task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    try {
      await axios.put(`${API_URL}/tasks/${updatedTask.id}`, updatedTask);
      setTasks(updatedTasks);

      await axios.patch(`${API_URL}/projects/${projectId}`, {
        tasks: updatedTasks,
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Adding subtask in pending column
  const addSubtask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const newSubtask: Subtask = {
      id: `s-${Date.now()}`,
      title: "Untitled Subtask",
      completed: false,
    };
    const updatedTask = {
      ...task,
      subtasks: [...(task.subtasks || []), newSubtask],
    };
    updateTask(updatedTask);
  };

  // Renaming subtask 
  const renameSubtask = async (
    taskId: string,
    subtaskId: string,
    newTitle: string
  ) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !task.subtasks) return;
    const updatedTask = {
      ...task,
      subtasks: task.subtasks.map((st) =>
        st.id === subtaskId ? { ...st, title: newTitle } : st
      ),
    };
    updateTask(updatedTask);
  };

  // Delete subtask
  const deleteSubtask = async (taskId: string, subtaskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !task.subtasks) return;
    const updatedTask = {
      ...task,
      subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
    };
    updateTask(updatedTask);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    const updatedTask = {
      ...task,
      status: destination.droppableId as Task["status"],
    };
    updateTask(updatedTask);
  };

  const toggleSubtasks = (taskId: string) => {
    setExpandedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6"><ChevronLeft size={20} onClick={() => navigate('/dashboard/taskboard')} className="cursor-pointer bg-gray-300 mb-5"/>{project?.name}</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-6">
            {(["pending", "in-progress", "completed"] as const).map(
              (status) => (
                <div key={status} className="bg-white p-4 rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold capitalize">
                      {status.replace("-", " ")}
                    </h2>
                    {status === "pending" && (
                      <button
                        onClick={() => addTask(status)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                  </div>

                  <Droppable droppableId={status}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-3 min-h-[150px]"
                      >
                        {columns[status].map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="bg-gray-100 p-3 rounded-lg shadow-sm"
                              >
                                {editingTaskId === task.id ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      className="font-medium bg-white border rounded px-2 py-1 w-full"
                                      value={task.title}
                                      onChange={(e) =>
                                        renameTask(task.id, e.target.value)
                                      }
                                    />
                                    <button
                                      onClick={() => setEditingTaskId(null)}
                                      className="text-green-600"
                                    >
                                      <Check size={18} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                      {task.title}
                                    </span>
                                    <div className="flex gap-2 items-center">
                                      {task.subtasks &&
                                        task.subtasks.length > 0 && (
                                          <button
                                            onClick={() =>
                                              toggleSubtasks(task.id)
                                            }
                                          >
                                            {expandedTasks[task.id] ? (
                                              <ChevronUp size={20} />
                                            ) : (
                                              <ChevronDown size={20} />
                                            )}
                                          </button>
                                        )}
                                      <button
                                        onClick={() =>
                                          setEditingTaskId(task.id)
                                        }
                                        className="text-gray-600 hover:text-blue-600"
                                      >
                                        <Pencil size={16} />
                                      </button>
                                      <button
                                        onClick={() => addSubtask(task.id)}
                                        className="text-green-600 hover:text-green-800"
                                      >
                                        <Plus size={16} />
                                      </button>
                                      <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {expandedTasks[task.id] &&
                                  task.subtasks?.map((st) => (
                                    <div
                                      key={st.id}
                                      className="flex justify-between items-center text-sm bg-white rounded p-2 mt-2"
                                    >
                                      {editingSubtaskId === st.id ? (
                                        <div className="flex items-center w-full gap-2">
                                          <input
                                            className="flex-1 bg-white border rounded px-2 py-1"
                                            value={st.title}
                                            onChange={(e) =>
                                              renameSubtask(
                                                task.id,
                                                st.id,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <button
                                            onClick={() =>
                                              setEditingSubtaskId(null)
                                            }
                                            className="text-green-600"
                                          >
                                            <Check size={14} />
                                          </button>
                                        </div>
                                      ) : (
                                        <>
                                          <span>{st.title}</span>
                                          <div className="flex gap-2">
                                            <button
                                              onClick={() =>
                                                setEditingSubtaskId(st.id)
                                              }
                                              className="text-gray-600 hover:text-blue-600"
                                            >
                                              <Pencil size={16} />
                                            </button>
                                            <button
                                              onClick={() =>
                                                deleteSubtask(task.id, st.id)
                                              }
                                              className="text-red-600 hover:text-red-800"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            )}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectsPage;
