import { Board, Card, Player } from "../interfaces";

export const shuffleCards = (array: Card[]): Card[] => {
  var newArray: Card[] = [];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    if (newArray.hasOwnProperty(currentIndex)) {
      temporaryValue = newArray[currentIndex];
    } else {
      temporaryValue = array[currentIndex];
    }
    newArray[currentIndex] = array[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  console.log("after shuffle card",newArray);
  return newArray;
};

const getNewIndex = (currentIndex: number, board: Board) => {
  let newIndex = currentIndex;
  if (newIndex < board.players.length - 1) {
    newIndex++;
  } else if (newIndex === board.players.length - 1) {
    newIndex = 0;
  }
  return newIndex;
};

// Set turn to next player
const getNextTurn = (currentIndex: number, board: Board) => {
  const startIndex = currentIndex;
  let newIndex = getNewIndex(currentIndex, board);

  while (!board.players[newIndex].playerCards.length) {
    newIndex = getNewIndex(newIndex, board);
  }
  if (startIndex === newIndex) {
    console.log(`${board.players[startIndex].playerName} WINS`);
    return null;
  }
  return board.players[newIndex].id;
};

export const checkIfCardsMatch = (
  cardsInMiddle: Card[],
  playerCards: Card[]
) => {
  let cards: Card[] = [];
  let modifiedCardsInMiddle: Card[] = [];
  if (
    cardsInMiddle.length > 1 &&
    cardsInMiddle[0].suit === cardsInMiddle[1].suit
  ) {
    cards = [...playerCards, ...cardsInMiddle];
    const cardtoPlay = cards[0];
    modifiedCardsInMiddle = [cardtoPlay];
    cards = cards.slice(1);
    return { cards, cardsInMiddle: modifiedCardsInMiddle };
  }
  return null;
};

// Play a turn
export const play = (currentPlayer: Player, board: Board) => {
  let cards: Card[] = [];
  let cardsInMiddle: Card[] = [];
  let turn: string | null = "";
  const currentIndex = board.players.findIndex(
    (player: Player) => player.id === currentPlayer.id
  );
  if (currentIndex || currentIndex === 0) {
    if (currentPlayer.playerCards.length) {
      const cardtoPlay = currentPlayer.playerCards[0];
      cards = currentPlayer.playerCards.slice(1);
      cardsInMiddle = [cardtoPlay, ...board.cardsInMiddle];
    }
    turn = getNextTurn(currentIndex, board);
  }
  return {
    cardsInMiddle,
    cards,
    turn,
  };
};
