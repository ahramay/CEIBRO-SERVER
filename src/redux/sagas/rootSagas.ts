import { all } from "@redux-saga/core/effects";
import projectSaga from "./project.sagas";
import authSaga from "./auth.saga";
import chatSaga from "./chat.saga";
import userSaga from "./user.saga";

export default function* rootSaga() {
  yield all([projectSaga(), authSaga(), chatSaga(), userSaga()]);
  // code after all-effect
}
