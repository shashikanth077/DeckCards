import Card from "./card";
import Deck from "./deck";
import Player from "./player";

class Board {
  cardsInMiddle: Card[];
  players: Player[];
  turn: string;

  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
    this.turn = "";
  }

  // Distribute cards on game start
  private distributePlayerCards() {

    const deck = new Deck();
    deck.addCards();
    deck.shuffleDeck();
    const numberOfCards = deck.cards.length;

    console.log("distribute the cards",deck.cards);

    const numberOfPlayers = this.players.length;
    const splitWays = Math.floor(numberOfCards / numberOfPlayers);

    console.log("splitWays",splitWays);
    
    // Give equal number of cards
    this.players.forEach((player: Player, index: number) => {
      player.playerCards = deck.cards.splice(0, splitWays);
    });

    // Share leftover cards
    if (deck.cards.length) {
      deck.cards.forEach((card: Card, index: number) => {
        this.players[index].playerCards.push(card);
      });

      console.log("after destributio", this.players);
    }
  }


  // Start game
  start(playerCount: number) {
    console.log("start game",playerCount);
    for (let i = 0; i <= playerCount - 1; i++) {
      this.players.push(new Player(`Player ${i + 1}`));
    }

    console.log("as per plater spread cards");
    this.distributePlayerCards();
    
    console.log("set the turn");
    this.turn = this.players[0].id;
  }

  private getNewIndex(currentIndex: number) {
    let newIndex = currentIndex;
    if (newIndex < this.players.length - 1) {
      newIndex++;
    } else if (newIndex === this.players.length - 1) {
      newIndex = 0;
    }
    return newIndex;
  }

  // Set turn to next player
  private getNextTurn(currentIndex: number) {
    const startIndex = currentIndex;
    let newIndex = this.getNewIndex(currentIndex);

    while (!this.players[newIndex].playerCards.length) {
      newIndex = this.getNewIndex(newIndex);
    }
    if (startIndex === newIndex) {
      console.log(`${this.players[startIndex].playerName} WINS`);
      return `${this.players[startIndex].playerName} WINS`;
    }
    this.turn = this.players[newIndex].id;
  }

  private checkIfCardsMatch(currentIndex: number) {
    // If card shapes match
    if (
      this.cardsInMiddle.length > 1 &&
      this.cardsInMiddle[0].suit === this.cardsInMiddle[1].suit
    ) {
      // Push all cards in middle to player's stack
      this.players[currentIndex].playerCards.push(...this.cardsInMiddle);
      // Empty Cards in middle
      this.cardsInMiddle = [];
      // Pop card on top of player's stack to middle
      const cardtoPlay = this.players[currentIndex].playerCards.pop();
      cardtoPlay && this.cardsInMiddle.push(cardtoPlay);
    }
  }

  resetGame() {
    window.confirm("Are you sure you want to start a new game");
    this.cardsInMiddle = [];
    this.players = [];
    this.turn = "";
  }

  // Play a turn
  play(playerId: string) {
    // Check if correct turn
    if (playerId !== this.turn) return console.log("Not your turn");

    // Get player index
    const currentIndex = this.players.findIndex(
      (player: Player) => player.id === playerId
    );

    // If found
    if (currentIndex || currentIndex === 0) {
      // Check if user has cards
      if (this.players[currentIndex].playerCards.length) {
        // Pop card off stack
        const cardtoPlay = this.players[currentIndex].playerCards.pop();
        // Add card to top of cards in middle
        cardtoPlay && this.cardsInMiddle.unshift(cardtoPlay);
        // Check if its a match
        this.checkIfCardsMatch(currentIndex);
      }
      // Move turn to next player
      this.getNextTurn(currentIndex);
    }
  }
  toPlainObj() {
    let plainObj;
    try {
      plainObj = JSON.parse(JSON.stringify(this));
      return plainObj;
    } catch (e) {
      console.error(e);
    }
  }
}

export default Board;
