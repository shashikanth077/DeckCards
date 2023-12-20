import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../interfaces";
import PlayingTable from "./PlayingTable";

const mapState = (state: AppState) => ({
  board: state.board,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlayingTable);
