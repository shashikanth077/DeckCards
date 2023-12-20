import React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../../interfaces/initialStates";
import PlayerRow from "./PlayingRow";
import { PropsFromRedux } from ".";
import { Player } from "../../interfaces";

interface Props extends PropsFromRedux {}

const Players = ({ board, updatePlayer, shuffle, play, notify }: Props) => {
  const { gameId } = useParams<Params>();

  return (
    <div className="bg-white rounded">
      <h4 className="text-secondary font-bold">Game {gameId}</h4>
      <div className="w-full">
      {board.players.map((player: Player) => (
          <PlayerRow
            notify={notify}
            board={board}
            updatePlayer={updatePlayer}
            shuffle={shuffle}
            play={play}
            key={player.id}
            player={player}
          />
        ))}
      </div>
    </div>
  );
};

export default Players;
