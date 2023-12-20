import React from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import { PropsFromRedux } from ".";
import Card from "../../utils/card";
import PlayingCard from "../../sharedComponents/PlayingCard/PlayingCard";


interface Props extends PropsFromRedux {}

const PlayingTable = ({ board }: Props) => {
  return (
    <div className={`d-flex flex-nowrap w-full h-full playingTable`}>
      <div className="w-full justify-content-center align-items-center p-2 p-4 d-flex">
        {board.winner ? (
          <Link
            to="/new-game"
            className="btn btn-secondary p-6"
          >
            New Game
          </Link>
        ) : (
          <>
            {board.cardsInMiddle.slice(0, 6).map((card: Card) => (
              <PlayingCard key={uid(8)} card={card} />
            ))}
          </>
        )}
      </div>
      <div className="justify-content-center d-flex align-items-center h-full">
        <div className="p-8 w-full text-center">
          <h4>Number of Cards in middle</h4>
          <p className="table-card-text">{board.cardsInMiddle.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayingTable;
