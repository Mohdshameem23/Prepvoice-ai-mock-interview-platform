import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const InterviewJoin = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
  });

  // ===============================
  // Fetch Interview Details
  // ===============================
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/interview/${interviewId}`
        );

        setInterview(response.data.data);
      } catch (error) {
        toast.error("Interview not found");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  // ===============================
  // Handle Form Submit
  // ===============================
  const handleJoin = (e) => {
    e.preventDefault();

    if (!candidate.name || !candidate.email) {
      return toast.error("Please fill all fields");
    }

    navigate(`/interview/start/${interviewId}`, {
      state: {
        candidate,
        interview,
      },
    });
  };

  if (loading) return <div className="p-10">Loading...</div>;

  if (!interview)
    return <div className="p-10">Interview not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8 flex flex-col items-center">
        {/* Logo */}
        <img src="/Gemini.png" alt="Logo" className="h-12 mb-3" />
        <div className="text-gray-600 mb-6">
          AI-Powered Interview Platform
        </div>

        {/* Illustration */}
        <img
          src="/Interview.png"
          alt="Interview Illustration"
          className="h-40 mb-4 object-contain"
        />

        {/* Job Title */}
        <div className="text-center mb-3">
          <div className="text-2xl font-bold mb-1">
            {interview.jobPosition}
          </div>

          <div className="text-gray-500">
            {interview.duration} Minutes
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleJoin}
          className="w-full max-w-md flex flex-col gap-3 mt-4"
        >
          <label className="font-medium">
            Enter your full name
          </label>
          <input
            value={candidate.name}
            onChange={(e) =>
              setCandidate({ ...candidate, name: e.target.value })
            }
            className="px-4 py-2 rounded border"
            placeholder="e.g. Shameem"
          />

          <label className="font-medium">
            Enter your Email
          </label>
          <input
            value={candidate.email}
            onChange={(e) =>
              setCandidate({ ...candidate, email: e.target.value })
            }
            className="px-4 py-2 rounded border"
            placeholder="e.g. shameem@gmail.com"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4"
          >
            Join Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewJoin;