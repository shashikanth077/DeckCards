import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationActionProps } from "../../interfaces";
import { initialNotificationState } from "../../interfaces/initialStates";

const notification = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    show(state, action: PayloadAction<NotificationActionProps>) {
      state.alertType = action.payload.alertType;
      state.message = action.payload.message;
    },
    clear(state) {
      state.alertType = "";
      state.message = "";
    },
  },
});

export const { show, clear } = notification.actions;

export default notification.reducer;
