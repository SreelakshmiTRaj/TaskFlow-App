import Sidebar from "../../components/Layout/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> 
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-2xl font-bold text-gray-800"> </h1>
      </div>
    </div> 
  );
};

export default Dashboard;
