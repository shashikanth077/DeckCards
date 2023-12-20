import React from "react";
import Card from "../../utils/card";
import "./_PlayingCard.scss";

interface Props {
  card: Card;
}

const PlayingCard = ({ card }: Props) => {
  return (
    <div
      className={`playingCard ${card.suit} ${card.value}}  justify-content-center align-items-center d-flex flex-nowrap`}
    >
      &nbsp;
    </div>
  );
};

export default PlayingCard;
