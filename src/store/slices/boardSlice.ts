import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { uid } from "uid";
import {
  BoardActionProps,
  BoardPlayActionProps,
  BoardPlayerActionProps,
  PlayActionProps,
  Player,
  TurnActionProps,
  PlayerCardActionProps,
} from "../../interfaces";
import { initialBoardState } from "../../interfaces/initialStates";
import Board from "../../utils/board";
import { play as playTurn, checkIfCardsMatch } from "../../utils/common";

import { history } from "../store";
import { show } from "./notificationSlice";

const boardSlice = createSlice({
  name: "game_board",
  initialState: initialBoardState,
  reducers: {
    startGame(state, { payload: { board } }: PayloadAction<BoardActionProps>) {
      state.id = board.id;
      state.players = board.players;
      state.cardsInMiddle = board.cardsInMiddle;
      state.turn = board.players[0].id;
      state.winner = null;
    },
    updateTurn(
      state,
      { payload: { turn, player } }: PayloadAction<TurnActionProps>
    ) {
      state.turn = turn || "";
      state.winner = turn ? null : player;
    },
    play(
      state,
      {
        payload: { cards, cardsInMiddle, player: playerParams },
      }: PayloadAction<PlayActionProps>
    ) {
      state.cardsInMiddle = [...cardsInMiddle];
      state.players = state.players.map((player: Player) =>
        player.id === playerParams.id
          ? {
              ...player,
              playerCards: [...cards],
            }
          : player
      );
    },
    updatePlayer(state, action: PayloadAction<BoardPlayerActionProps>) {
      state.players = state.players.map((player: Player) =>
        player.id === action.payload.playerId
          ? {
              ...player,
              playerName: action.payload.name,
            }
          : player
      );
    },
    shuffle(state, action: PayloadAction<PlayerCardActionProps>) {
      state.players = state.players.map((player: Player) =>
        player.id === action.payload.playerId
          ? {
              ...player,
              playerCards: [...action.payload.shuffledCards],
            }
          : player
      );
    },
  },
});

export const {
  startGame,
  play,
  updatePlayer,
  shuffle,
  updateTurn,
} = boardSlice.actions;

export const start = (board: Board) => (dispatch: Dispatch) => {
  const boardId = uid(8);
  console.log("game start",boardId);
  dispatch(
    startGame({
      board: {
        id: boardId,
        winner: null,
        ...board,
      },
    })
  );
  history.push(`/game/${boardId}`);
};

export const playAction = (payload: BoardPlayActionProps) => async (
  dispatch: Dispatch
) => {
  const { cards, cardsInMiddle, turn } = playTurn(
    payload.player,
    payload.board
  );
  // Displatch play
  dispatch(
    play({
      cards,
      cardsInMiddle,
      player: payload.player,
    })
  );

  const modifiedValues = checkIfCardsMatch(cardsInMiddle, cards);
  if (modifiedValues) {
    await new Promise<void>((done) =>
      setTimeout(() => {
        dispatch(
          play({
            cards: [...modifiedValues.cards],
            cardsInMiddle: [...modifiedValues.cardsInMiddle],
            player: payload.player,
          })
        );
        dispatch(
          show({
            alertType: "info",
            message: `${payload.player.playerName} cleared the table`,
          })
        );
        done();
      }, 200)
    );
  }
  // Dispatch next turn
  dispatch(
    updateTurn({
      turn,
      player: payload.player,
    })
  );
};

export const adminboardActions = boardSlice.actions;
export default boardSlice.reducer;
