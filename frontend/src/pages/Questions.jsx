import React from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const Questions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data from previous page
  const { questions, formData } = location.state || {};

  // ===============================
  // Finish & Create Interview
  // ===============================
  const handleFinish = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/create",
        {
          ...formData,
          questions,
          userEmail: "test@gmail.com", // replace with auth user later
        }
      );
      console.log(response)

      toast.success("Interview Created Successfully!");

      navigate("/Interview", {
        state: {
          interviewId: response.data.data._id,
          duration: formData.duration,
          type: formData.type,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to save interview");
    }
  };

  // ===============================
  // No Data Guard
  // ===============================
  if (!questions || !formData) {
    return (
      <div className="p-10">
        <p>No Questions Found</p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-8">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold">Interview Questions</h1>
      </div>

      {/* ================= QUESTIONS LIST ================= */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow border"
          >
            <p className="font-medium">
              Q{index + 1}. {q.question}
            </p>
            <span className="text-sm text-blue-600">
              {q.type}
            </span>
          </div>
        ))}

        {/* ================= FINISH BUTTON ================= */}
        <button
          className="bg-blue-600 text-white rounded-xl px-6 py-3 mt-6 hover:bg-blue-700"
          onClick={handleFinish}
        >
          Create Interview Link & Finish
        </button>
      </div>
    </div>
  );
};

export default Questions;