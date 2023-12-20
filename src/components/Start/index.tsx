import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../interfaces";
import Start from "./Start";
import { start } from "../../store/slices/boardSlice";

const mapState = ({ board }: AppState) => ({
  board,
});

const mapDispatch = {
  startGame: start,
};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Start);
