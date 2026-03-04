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
  console.log(questions,formData)
   const handleFinish = async () => {
  try {
    console.log("ggg")
    await axios.post("http://localhost:5000/api/create", {
      ...formData,
      questions: questions, // generated questions
      userEmail: "test@gmail.com", // replace with logged-in user email
    });

    toast.success("Interview Created Successfully!");
    navigate("/dashboard");
  } catch (error) {
    toast.error("Failed to save interview");
  }
};

  if (!questions) {
    return (
      <div className="p-10">
        <p>No Questions Found</p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h1 className="text-2xl font-bold">
          Interview Questions
        </h1>
      </div>

      {/* Job Info Card */}
      {/* <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="font-semibold text-lg">
          {formData.jobPosition}
        </h2>

        <p className="text-gray-600 mt-2">
          {formData.jobDescription}
        </p>

        <div className="flex gap-4 mt-3 text-sm text-blue-600">
          <span>
            Duration: {formData.duration}
          </span>

          <span>
            Type: {formData.type.join(", ")}
          </span>
        </div>
      </div> */}

      {/* Questions List */}
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
        <button className=" bg-blue-500 rounded-2xl p-2 text-amber-50 hover:cursor-pointer" onClick={handleFinish}>Create Interview Link & Finish</button>
      </div>
    </div>
  );
};

export default Questions;
