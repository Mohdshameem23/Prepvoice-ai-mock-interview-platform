import React from "react";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import CreateInterview from "./component/InterviewForm";
import Sidebar from "./component/Sidebar";
import Questions from "./pages/Questions";

const App = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Pages */}
      <div className="p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-interview" element={<CreateInterview />} />
          <Route path="/questions" element={<Questions />} />

        </Routes>
      </div>

    </div>
  );
};

export default App;
