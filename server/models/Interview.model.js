const mongoose = require("mongoose");
const InterviewSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },

  jobPosition: {
    type: String,
    required: false,
  },

  jobDescription: {
    type: String,
    required: false,
  },

  interviewDuration: {
    type: String,
    required: false,
  },

  type: {
    type: [String],
    required: false,
  },

  questionList: {
    type: mongoose.Schema.Types.Mixed, // for JSON data
    required: false,
  },

  userEmail: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Interview", InterviewSchema);
