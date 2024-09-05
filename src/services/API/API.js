import axios from "axios";
import config from "./../../config"

const BASE_URL = config.API_URL;
// await new Promise((resolve) => setTimeout(resolve, 190000));

const authConfig = {
  headers: {
    Authorization: null,
  },
  // timeout: 200000,
};

// <---------------------------------------------------------------------->
// User registration
const registrationRequest = async (user) => {
  return await axios.post(`${BASE_URL}/register`, user);
};

// User confirmEmail
const confirmEmailRequest = async (token) => {
  return await axios.post(`${BASE_URL}/confirm-registration`, token);
};

// User authentication
const logInRequest = async (user) => {
  return await axios.post(`${BASE_URL}/login`, user);
};

// refresh user
const refreshRequest = async (refresh_token) => {
  return await axios.post(`${BASE_URL}/refresh`, {
    refresh_token: refresh_token,
  });
};

// LogOut
const logOutRequest = async (refresh_token) => {
  return await axios.post(`${BASE_URL}/logout`, {
    refresh_token: refresh_token,
  });
};

//reset Password confirm email
const resetPasswConfrmEmailRequest = async (confirmEmail) => {
  return await axios.post(`${BASE_URL}/reset-password/send-email`, {
    email: confirmEmail,
  });
};

// reset password
const resetPasswordRequest = async (data) => {
  return await axios.post(`${BASE_URL}/reset-password`, data);
};

// <---------------------------------------------------------------------->

// Get user info
const getUserInfoRequest = async () => {
  return await axios.get(`${BASE_URL}/user`);
};

// user start exam session
const postUserStartSessionRequest = async (exam_id, set_index) => {
  return await axios.post(
    `${BASE_URL}/user/session-start/${exam_id}/${set_index}`
  );
};

// Get user session
const getUserSessionRequest = async () => {
  return await axios.get(`${BASE_URL}/user/session`);
};

// user stop exam session
const postUserStopSessionRequest = async () => {
  return await axios.post(`${BASE_URL}/user/session-stop`);
};

// user tasks decsriptions
const getUserTasksDecsriptionsRequest = async (BASE_URL_IP_ADDRESS) => {
  return await axios.get(
    `http://${BASE_URL_IP_ADDRESS}:8081/tasks/descriptions`,
    authConfig
  );
};

// user tasks solutions
const getUserTasksSolutionsRequest = async (BASE_URL_IP_ADDRESS) => {
  return await axios.get(
    `http://${BASE_URL_IP_ADDRESS}:8081/tasks/solutions`,
    authConfig
  );
};

// user one index tasks check
const postOneTasksCheckResult = async (BASE_URL_IP_ADDRESS, set_index) => {
  return await axios.post(
    `http://${BASE_URL_IP_ADDRESS}:8081/tasks/${set_index}/check`,
    {},
    authConfig
  );
};

// user all tasks check
const postAllTasksCheckResult = async (BASE_URL_IP_ADDRESS) => {
  return await axios.post(
    `http://${BASE_URL_IP_ADDRESS}:8081/tasks/check`,
    {},
    authConfig
  );
};

// user task terminal
const getUserTasksTerminalRequest = async (BASE_URL_IP_ADDRESS) => {
  return await axios.get(`http://${BASE_URL_IP_ADDRESS}:8082`, authConfig);
};

// <---------------------------------------------------------------------->
//Get exams
const getAllExamsRequest = async () => {
  return await axios.get(`${BASE_URL}/exams`);
};

//get offer
const getAllOffersRequest = async () => {
  return await axios.get(`${BASE_URL}/offers`);
};

//offers buy exams
const buyExamsRequest = async (stripe_price_id) => {
  return await axios.post(
    `${BASE_URL}/create-checkout-session/${stripe_price_id}`
  );
};
// <---------------------------------------------------------------------->

const APIs = {
  registrationRequest,
  logInRequest,
  logOutRequest,
  refreshRequest,
  confirmEmailRequest,

  resetPasswConfrmEmailRequest,
  resetPasswordRequest,

  getUserInfoRequest,
  postUserStartSessionRequest,
  postUserStopSessionRequest,

  getUserSessionRequest,
  getUserTasksDecsriptionsRequest,
  getUserTasksSolutionsRequest,
  postOneTasksCheckResult,
  postAllTasksCheckResult,
  getUserTasksTerminalRequest,

  getAllExamsRequest,
  getAllOffersRequest,
  buyExamsRequest,
};

export default APIs;
