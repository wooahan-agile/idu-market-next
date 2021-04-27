import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import boardSaga from "./boardSaga";

//제너레이터
export default function* rootSaga() {
  yield all([fork(authSaga), fork(boardSaga)]);
}
