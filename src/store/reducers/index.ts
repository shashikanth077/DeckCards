import { combineReducers } from "redux";
import notification from "../slices/notificationSlice";
import board from "../slices/boardSlice";

const rootReducer = combineReducers({
  notification,
  board,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
