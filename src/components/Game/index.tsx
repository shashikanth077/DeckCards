import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../interfaces";
import { show } from "../../store/slices/notificationSlice";
import Game from "./Game";

const mapState = (state: AppState) => ({
  board: state.board,
});

const mapDispatch = {
  notify: show,
};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Game);
