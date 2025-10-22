import { useState, type FormEvent } from "react";
import ManagerSidebar from "../../components/Layout/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface User {
  id: string;
  name: string;
}

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

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const navigate = useNavigate();

  const PROJECTS_API = "/api/projects";
  const USERS_API = "/api/users";

  const handleAddMember = () => {
    if (memberName.trim() && !members.includes(memberName.trim())) {
      setMembers([...members, memberName.trim()]);
      setMemberName("");
    }
  };

  const handleRemoveMember = (name: string) => {
    setMembers(members.filter((m) => m !== name));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert("Please enter a project name.");
      return;
    }

    try {
      const { data: allUsers } = await axios.get<User[]>(USERS_API);

      const matchedMemberIds = members
        .map((name) => {
          const user = allUsers.find(
            (u) => u.name.toLowerCase() === name.toLowerCase()
          );
          return user ? user.id : null;
        })
        .filter((id): id is string => id !== null);

      const unmatchedNames = members.filter(
        (name) =>
          !allUsers.some((u) => u.name.toLowerCase() === name.toLowerCase())
      );
      if (unmatchedNames.length > 0) {
        alert(
          `Some names were not found in the database and will be skipped: ${unmatchedNames.join(
            ", "
          )}`
        );
      }

      const newProject: Project = {
        id: `p-${Date.now()}`,
        name: projectName.trim(),
        members: matchedMemberIds,
        tasks: [],
      };

      await axios.post(PROJECTS_API, newProject, {
        headers: { "Content-Type": "application/json" },
      });

      navigate("/dashboard/taskboard", { state: { refresh: Date.now() }});
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to save project. Check if json-server is running.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ManagerSidebar />

      <div className="flex-1 flex flex-col p-8">
        <div className="flex items-center mb-6">
          <ChevronLeft
            size={30}
            className="cursor-pointer mr-3 text-gray-600 hover:text-gray-800"
            onClick={() => navigate("/dashboard/taskboard")}
          />
          <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 max-w-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter project name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Members
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter member name"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Add
              </button>
            </div>

            <ul className="list-disc pl-5 text-gray-700">
              {members.map((name) => (
                <li
                  key={name}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-1"
                >
                  <span>{name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(name)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition w-full"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
