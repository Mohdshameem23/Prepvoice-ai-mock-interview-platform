const express = require("express");
const router = express.Router();
// const {generateQuestionList}=require('../controllers/Question.controller'):

const {generateQuestionList,createInterview}=require('../controllers/Question.controller');
router.post('/questionList',generateQuestionList);
router.post('/create',createInterview)

module.exports=router;