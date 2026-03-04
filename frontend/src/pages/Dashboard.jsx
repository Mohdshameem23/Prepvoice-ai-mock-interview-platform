import React from "react";
import Sidebar from "../component/Sidebar";
import { Video, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-10 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <Link to="/create-interview">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
              <Video className="text-blue-600" size={24} />
            </div>

            <h2 className="text-lg font-semibold mb-2">Create new Interview</h2>

            <p className="text-gray-500 text-sm">
              Create AI Interview and schedule them with Candidates
            </p>
          </div>
        </Link>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
            <Phone className="text-blue-600" size={24} />
          </div>

          <h2 className="text-lg font-semibold mb-2">
            Create phone Screening call
          </h2>

          <p className="text-gray-500 text-sm">
            Schedule phone screening call with candidates
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
