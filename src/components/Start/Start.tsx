import React from "react";
import { useForm, Resolver } from 'react-hook-form';
import Board from "../../utils/board";
import {PropsFromRedux} from '.';

type FormValues = {
  numberOfPlayers: number;
};


interface Props extends PropsFromRedux {}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.numberOfPlayers ? values : {},
    errors: !values.numberOfPlayers
      ? {
        numberOfPlayers: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};


const Start = ({ startGame }: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });

  const playerArr = Array(3)
    .fill(null)
    .map((_, i) => i + 2);

  const onSubmit = handleSubmit((data) => {
      let gameBoard = new Board();
      gameBoard.start(data.numberOfPlayers);
      const gameBoardJS = gameBoard.toPlainObj();

      console.log("gameBoardJS",gameBoardJS);
      startGame(gameBoardJS);
  });
   
  return (
    <div className="w-full">
      <form onSubmit={onSubmit}
        style={{ height: "50vh" }}
        className="container"
      >
        <select
          {...register("numberOfPlayers")}
          className="form-control"
        >
          <option value="">Select number of players</option>
          {playerArr.map((item) => (
            <option key={item} value={item}>
              {item} Player{item > 1 && "s"}{" "}
            </option>
          ))}
        </select>
        {errors.numberOfPlayers && (
          <span className="text-xs my-3 text-white">
            Select number of players
          </span>
         )} 
        <button
          type="submit"
          className={`btn btn-secondary`}
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Start;