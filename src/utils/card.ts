export type Suit = "spade" | "heart" | "diamond" | "clubs";
export type Rank =
  | "ace"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "jack"
  | "queen"
  | "king";
export type CardValue =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

class Card {
  suit: Suit;
  rank: Rank;
  value: CardValue;
  constructor(suit: Suit, rank: Rank, value: CardValue) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

export default Card;
