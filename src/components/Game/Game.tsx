import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerSideBar from "../PlayerSidebar";
import PlayingTable from "../PlayingTable";
import { Params } from "../../interfaces/initialStates";
import { Player } from "../../interfaces";
import { PropsFromRedux } from ".";

interface Props extends PropsFromRedux {}

const Game = ({ board, notify }: Props) => {
  const { gameId } = useParams<Params>();

  const currentPlayer = board?.players?.find(
    (player: Player) => player?.id === board.turn
  );

  useEffect(() => {
    if (board.winner) {
      notify({
        alertType: "success",
        message: `${board.winner.playerName} WINS!!!`,
      });
    }
  }, [board.winner, notify]);

  return (
    <>
      <div className="container game-container d-flex w-full  flex-nowrap align-items-center">
        <div className="w-full">
          <h4 className="">
            {board.winner
              ? `${board.winner.playerName} WINS!!!`
              : `${currentPlayer?.playerName}'s Turn`}
          </h4>
          <PlayingTable />
        </div>
      </div>
      <div className="game-playbar">
          <PlayerSideBar />
        </div>
    </>
  );
};

export default Game;
