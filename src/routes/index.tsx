import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../interfaces";
import { clear } from "../store/slices/notificationSlice";
import {AllRoutes} from "./Routes";

const mapState = (state: AppState) => ({
  notification: state.notification,
});

const mapDispatch = {
  clear,
};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AllRoutes);
