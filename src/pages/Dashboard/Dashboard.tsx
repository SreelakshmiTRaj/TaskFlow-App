import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import wave from "../../assets/wave.png";

const Dashboard = () => {
  return (
    <div>
      <div className="">
        <img src={wave} alt="" className="" />
        <p className=""></p>
      </div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
