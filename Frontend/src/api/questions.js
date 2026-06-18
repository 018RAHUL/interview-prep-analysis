import API from "./axios";

// get all questions
export const getQuestions = (page, search, category) =>
  API.get(`/questions?page=${page}&search=${search}&category=${category}`);

export const getCategories = async () =>
  API.get("/questions/categories");

export const getQuestionById = (id) =>
  API.get(`/questions/${id}`);

export const createQuestion = (data) =>
  API.post("/questions", data);