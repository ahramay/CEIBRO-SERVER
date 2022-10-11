import { REGISTER } from "redux-persist/es/constants";
import {
  LOGIN,
  GET_USERS,
  CREATE_ROOM,
  LOGOUT,
  GET_PROFILE,
  UPDATE_MY_PROFILE,
  OTP_VERIFY,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
  SEND_VERIFY_EMAIL,
} from "../../config/auth.config";

import { createAction } from "./action";

export const loginRequest = createAction(LOGIN);
export const registerRequest = createAction(REGISTER);
export const logoutUser = createAction(LOGOUT);

export const getAllusers = createAction(GET_USERS);
export const createChatRoom = createAction(CREATE_ROOM);

export const getMyProfile = createAction(GET_PROFILE);
export const updateMyProfile = createAction(UPDATE_MY_PROFILE);
export const otpVerify = createAction(OTP_VERIFY);
export const forgetPassword = createAction(FORGET_PASSWORD);
export const resetPassword = createAction(RESET_PASSWORD);
export const verifyEmail = createAction(SEND_VERIFY_EMAIL);
