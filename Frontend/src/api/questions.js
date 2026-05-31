import API from "./axios";

// get all questions
export const getQuestions = (page = 1, search = "") =>
  API.get(`/questions?page=${page}&search=${search}`);

export const getQuestionById = (id) =>
  API.get(`/questions/${id}`);

export const createQuestion = (data) =>
  API.post("/questions", data);