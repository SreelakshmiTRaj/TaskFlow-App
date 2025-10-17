import Sidebar from "../../components/Layout/Sidebar";


const AddTask = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6">
        <p className="text-2xl font-bold text-gray-800 mb-4">Add Task</p>
      </div>
    </div>
  );
};

export default AddTask;
