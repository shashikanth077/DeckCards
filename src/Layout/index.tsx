import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../interfaces";
import Layout from "./Layout";

const mapState = (state: AppState) => ({
  board: state.board,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Layout);
