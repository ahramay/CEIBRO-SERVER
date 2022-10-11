import { toast } from "react-toastify";
import { REGISTER } from "redux-persist/es/constants";
import { takeLatest } from "redux-saga/effects";
import {
  CREATE_ROOM,
  FORGET_PASSWORD,
  GET_PROFILE,
  LOGIN,
  OTP_VERIFY,
  RESET_PASSWORD,
  SEND_VERIFY_EMAIL,
  UPDATE_MY_PROFILE,
  VERIFY_EMAIL,
} from "../../config/auth.config";
import apiCall from "../../utills/apiCall";
import { ActionInterface } from "../reducers";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const loginRequest = apiCall({
  type: LOGIN,
  method: "post",
  path: "/auth/login",
  success: (_res: any) => {
    toast.success("logged in successfully");
  },
});

const verifyEmail = apiCall({
  type: VERIFY_EMAIL,
  method: "post",
  path: "/auth/veify-email",
  onFailSaga: (err) => {
    console.log("it is failed", err);
  },
});

const registerRequest = apiCall({
  type: REGISTER,
  method: "post",
  path: "/auth/register",
  success: (_res: any) => {
    toast.success("Verification email sent");
  },
});

const createChatRoom = apiCall({
  type: CREATE_ROOM,
  method: "post",
  path: "/chat/rooms",
  success: (_res: any, _action: ActionInterface) => {
    toast.success("Chat room created successfully");
  },
});

const getMyProfile = apiCall({
  type: GET_PROFILE,
  method: "post",
  path: "/users/profile",
});

const otpVerify = apiCall({
  type: OTP_VERIFY,
  method: "post",
  path: (payload) => `/auth/verify-email?otp=${payload?.other}`,
});

const updateMyProfile = apiCall({
  type: UPDATE_MY_PROFILE,
  method: "post",
  path: "/users/profile",
  success: () => {
    toast.success("Profile updated successfully");
  },
});

const forgetPassword = apiCall({
  type: FORGET_PASSWORD,
  method: "post",
  path: `/auth/forgot-password`,
});

const resetPassword = apiCall({
  type: RESET_PASSWORD,
  method: "post",
  path: (payload) => `/auth/reset-password?token=${payload?.other}`,
  // reset-password?otp=grgdfvdf
});

const sendVerifyEmail = apiCall({
  type: SEND_VERIFY_EMAIL,
  method: "post",
  path: `/auth/send-verification-email`,
});

function* projectSaga() {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(REGISTER, registerRequest);
  yield takeLatest(CREATE_ROOM, createChatRoom);
  yield takeLatest(VERIFY_EMAIL, verifyEmail);
  yield takeLatest(GET_PROFILE, getMyProfile);
  yield takeLatest(UPDATE_MY_PROFILE, updateMyProfile);
  yield takeLatest(OTP_VERIFY, otpVerify);
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(SEND_VERIFY_EMAIL, sendVerifyEmail);
}

export default projectSaga;
