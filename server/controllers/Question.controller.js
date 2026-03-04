const OpenAI = require("openai");
const { QUESTIONS_PROMPT } = require("../services/prompt");
const generateQuestionList = async (req, res) => {
  try {
    const jobPosition = req.body.jobPosition;
    const jobDescription = req.body.jobDescription;
    const interviewDuration = req.body.duration;
    const interviewType = req.body.type;
    console.log("hiiii");

    // Convert array → string
    const typeText = Array.isArray(interviewType)
      ? interviewType.join(", ")
      : interviewType;

    // Build prompt
    const FINAL_PROMPT = QUESTIONS_PROMPT.replace(
      "{jobPosition}",
      jobPosition || "",
    )
      .replace("{jobDescription}", jobDescription || "")
      .replace("{interviewDuration}", interviewDuration || "")
      .replace("{interviewType}", typeText || "");

    // OpenRouter client
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite-preview-09-2025",
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
    });

    const questions =
      completion.choices?.[0]?.message?.content || "No questions generated";

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to generate questions",
    });
  }
};
const Interview = require("../models/Interview.model");

const createInterview = async (req, res) => {
    console.log("create")
  try {
    const {
      jobPosition,
      jobDescription,
      duration,
      type,
      questions,
      userEmail,
    } = req.body;
    console.log(jobPosition,jobDescription,duration,type,questions,userEmail)

    const newInterview = new Interview({
      jobPosition,
      jobDescription,
      interviewDuration: duration,
      type,
      questionList: questions,
      userEmail
    });

    await newInterview.save();

    res.status(201).json({
      success: true,
      message: "Interview saved successfully",
      data: newInterview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to save interview",
    });
  }
};
module.exports ={ generateQuestionList,createInterview}
