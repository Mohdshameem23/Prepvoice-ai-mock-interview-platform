
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Copy,
  Mail,
  Slack,
  MessageCircle,
  Clock,
  Layers,
} from "lucide-react";
import { toast } from "react-toastify";

const Interview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get interview data from navigation state
  const interviewId =
    location.state?.interviewId 

  const duration = location.state?.duration || "15 Minutes";
  const type = location.state?.type || ["Technical"];

  const interviewLink = `http://localhost:3000/interview/${interviewId}`;
console.log(interviewId,duration,interviewLink)
  // ===============================
  // Copy Link Function
  // ===============================
  const handleCopy = () => {
    navigator.clipboard.writeText(interviewLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4">
      {/* ================= HEADER ================= */}
      <div className="w-full max-w-2xl flex items-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="mr-3 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Interview Created</h2>
      </div>

      {/* ================= PROGRESS BAR ================= */}
      <div className="w-full max-w-2xl mb-10">
        <div className="h-1 bg-blue-100 rounded-full">
          <div className="h-1 bg-blue-600 rounded-full w-full"></div>
        </div>
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}
      <div className="flex flex-col items-center mb-10 text-center">
        <CheckCircle className="text-green-500" size={60} />
        <h3 className="mt-4 text-xl font-semibold">
          Your AI Interview is Ready 🎉
        </h3>
        <p className="text-gray-500 mt-2">
          Share this link with your candidate to start the interview process.
        </p>
      </div>

      {/* ================= LINK SECTION ================= */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex items-center mb-3">
          <span className="font-semibold">Interview Link</span>
          <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            Valid for 30 days
          </span>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={interviewLink}
            readOnly
            className="w-full bg-gray-100 rounded px-3 py-2 text-sm mr-2"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
          >
            <Copy className="mr-1" size={16} />
            Copy
          </button>
        </div>

        {/* Interview Details */}
        <div className="flex items-center text-gray-600 text-sm space-x-6">
          <span className="flex items-center">
            <Clock className="mr-1" size={16} />
            {duration}
          </span>

          <span className="flex items-center">
            <Layers className="mr-1" size={16} />
            {type.join(", ")}
          </span>
        </div>
      </div>

      {/* ================= SHARE SECTION ================= */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-4 text-center">Share Via</div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="flex items-center px-6 py-3 border rounded-lg hover:bg-gray-50">
            <Mail className="mr-2" size={18} />
            Email
          </button>

          <button className="flex items-center px-6 py-3 border rounded-lg hover:bg-gray-50">
            <Slack className="mr-2" size={18} />
            Slack
          </button>

          <button className="flex items-center px-6 py-3 border rounded-lg hover:bg-gray-50">
            <MessageCircle className="mr-2" size={18} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;