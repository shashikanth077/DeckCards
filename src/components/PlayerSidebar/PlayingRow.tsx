import React, { useState } from "react";
import {
  BoardPlayActionProps,
  BoardPlayerActionProps,
  Player,
  Board,
  PlayerCardActionProps,
  NotificationActionProps,
} from "../../interfaces";

import { AiOutlineEdit } from "react-icons/ai";
import { FiCheck, FiX } from "react-icons/fi";
import { useForm, Resolver } from "react-hook-form"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { shuffleCards } from "../../utils/common";

interface Props {
  board: Board;
  player: Player;
  updatePlayer: ActionCreatorWithPayload<BoardPlayerActionProps, string>;
  shuffle: ActionCreatorWithPayload<PlayerCardActionProps, string>;
  play: (payload: BoardPlayActionProps) => void;
  notify: ActionCreatorWithPayload<NotificationActionProps, string>;
}

const PlayerRow = ({
  player,
  updatePlayer,
  shuffle,
  board,
  notify,
  play,
}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const resolver: Resolver<any> = async (values) => {
    return {
      values: values[`player_${player.id}_name`] ? values : {},
      errors:  {},
    }
  }
  

  const handleShuffle = () => {
    const shuffledCards = shuffleCards(player.playerCards);
    shuffle({
      playerId: player.id,
      shuffledCards,
    });
    notify({
      alertType: "success",
      message: `${player.playerName} shuffled cards`,
    });
  };

  const playTurn = () => {
    if (player.id !== board.turn) {
      notify({
        alertType: "error",
        message: `Not your turn ${player.playerName}`,
      });
      return;
    }
    play({
      player,
      board,
    });
  };

  const isPlayerTurn = player.id === board.turn;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver })

  const onSubmit = handleSubmit((data) => {
    updatePlayer({
      name: data[`player_${player.id}_name`],
      playerId: player.id,
    });
    setEditMode(false);
  });
  
  return (
    <div
      className={`w-full d-flex p-2 ${isPlayerTurn ? "bg-green" : ""} ${
        !player.playerCards.length && "bg-gray"
      }`}
    >
      <div className={`cardDisplay`}></div>
      <div className="">
        {player.playerCards.length ? (
          <>
            <h4 className={`d-flex flex-wrap align-items-center w-full`}>
              {editMode ? (
                <form className="w-full" onSubmit={onSubmit}>
                  <input
                    type="text"
                    className="max-w-full p-1"
                    {...register(`player_${player.id}_name`)}
                   />
                  <button
                    className=""
                    type="submit"
                  >
                    <FiCheck />
                  </button>
                  <button
                    className=""
                    onClick={() => setEditMode(false)}
                  >
                    <FiX />
                  </button>
                </form>
              ) : (
                <>
                  {player.playerName}{" "}
                  <button onClick={() => setEditMode(true)}>
                  <AiOutlineEdit className="" />
                  </button>
                  {isPlayerTurn && (
                    <span className="bg-primary btn ml-4">
                      Your turn
                    </span>
                  )}
                </>
              )}
            </h4>
            <p className="text-secondary">
              {player.playerCards.length} Cards
            </p>
            {isPlayerTurn && (
              <div className="w-full d-flex flex-wrap justify-content-center">
                <button
                  disabled={!player.playerCards.length}
                  onClick={() => handleShuffle()}
                  className={`btn btn-secondary mr-4 homebtn-secondary`}
                >
                  Shuffle
                </button>
                <button
                  disabled={!player.playerCards.length}
                  onClick={() => playTurn()}
                  className={`btn btn-primary homebtn-primary`}
                >
                  Play
                </button>
              </div>
            )}
          </>
        ) : (
          <h4 className={`d-flex align-items-center`}>
            {player.playerName} has no cards left
          </h4>
        )}
      </div>
    </div>
  );
};

export default PlayerRow;
