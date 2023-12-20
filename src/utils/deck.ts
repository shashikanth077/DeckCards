import Card, { Suit, Rank, CardValue } from "./card";

class Deck {
  cards: Card[];
  constructor() {
    this.cards = [];
  }
  addCards(): void {
    let suits: Suit[] = ["clubs", "diamond", "heart", "spade"];
    let ranks: Rank[] = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];
    let values: CardValue[] = Array(13)
      .fill(null)
      .map((_, i) => (i + 1) as CardValue);
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }

  shuffleDeck(): void {
    let location1: number, location2: number, tmp: Card;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor(Math.random() * this.cards.length);
      location2 = Math.floor(Math.random() * this.cards.length);
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

export default Deck;
