import API from "./axios";

// get answers for question
export const getAnswersByQuestion = (questionId) =>
  API.get(`/answers/question/${questionId}`);

// submit answer
export const submitAnswer = (data) =>
  API.post("/answers", data);

export const getAnalytics = () =>
  API.get("/answers/analytics");