import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../interfaces";
import Players from "./Player";
import {
  updatePlayer,
  shuffle,
  playAction,
} from "../../store/slices/boardSlice";
import { show } from "../../store/slices/notificationSlice";

const mapState = (state: AppState) => ({
  board: state.board,
  notification: state.notification,
});

const mapDispatch = {
  notify: show,
  updatePlayer,
  shuffle,
  play: playAction,
};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Players);
