import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Code,
  User,
  Briefcase,
  Puzzle,
  Users,
  ArrowRight,
} from "lucide-react";


const CreateInterview = () => {
  const navigate = useNavigate();

  // ===============================
  // Form State
  // ===============================
  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    type: [],
  });

  // Loader State
  const [loading, setLoading] = useState(false);

  // ===============================
  // Handle Input Change
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // Multi Select Type
  // ===============================
  const handleTypeSelect = (typeName) => {
    setFormData((prev) => {
      const alreadySelected = prev.type.includes(typeName);

      return {
        ...prev,
        type: alreadySelected
          ? prev.type.filter((t) => t !== typeName)
          : [...prev.type, typeName],
      };
    });
  };

  // ===============================
  // Generate Questions API Call
  // ===============================
  const handleGenerate = async () => {
    // Simple Validation
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.duration ||
      formData.type.length === 0
    ) {
      toast.error("Please fill in all fields and select at least one interview type.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/questionList",
        formData,
      );
      console.log(res)
      if(res.data){
        toast.success("Questions generated successfully!");
      }

      let data = res.data.questions;

      // Remove markdown if exists
      if (typeof data === "string") {
        data = data.replace(/```json|```/g, "");
      }

      const parsed = JSON.parse(data);

      // Navigate to questions page
      navigate("/questions", {
        state: {
          questions: parsed.interviewQuestions,
          formData,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to generate questions. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Interview Types
  // ===============================
  const interviewTypes = [
    { name: "Technical", icon: <Code size={16} /> },
    { name: "Behavioral", icon: <User size={16} /> },
    { name: "Experience", icon: <Briefcase size={16} /> },
    { name: "Problem Solving", icon: <Puzzle size={16} /> },
    { name: "Leadership", icon: <Users size={16} /> },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate("/")} />
        <h1 className="text-2xl font-bold">Create New Interview</h1>
      </div>
      <div className="max-w-4xl">
        {/* ================= Job Position ================= */}
        <div className="mb-6">
          <label className="font-medium block mb-2">Job Position</label>

          <input
            type="text"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
            placeholder="eg. Full Stack Developer"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ================= Job Description ================= */}
        <div className="mb-6">
          <label className="font-medium block mb-2">Job Description</label>

          <textarea
            rows={6}
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Enter job description"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* ================= Duration ================= */}
        <div className="mb-6">
          <label className="font-medium block mb-2">Interview Duration</label>

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Duration</option>
            <option value="15 Minutes">15 Minutes</option>
            <option value="30 Minutes">30 Minutes</option>
            <option value="45 Minutes">45 Minutes</option>
            <option value="60 Minutes">60 Minutes</option>
          </select>
        </div>

        {/* ================= Interview Type ================= */}
        <div className="mb-10">
          <label className="font-medium block mb-3">Interview Type</label>

          <div className="flex flex-wrap gap-3">
            {interviewTypes.map((type) => {
              const isSelected = formData.type.includes(type.name);

              return (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => handleTypeSelect(type.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type.icon}
                  {type.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= Generate Button ================= */}
        <div className="flex flex-row-reverse items-end gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Generating..." : "Generate Question"}

            {!loading && <ArrowRight size={18} />}
          </button>

          {/* Loader */}
          {loading && (
            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-gray-700 text-lg">
                Generating AI Questions...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateInterview;
