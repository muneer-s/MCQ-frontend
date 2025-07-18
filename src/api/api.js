import userRoutes from "../service/endPoints/userEndPoints";
import Api from "../service/axios";

const signup = async (userData) => {
  try {
    const result = await Api.post(userRoutes.register, userData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const result = await Api.post(userRoutes.login, credentials);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getQuestions = async () => {
  try {
    const result = await Api.get("/questions");
    return result.data;
  } catch (error) {
    throw error;
  }
};

const submitAnswers = async (answers, feedback) => {
  try {
    const result = await Api.post("/submit", { answers, feedback });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const submitFeedback = async (testId, selectedEmoji, comment) => {
  try {
    const result = await Api.post(userRoutes.feedback, {
      testId,
      emoji: selectedEmoji,
      comment,
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Network error or server unavailable" };
    }
  }
};

export { signup, login, getQuestions, submitAnswers, submitFeedback };
